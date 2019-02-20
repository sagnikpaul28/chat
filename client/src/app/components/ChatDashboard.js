import React from "react";
import io from 'socket.io-client';

export class ChatDashboard extends React.Component {
    constructor(props) {
        super(props);

        const socket = io('http://localhost:4000');
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="chat-dashboard">
                <div className="chat-panel">
                    <div className="searchbox">
                        <span className="glyphicon glyphicon-search" />
                        <input className="search" type="text" placeholder='Search'/>
                    </div>
                    <div className="chats-people">
                        <div className="item">
                            <img className="item-image" src="/assets/image.png"/>
                            <p className="item-name">Batman</p>
                            <span className="status active"/>
                        </div>
                        <div className="item">
                            <img className="item-image" src="/assets/image.png"/>
                            <p className="item-name">Batman</p>
                            <span className="status active"/>
                        </div>
                        <div className="item">
                            <img className="item-image" src="/assets/image.png"/>
                            <p className="item-name">Batman</p>
                            <span className="status inactive"/>
                        </div>
                        <div className="item">
                            <img className="item-image" src="/assets/image.png"/>
                            <p className="item-name">Batman</p>
                            <span className="status active"/>
                        </div>
                    </div>
                </div>
                <div className="chat-container">
                    <div className="chat-header">
                        <p className="person-name">Batman</p>
                        <p className="person-status active">online</p>
                    </div>
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
                    <div className="chat-message-type">
                        <input type="text" name="chat-message" placeholder="Start typing a message"/>
                        <span className="send glyphicon glyphicon-send"/>
                    </div>
                </div>
            </div>
        )
    }
}
