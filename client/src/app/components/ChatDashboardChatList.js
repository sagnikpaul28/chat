import React from "react";
import {connect} from "react-redux";
import {
    saveChatList,
    saveChatListHTML,
    saveExceptChatList,
    saveExceptChatListHTML,
    setOnlineStatus
} from "../actions/dashboardActions";
import {onChatSelect, saveChatMessages} from "../actions/chatActions";
import io from "socket.io-client";

class ChatDashboardChatList extends React.Component {
    onlineList;
    chatListHTML;

    constructor(props) {
        super(props);
        this.socket = io('http://localhost:4000?username='+localStorage.getItem('username'));
        this.socket.on('online-status', data => {
            if (this.props.dashboardData.chatList || this.props.dashboardData.exceptChatList) {
                this.props.setOnlineStatus(data);
            }else {
                this.onlineList = data.list;
            }
        })
    }

    renderChatListHTML() {
        if (this.props.dashboardData.chatList) {
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

    renderExceptChatListHTML() {
        this.props.saveExceptChatListHTML(
            this.props.dashboardData.exceptChatList.map(item => {
                return <div className="item" data-name={item.name} key={item.username} id={item.username} onClick={this.onContactClick.bind(this)}><img className="item-image" src={item.userImage} alt={item.username}/><p className="item-name">{item.name}</p><span className={item.status + " status"}/></div>
            })
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.data.userData && this.props.data.userData) {
            this.chatList = this.props.data.userData.chatList;
            this.fetchChatList(this.chatList);
        }

        if (prevProps.dashboardData.chatList !== this.props.dashboardData.chatList) {
            this.renderChatListHTML();
        }

        if (prevProps.dashboardData.exceptChatList !== this.props.dashboardData.exceptChatList) {
            this.renderExceptChatListHTML();
        }

        if (prevProps.dashboardData.updateList !== this.props.dashboardData.updateList) {
            console.log(prevProps.dashboardData.updateList, this.props.dashboardData.updateList);
            this.renderChatListHTML();
            this.renderExceptChatListHTML();
        }

        if (prevProps.inputs.chatSearch !== this.props.inputs.chatSearch) {
            this.fetchSearchList();
        }
    }

    onContactClick(e) {
        this.props.saveChatMessages("[]");
        this.props.onChatSelect(
            e.target.id ? e.target.id : e.target.parentElement.id,
            e.target.id ? e.target.dataset.name : e.target.parentElement.dataset.name,
            e.target.id ? e.target.childNodes[0].src : e.target.parentElement.childNodes[0].src,
            e.target.id ? e.target.childNodes[2].classList[0] : e.target.parentElement.childNodes[2].classList[0]
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
                for (let i = 0; i < res.length; i++) {
                    res[i].status = "offline";
                    for (let j = 0; j < this.onlineList.length; j++) {
                        if (this.onlineList[j] === res[i].username) {
                            res[i].status = "online";
                        }
                    }
                }
                this.props.saveChatList(res);
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
                for (let i = 0; i < res.length; i++) {
                    res[i].status = "offline";
                    for (let j = 0; j < this.onlineList.length; j++) {
                        if (this.onlineList[j] === res[i].username) {
                            res[i].status = "online";
                        }
                    }
                }
                this.props.saveExceptChatList(res);
            });
    }

    fetchSearchList() {
        fetch('http://localhost:4000/api/getSearchResults', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernameQuery: this.props.inputs.chatSearch
            })
        })
            .then(res => res.json())
            .then(res => {
                this.chatListHTML = res.map(item => {
                    return <div className="item" data-name={item.name} key={item.username} id={item.username}
                                onClick={this.onContactClick.bind(this)}><img className="item-image"
                                                                              src={item.userImage}
                                                                              alt={item.username}/><p
                        className="item-name">{item.name}</p><span className={item.status + " status"}/></div>
                });
                this.forceUpdate();
            });
    }

    render() {
        if (!this.props.inputs.chatSearch) {
            return (
                <div className="chats-people">
                    <p className="chat-list-title">Chats</p>
                    {this.props.dashboardData.chatListHTML}
                    <hr/>
                    <p className="contact-list-title">Other Contacts</p>
                    {this.props.dashboardData.exceptChatListHTML}
                </div>
            )
        }else {
            return(
                <div className="chats-people">
                    <p className="chat-list-title">Search List</p>
                    {this.chatListHTML}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.userDataReducer,
        dashboardData: state.dashboardReducers,
        chat: state.chatReducers,
        inputs: state.inputReducers
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
        onChatSelect: (username, name, imageUrl, status) => {
            dispatch(
                onChatSelect(username, name, imageUrl, status)
            )
        },
        saveChatMessages: (chat) => {
            dispatch(
                saveChatMessages(chat)
            )
        },
        setOnlineStatus: (usernameList) => {
            dispatch(
                setOnlineStatus(usernameList)
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatList);
