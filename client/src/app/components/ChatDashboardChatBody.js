import React from "react";
import {connect} from "react-redux";

class ChatDashboardChatBody extends React.Component {
    chatListHTML;

    constructor(props) {
        super(props);
        this.chatListHTML = '';
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatBody);
