import React from "react";
import {connect} from "react-redux";
import {saveChatList, saveChatListHTML, saveExceptChatList, saveExceptChatListHTML} from "../actions/dashboardActions";

class ChatDashboardChatList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.data.userData && this.props.data.userData) {
            this.chatList = this.props.data.userData.chatList;
            if (this.chatList) {
                this.fetchChatList(this.chatList);
            }else {
                this.props.saveChatList(<p>Search for your friend and start chatting</p>);
            }
        }

        if (prevProps.dashboardData.chatList !== this.props.dashboardData.chatList) {
            this.props.saveChatListHTML(
                this.props.dashboardData.chatList.map(item => {
                    return <div className="item" key={item.username}><img className="item-image" src={item.userImage} alt={item.username}/><p className="item-name">{item.name}</p><span className={item.status + " status"}/></div>
                })
            )
        }

        if (prevProps.dashboardData.exceptChatList !== this.props.dashboardData.exceptChatList) {
            this.props.saveExceptChatListHTML(
                this.props.dashboardData.exceptChatList.map(item => {
                    return <div className="item" key={item.username}><img className="item-image" src={item.userImage} alt={item.username}/><p className="item-name">{item.name}</p><span className={item.status + " status"}/></div>
                })
            )
        }
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
        dashboardData: state.dashboardReducers
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatList);
