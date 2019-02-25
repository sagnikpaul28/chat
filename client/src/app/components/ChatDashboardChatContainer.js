import React from "react";
import ChatDashboardChatNotSelected from "./ChatDashboard";
import {connect} from "react-redux";
import ChatDashboardChatMessageInput from "./ChatDashboardChatMessageInput";
import ChatDashboardChatBody from "./ChatDashboardChatBody";
import ChatDashboardChatHeader from "./ChatDashboardChatHeader";

class ChatDashboardChatContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="chat-container">
                {/*<ChatDashboardChatNotSelected/>*/}
                <ChatDashboardChatHeader/>
                <ChatDashboardChatBody/>
                <ChatDashboardChatMessageInput/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatContainer);
