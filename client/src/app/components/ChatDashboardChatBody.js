import React from "react";
import {connect} from "react-redux";

class ChatDashboardChatBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="chat-body">
                <div className="chat-text received">
                    <p>Hi</p>
                </div>
                <div className="chat-text sent">
                    <p>Hey</p>
                </div>
                <div className="chat-text sent">
                    <p>Wassup bro?</p>
                </div>
                <div className="chat-text received">
                    <p>Great</p>
                </div>
                <div className="chat-text received">
                    <p>You?</p>
                </div>
                <div className="chat-text received">
                    <p>Hi</p>
                </div>
                <div className="chat-text sent">
                    <p>Hey</p>
                </div>
                <div className="chat-text sent">
                    <p>Wassup bro?</p>
                </div>
                <div className="chat-text received">
                    <p>Great</p>
                </div>
                <div className="chat-text received">
                    <p>You?</p>
                </div>
                <div className="chat-text received">
                    <p>Hi</p>
                </div>
                <div className="chat-text sent">
                    <p>Hey</p>
                </div>
                <div className="chat-text sent">
                    <p>Wassup bro?</p>
                </div>
                <div className="chat-text received">
                    <p>Great</p>
                </div>
                <div className="chat-text received">
                    <p>You?</p>
                </div>
                <div className="chat-text received">
                    <p>Hi</p>
                </div>
                <div className="chat-text sent">
                    <p>Hey</p>
                </div>
                <div className="chat-text sent">
                    <p>Wassup bro?</p>
                </div>
                <div className="chat-text received">
                    <p>Great</p>
                </div>
                <div className="chat-text received">
                    <p>You?</p>
                </div>
                <div className="chat-text received">
                    <p>Hi</p>
                </div>
                <div className="chat-text sent">
                    <p>Hey</p>
                </div>
                <div className="chat-text sent">
                    <p>Wassup bro?</p>
                </div>
                <div className="chat-text received">
                    <p>Great</p>
                </div>
                <div className="chat-text received">
                    <p>You?</p>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatBody);
