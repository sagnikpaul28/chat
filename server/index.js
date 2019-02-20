const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");


//Import Schemas
const Users = require('./models/userModel');


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
    // console.log(socket.id);
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

app.use('/', router);
