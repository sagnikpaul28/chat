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
        self.socket = io('http://localhost:4000?username='+localStorage.getItem('username'));
        self.socket.on('message', function(data) {

            let addToChatListUsername = "";
            let chatList = self.props.userData.userData.chatList;
            let chatListUsernames = [];

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

            if (data.sentBy === self.props.userData.userData.username) {
                addToChatListUsername = data.sentTo
            }else if (data.sentTo === self.props.userData.userData.username) {
                addToChatListUsername = data.sentBy;
            }

            if (addToChatListUsername) {
                console.log(chatList);
                for (let i = 0; i< chatList.length; i++) {
                    if (chatList[i].username !== addToChatListUsername) {
                        chatListUsernames.push(chatList[i].username);
                    }
                }
                chatListUsernames.unshift(addToChatListUsername);
                chatListUsernames = chatListUsernames.toString();
                console.log(chatListUsernames);

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
                        console.log(res);
                        self.props.saveChatList(
                            res.map(item => {
                                item.status = 'offline';
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
                        self.props.saveExceptChatList(
                            res.map(item => {
                                item.status = 'offline';
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
