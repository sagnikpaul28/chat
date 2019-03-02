import React from "react";
import {connect} from "react-redux";
import {changeContactSearch} from "../actions/inputActions";
import {saveChatListHTML} from "../actions/dashboardActions";

class ChatDashboardSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeSearch(e) {
        this.props.changeContactSearch(e.target.value);
    }

    render() {
        return (
            <div className="searchbox">
                <input className="search" type="text" placeholder='Search' value={this.props.inputs.chatSearch} onChange={this.onChangeSearch.bind(this)}/>
                <span className="glyphicon glyphicon-search" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inputs: state.inputReducers,
        dashboard: state.dashboardReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeContactSearch: (value) => {
            dispatch(
                changeContactSearch(value)
            )
        },
        saveChatListHTML: (data) => {
            dispatch(
                saveChatListHTML(data)
            )
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardSearch);
