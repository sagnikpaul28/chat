import React from "react";
import {connect} from "react-redux";

class ChatDashboardChatMessageInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="chat-message-type">
                <input type="text" name="chat-message" placeholder="Start typing a message"/>
                <span className="send glyphicon glyphicon-send"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatMessageInput);
