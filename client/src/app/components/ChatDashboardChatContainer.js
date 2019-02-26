import React from "react";
import {connect} from "react-redux";
import ChatDashboardChatMessageInput from "./ChatDashboardChatMessageInput";
import ChatDashboardChatBody from "./ChatDashboardChatBody";
import ChatDashboardChatHeader from "./ChatDashboardChatHeader";
import ChatDashboardChatNotSelected from "./ChatDashboardChatNotSelected";

class ChatDashboardChatContainer extends React.Component {
    constructor(props) {
        super(props);
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
        chat: state.chatReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatContainer);
