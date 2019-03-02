import React from "react";
import {connect} from "react-redux";
import {saveUserData} from "../actions/userDataActions";
import ChatDashboardSearch from "./ChatDashboardSearch";
import ChatDashboardChatList from "./ChatDashboardChatList";
import ChatDashboardChatContainer from "./ChatDashboardChatContainer";

class ChatDashboard extends React.Component {
    chatList;
    constructor(props) {
        super(props);
        if (!this.props.data.userData) {
            if (localStorage.getItem('username')) {
                this.fetchUserDetails(localStorage.getItem('username'));
            }else {
                window.location.href = '/';
            }
        }
        this.chatList = null;
    }

    componentDidMount() {

    }

    fetchUserDetails(username) {
        fetch('http://localhost:4000/api/getUserDetails?username=' + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.length === 0) {
                    window.location.href = '/';
                }else {
                    this.props.saveUserData(res[0]);
                    localStorage.setItem('username', res[0].username);
                }
            });
    }

    render() {
        return (
            <div className="chat-dashboard">
                <div className="chat-panel">
                    <ChatDashboardSearch/>
                    <ChatDashboardChatList/>
                </div>
                <ChatDashboardChatContainer/>
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
        saveUserData: (data) => {
            dispatch(
                saveUserData(data)
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboard);
