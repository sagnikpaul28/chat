import React from "react";
import {connect} from "react-redux";

class ChatDashboardChatHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="chat-header">
                <p className="person-name">Batman</p>
                <p className="person-status active">online</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardChatHeader);
