import React from "react";
import {connect} from "react-redux";

class ChatDashboardSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="searchbox">
                <span className="glyphicon glyphicon-search" />
                <input className="search" type="text" placeholder='Search'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboardSearch);
