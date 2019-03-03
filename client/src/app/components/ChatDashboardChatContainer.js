import React from "react";
import {connect} from "react-redux";
import ChatDashboardChatMessageInput from "./ChatDashboardChatMessageInput";
import ChatDashboardChatBody from "./ChatDashboardChatBody";
import ChatDashboardChatHeader from "./ChatDashboardChatHeader";
import ChatDashboardChatNotSelected from "./ChatDashboardChatNotSelected";
import io from "socket.io-client";
import {saveChatMessages} from "../actions/chatActions";
import {saveChatList, saveExceptChatList} from "../actions/dashboardActions";

class ChatDashboardChatContainer extends React.Component {
    constructor(props) {
        super(props);
        let self = this;

        //Connect socket with current username
        self.socket = io('http://localhost:4000?username='+localStorage.getItem('username'));

        //When the socket receives an event for message received
        self.socket.on('message', function(data) {
            let addToChatListUsername = "";
            let chatList = self.props.dashboardData.chatList;
            let exceptChatList = self.props.dashboardData.exceptChatList;
            console.log(chatList, exceptChatList);
            let chatListUsernames = [];

            //Check if the message has been sent by the username or has been sent to the user
            if ((data.sentBy === self.props.userData.userData.username && data.sentTo === self.props.chat.selectedUsername) || (data.sentTo === self.props.userData.userData.username && data.sentBy === self.props.chat.selectedUsername)) {
                let newSelectedChatList = JSON.parse(self.props.chat.selectedChatList);
                newSelectedChatList.push({
                    message: data.message,
                    sentBy: data.sentBy,
                    time: data.time
                });
                newSelectedChatList = JSON.stringify(newSelectedChatList);
                self.props.saveChatMessage(newSelectedChatList);
            }

            //Modify the chat list with the other's username
            if (data.sentBy === self.props.userData.userData.username) {
                addToChatListUsername = data.sentTo
            }else if (data.sentTo === self.props.userData.userData.username) {
                addToChatListUsername = data.sentBy;
            }

            //If the message was sent or received by the user, modify the chat list
            if (addToChatListUsername) {
                //Extract all the users from chatlist to chatlistusernames
                if (chatList) {
                    for (let i = 0; i< chatList.length; i++) {
                        if (chatList[i].username !== addToChatListUsername) {
                            chatListUsernames.push(chatList[i].username);
                        }
                    }
                }
                //modify chatlistusernames to move the latest username to the first
                chatListUsernames.unshift(addToChatListUsername);
                chatListUsernames = chatListUsernames.toString();

                //fetch the details of the new chatlist
                fetch('http://localhost:4000/api/getChatListUserDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chatList: chatListUsernames
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(chatList, exceptChatList, res);
                        self.props.saveChatList(
                            res.map(item => {
                                //fetch online/offline status from current list
                                if (chatList){
                                    for (let i = 0; i < chatList.length; i++) {
                                        if (chatList[i].username === item.username) {
                                            item.status = chatList[i].status;
                                        }
                                    }
                                }
                                if (exceptChatList) {
                                    for (let i = 0; i < exceptChatList.length; i++) {
                                        if (exceptChatList[i].username === item.username) {
                                            item.status = exceptChatList[i].status;
                                        }
                                    }
                                }
                                return item;
                            })
                        );
                    });

                fetch('http://localhost:4000/api/getContactsExceptChatListDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chatList: chatListUsernames + "," + self.props.userData.userData.username
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(chatList, exceptChatList, res);
                        self.props.saveExceptChatList(
                            res.map(item => {
                                //fetch online/offline status from current list
                                if (chatList){
                                    for (let i = 0; i < chatList.length; i++) {
                                        if (chatList[i].username === item.username) {
                                            item.status = chatList[i].status;
                                        }
                                    }
                                }
                                if (exceptChatList) {
                                    for (let i = 0; i < exceptChatList.length; i++) {
                                        if (exceptChatList[i].username === item.username) {
                                            item.status = exceptChatList[i].status;
                                        }
                                    }
                                }
                                return item;
                            })
                        );
                    });
            }
        });
    }

    render() {
        if (this.props.chat.isChatSelected) {
            return (
                <div className="chat-container">
                    <ChatDashboardChatHeader/>
                    <ChatDashboardChatBody/>
                    <ChatDashboardChatMessageInput/>
                </div>
            )
        }else {
            return (
                <div className="chat-container">
                    <ChatDashboardChatNotSelected/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.userDataReducer,
        dashboardData: state.dashboardReducers,
        chat: state.chatReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveChatMessage: (chat) => {
            dispatch(
                saveChatMessages(chat)
            )
        },
        saveExceptChatList: (data) => {
            dispatch(
                saveExceptChatList(data)
            )
        },
        saveChatList: (data) => {
            dispatch(
                saveChatList(data)
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatContainer);
