const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");


//Import Schemas
const Users = require('./models/userModel');
const Chats = require('./models/chatModel');
const Chat = Chats.Chats;
const ChatDetails = Chats.ChatDetails;


//Setup mongoose
mongoose.connect('mongodb://sagnikpaul28:SagnikPaul28@ds341605.mlab.com:41605/chat');
mongoose.Promise = global.Promise;


//Setup app
const app = express();
const router = express.Router();
const server = app.listen(4000, function () {
    console.log('Listening to port 4000');
});


//Enable cors
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Setup bodyParser
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));


//Setup Socket.io
let io = socket(server);

io.on('connection', function(socket) {
    socket.on('message', function(data) {

        //Change SentBy's chat list
        Users.find({username: data.sentBy})
            .then(result => {
                let chatList = result[0].chatList;
                if (chatList.length) {
                    //If chatList is not empty
                    chatList = chatList.split(',');
                    if (chatList.findIndex( item => item === data.sentTo ) >= 0) {
                        //Already in Chat List
                        chatList.splice(chatList.findIndex( item => item === data.sentTo ), 1);
                        chatList.unshift(data.sentTo);
                    }else {
                        //New Entry in chat list
                        chatList.unshift(data.sentTo);
                    }
                }else {
                    chatList = [data.sentTo];
                }
                Users.findOneAndUpdate({username: data.sentBy}, {chatList: chatList})
                    // .then(res => console.log(res));
            });

        //Change SentTo's chat list
        Users.find({username: data.sentTo})
            .then(result => {
                let chatList = result[0].chatList;
                if (chatList.length) {
                    //If chatList is not empty
                    chatList = chatList.split(',');
                    if (chatList.findIndex( item => item === data.sentBy ) >= 0) {
                        //Already in Chat List
                        chatList.splice(chatList.findIndex( item => item === data.sentBy ), 1);
                        chatList.unshift(data.sentBy);
                    }else {
                        //New Entry in chat list
                        chatList.unshift(data.sentBy);
                    }
                }else {
                    chatList = [data.sentBy];
                }
                Users.findOneAndUpdate({username: data.sentTo}, {chatList: chatList})
                    // .then(res => console.log(res));
            });

        let peopleList = [data.sentBy, data.sentTo].sort();

        //Add the message to db
        ChatDetails.find({people: peopleList}).then(result=> {
            let chatList = [];
            if (result.length > 0) {
                let id = result[0]._id;
                chatList = result[0].chats;
                chatList.push({
                    message: data.message,
                    sentBy: data.sentBy,
                    time: data.time
                });
                ChatDetails.findByIdAndUpdate(id, {chats: chatList})
                    // .then(reslt => console.log(reslt));
            }else {
                chatList = [{
                    message: data.message,
                    sentBy: data.sentBy,
                    time: data.time
                }];
                ChatDetails.create({
                        people: peopleList,
                        chats: chatList
                    })
                    // .then( reslt => console.log(reslt) );
            }
        });


        //Send a broadcast to other users and change html in their system
        io.sockets.emit('message', data);
    })
});


//Setup Routes
router.post('/api/addNewUser', function(req, res, next) {
    Users.find({username: req.body.username}).then(result => {
        if (result.length) {
            res.status(406).send({error: true, message: 'Username already exists'});
        } else {
            Users.create(req.body).then( () => res.status(200).send({error: false, message: "ok"}));
        }
    })
});

router.post('/api/login', function(req, res, next) {
    Users.find({username: req.body.username, password: req.body.password}).then(result => {
        if (result.length) {
            res.status(200).send({error: false, message: 'ok'});
        }else {
            res.status(401).send({error: true, message: 'Invalid credentials'});
        }
    })
});

router.get('/api/getAllUsers', function(req, res, next) {
    Users.find({}).then( result => res.status(200).send(result) );
});

router.get('/api/getUserDetails', function(req, res, next) {
    Users.find({username: req.query.username}).then(result => res.status(200).send(result) );
});

router.post('/api/getChatListUserDetails', function(req, res, next) {
    let chatList = req.body.chatList;
    chatList = chatList.split(',');
    let chatListLength = chatList.length;
    let userDataList = [];
    for (let i = 0; i < chatList.length; i++) {
        Users.find({username: chatList[i]}).then(result => {
            if (result.length > 0) {
                userDataList.push({
                    name: result[0].name,
                    userImage: result[0].userImage,
                    username: result[0].username
                });
            }
            if (chatListLength === userDataList.length) {
                res.send(userDataList);
                return;
            }
        });
    }
});

router.post('/api/getContactsExceptChatListDetails', function(req, res, next) {
    let chatList = req.body.chatList;
    if (chatList.indexOf(',') === 0) {
        chatList = chatList.split(',')
    }else {
        chatList = chatList.split(',');
    }
    let userDataList = [];
    Users.find({}).then(result => {
        result.map(item => {
            let count = 0;
            if (chatList[0].length) {
                if (result.length === (userDataList.length + chatList.length)) {
                    return;
                }
                chatList.map(chatItem => {
                    if (chatItem === item.username) {
                        count++;
                    }
                });
            }else {
                if (result.length === (userDataList.length + chatList.length - 1)) {
                    return;
                }
                if (chatList[1] === item.username ) {
                    count++;
                }
            }
            if (count === 0) {
                userDataList.push({
                    name: item.name,
                    userImage: item.userImage,
                    username: item.username
                });
            }
            if (chatList[0].length) {
                if (result.length === (userDataList.length + chatList.length)) {
                    res.send(userDataList);
                }
            }else {
                if (result.length === (userDataList.length + chatList.length - 1)) {
                    res.send(userDataList);
                }
            }
        })
    });
});

router.post('/api/fetchChat', function(req, res, next) {
    let count = 0;
    let output = [];
    ChatDetails.find({}).then(result => {
        for (let i = 0; i < result.length; i++) {
            count++;
            let peopleList = result[i].people.sort();
            let receivedPeopleList = req.body.peopleList.sort();
            if (JSON.stringify(peopleList) === JSON.stringify(receivedPeopleList)) {
                output = result[i].chats;
                res.send(output);
                break;
            }
        }
        if (count === result.length) {
            res.send(output);
        }
    });
});

router.get('/api/test', function(req, res, next) {
    // let value = {
    //     message: 'test',
    //     sentBy: 'test',
    //     time: 1
    // };
    // ChatDetails.create({
    //     people: ['sagnik'],
    //     chats: value
    // }).then( (result) => {
    //     res.send(result);
    // });

    // ChatDetails.find({}).then(result => {
    //     let id = result[0]._id;
    //     result = result[0];
    //     let arrayList = [...result.chats];
    //     arrayList.push({
    //         message: 'Hello',
    //         sentBy: 'superman',
    //         time: 2
    //     });
    //     console.log(arrayList);
    //     ChatDetails.findByIdAndUpdate(id, {chats: arrayList}).then(result => res.send(result));
    // })

    ChatDetails.find({}).then(result => {
        res.send(result);
    })
});

app.use('/', router);
