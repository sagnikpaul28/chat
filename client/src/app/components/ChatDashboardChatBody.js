import React from "react";
import {connect} from "react-redux";
import {saveChatMessages} from "../actions/chatActions";
import {saveChatList, saveExceptChatList} from "../actions/dashboardActions";

class ChatDashboardChatBody extends React.Component {
    chatListHTML;
    socket;

    constructor(props) {
        super(props);
        self.chatListHTML = '';
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.chat.selectedChatList !== this.props.chat.selectedChatList) {
            let chatList = JSON.parse(nextProps.chat.selectedChatList);
            this.chatListHTML = chatList.map(item => {
                let date = new Date(item.time);
                return <div key={item.message+item._id} className={(item.sentBy === this.props.userData.userData.username) ? "chat-text sent" : "chat-text received"}><p>{item.message}</p><span className="chat-text-time">{date.getHours() + ":" + date.getMinutes()}</span> </div>
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
