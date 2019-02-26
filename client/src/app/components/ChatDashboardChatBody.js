import React from "react";
import {connect} from "react-redux";
import {saveChatMessages} from "../actions/chatActions";
import io from "socket.io-client";

class ChatDashboardChatBody extends React.Component {
    chatListHTML;
    socket;

    constructor(props) {
        super(props);
        let self = this;
        self.chatListHTML = '';
        self.socket = io('http://localhost:4000');
        self.socket.on('message', function(data) {
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatBody);
