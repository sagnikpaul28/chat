import React from "react";
import {connect} from "react-redux";
import {saveChatList, saveChatListHTML, saveExceptChatList, saveExceptChatListHTML} from "../actions/dashboardActions";
import {onChatSelect, saveChatMessages} from "../actions/chatActions";

class ChatDashboardChatList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.data.userData && this.props.data.userData) {
            this.chatList = this.props.data.userData.chatList;
            this.fetchChatList(this.chatList);
        }

        if (prevProps.dashboardData.chatList !== this.props.dashboardData.chatList) {
            if (this.props.dashboardData.chatList.length === 0) {
                this.props.saveChatListHTML(
                    '<p>Chatlist is empty</p>'
                );
            }else {
                this.props.saveChatListHTML(
                    this.props.dashboardData.chatList.map(item => {
                        return <div className="item" data-name={item.name} key={item.username} id={item.username}
                                    onClick={this.onContactClick.bind(this)}><img className="item-image"
                                                                                  src={item.userImage}
                                                                                  alt={item.username}/><p
                            className="item-name">{item.name}</p><span className={item.status + " status"}/></div>
                    })
                )
            }
        }

        if (prevProps.dashboardData.exceptChatList !== this.props.dashboardData.exceptChatList) {
            this.props.saveExceptChatListHTML(
                this.props.dashboardData.exceptChatList.map(item => {
                    return <div className="item" data-name={item.name} key={item.username} id={item.username} onClick={this.onContactClick.bind(this)}><img className="item-image" src={item.userImage} alt={item.username}/><p className="item-name">{item.name}</p><span className={item.status + " status"}/></div>
                })
            )
        }
    }

    onContactClick(e) {
        this.props.saveChatMessages("[]");
        this.props.onChatSelect(
            e.target.id ? e.target.id : e.target.parentElement.id,
            e.target.id ? e.target.dataset.name : e.target.parentElement.dataset.name,
            e.target.id ? e.target.childNodes[0].src : e.target.parentElement.childNodes[0].src
        );
        this.fetchChat(e.target.id ? e.target.id : e.target.parentElement.id);
    }

    fetchChat(username) {
        fetch('http://localhost:4000/api/fetchChat', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                peopleList: [this.props.data.userData.username, username]
            })
        })
            .then(res => res.json())
            .then(res => {
                this.props.saveChatMessages(JSON.stringify(res));
            })
    }

    fetchChatList(list) {
        fetch('http://localhost:4000/api/getChatListUserDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatList: list
            })
        })
            .then(res => res.json())
            .then(res => {
                this.props.saveChatList(
                    res.map(item => {
                        item.status = 'offline';
                        return item;
                    })
                );
            });

        fetch('http://localhost:4000/api/getContactsExceptChatListDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatList: list + "," + this.props.data.userData.username
            })
        })
            .then(res => res.json())
            .then(res => {
                this.props.saveExceptChatList(
                    res.map(item => {
                        item.status = 'offline';
                        return item;
                    })
                );
            });
    }

    render() {
        return (
            <div className="chats-people">
                {this.props.dashboardData.chatListHTML}
                <hr/>
                {this.props.dashboardData.exceptChatListHTML}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.userDataReducer,
        dashboardData: state.dashboardReducers,
        chat: state.chatReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveChatList: (data) => {
            dispatch(
                saveChatList(data)
            )
        },
        saveChatListHTML: (data) => {
            dispatch(
                saveChatListHTML(data)
            )
        },
        saveExceptChatList: (data) => {
            dispatch(
                saveExceptChatList(data)
            )
        },
        saveExceptChatListHTML: (data) => {
            dispatch(
                saveExceptChatListHTML(data)
            )
        },
        onChatSelect: (username, name, imageUrl) => {
            dispatch(
                onChatSelect(username, name, imageUrl)
            )
        },
        saveChatMessages: (chat) => {
            dispatch(
                saveChatMessages(chat)
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatList);
