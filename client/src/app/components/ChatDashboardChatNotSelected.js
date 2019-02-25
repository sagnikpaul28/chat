import React from "react";
import {connect} from "react-redux";

class ChatDashboardChatNotSelected extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="chat-not-selected">
                <p>Please select a contact and start chatting</p>
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

export default connect (mapStateToProps, mapDispatchToProps)(ChatDashboardChatNotSelected);
