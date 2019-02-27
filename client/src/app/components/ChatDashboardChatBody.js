import React from "react";
import {connect} from "react-redux";
import {saveChatMessages} from "../actions/chatActions";
import io from "socket.io-client";
import {saveChatList, saveExceptChatList} from "../actions/dashboardActions";

class ChatDashboardChatBody extends React.Component {
    chatListHTML;
    socket;

    constructor(props) {
        super(props);
        let self = this;
        self.chatListHTML = '';
        self.socket = io('http://localhost:4000');
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

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.chat.selectedChatList !== this.props.chat.selectedChatList) {
            let chatList = JSON.parse(nextProps.chat.selectedChatList);
            this.chatListHTML = chatList.map(item => {
                return <div className={(item.sentBy === this.props.userData.userData.username) ? "chat-text sent" : "chat-text received"}><p>{item.message}</p></div>
            });
        }
    }

    render() {
        return (
            <div className="chat-body">
                {this.chatListHTML}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chat: state.chatReducers,
        userData: state.userDataReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveChatMessage: (chat) => {
            dispatch(
                saveChatMessages(chat)
            )
        },
        saveChatList: (chatList) => {
            dispatch(
                saveChatList(chatList)
            )
        },
        saveExceptChatList: (chatList) => {
            dispatch(
                saveExceptChatList(chatList)
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatBody);
