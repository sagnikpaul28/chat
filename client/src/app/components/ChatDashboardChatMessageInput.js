import React from "react";
import {connect} from "react-redux";
import {changeChatMessage} from "../actions/inputActions";

class ChatDashboardChatMessageInput extends React.Component {
    constructor(props) {
        super(props);
    }

    onInputChange(e) {
        this.props.changeChatMessage(e.target.value);
    }

    render() {
        return (
            <div className="chat-message-type">
                <input type="text" name="chat-message" placeholder="Start typing a message" value={this.props.inputData.chatMessage} onChange={this.onInputChange.bind(this)}/>
                <span className="send glyphicon glyphicon-send"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inputData: state.inputReducers
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
