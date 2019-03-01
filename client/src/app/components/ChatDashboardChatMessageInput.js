import React from "react";
import {connect} from "react-redux";
import {changeChatMessage} from "../actions/inputActions";
import io from "socket.io-client";

class ChatDashboardChatMessageInput extends React.Component {
    socket;
    constructor(props) {
        super(props);
        this.socket = io('http://localhost:4000');
    }

    onKeyEnter(e) {
        if (e.keyCode === 13) {
            this.onMessageSend();
        }
    }

    onInputChange(e) {
        this.props.changeChatMessage(e.target.value);
    }

    onMessageSend() {
        if (this.props.inputData.chatMessage.length === 0 ){
            return;
        }
        this.socket.emit('message', {
            message: this.props.inputData.chatMessage,
            sentBy: this.props.userData.userData.username,
            sentTo: this.props.chatData.selectedUsername,
            time: Date.now()
        });
        this.props.changeChatMessage('');
    }

    render() {
        return (
            <div className="chat-message-type" onKeyDown={this.onKeyEnter.bind(this)}>
                <input type="text" name="chat-message" placeholder="Start typing a message" value={this.props.inputData.chatMessage} onChange={this.onInputChange.bind(this)}/>
                <span className="send glyphicon glyphicon-send" onClick={this.onMessageSend.bind(this)}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inputData: state.inputReducers,
        userData: state.userDataReducer,
        chatData: state.chatReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeChatMessage: (value) => {
            dispatch(
                changeChatMessage(value)
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatMessageInput);
