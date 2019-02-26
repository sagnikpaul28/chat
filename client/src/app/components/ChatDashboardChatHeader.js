import React from "react";
import {connect} from "react-redux";

class ChatDashboardChatHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="chat-header">
                <img src={this.props.chat.selectedUsernameImage} alt={this.props.chat.selectedName} />
                <p className="person-name">{this.props.chat.selectedName}</p>
                <p className="person-status inactive">offline</p>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatHeader);
