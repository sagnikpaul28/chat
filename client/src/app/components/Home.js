import React from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {homeLoginInputChange, homeLoginLabelChange} from "../actions/inputActions";
import {saveUserData} from "../actions/userDataActions";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    onChangeInput(e) {
        this.props.changeInputFields(e.target.name, e.target.value)
    }

    onFocusInput(e) {
        let labelName = 'home' + e.target.name.charAt(0).toUpperCase() + e.target.name.substring(1) + "LabelClass";
        this.props.changeInputLabels(labelName, 'active');
    }

    onBlurInput(e) {
        let fieldName = 'home' + e.target.name.charAt(0).toUpperCase() + e.target.name.substring(1);
        let labelName = fieldName + "LabelClass";
        if (!this.props.homeInputs[fieldName].trim().length) {
            this.props.changeInputLabels(labelName, '');
        }
    }

    onLoginAttempt() {
        if (!this.props.homeInputs.homeUsername.length) {
            console.log('Username can not be empty');
        }else if (!this.props.homeInputs.homePassword.length) {
            console.log('Password can not be empty');
        }else {
            fetch('http://localhost:4000/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.props.homeInputs.homeUsername,
                    password: this.props.homeInputs.homePassword
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        console.log('Error', res.message);
                    } else {
                        this.fetchUserDetails(this.props.homeInputs.homeUsername);
                    }
                })
        }
    }

    fetchUserDetails(username) {
        fetch('http://localhost:4000/api/getUserDetails?username=' + username, {
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.length === 0) {
                    console.log('Invalid username');
                }else {
                    this.props.saveUserData(res[0]);
                    localStorage.setItem('username', res[0].username);
                    window.location.href = '/chat';
                }
            })
    }

    render() {
        if (!this.props.homeUserData.userData && localStorage.getItem('username')) {
            this.fetchUserDetails(localStorage.getItem('username'));
        }else if (this.props.homeUserData.userData) {
            window.location.href = '/chat';
        }
        return (
            <div className="home-main-container">
                <div className="home-sign-up">
                    <h1 className="title">What are you waiting for?</h1>
                    <Link to="/sign-up">Join Now</Link>
                </div>
                <div className="home-login">
                    <h1 className="title">Sign Back In</h1>
                    <div className="form-container">
                        <label className={this.props.homeInputs.homeUsernameLabelClass}>Enter your username</label>
                        <input type="text" name="username" id="username" value={this.props.homeInputs.homeUsername}
                               onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusInput.bind(this)}
                               onBlur={this.onBlurInput.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.props.homeInputs.homePasswordLabelClass}>Enter your password</label>
                        <input type="password" name="password" id="password"
                               value={this.props.homeInputs.homePassword} onChange={this.onChangeInput.bind(this)}
                               onFocus={this.onFocusInput.bind(this)} onBlur={this.onBlurInput.bind(this)}/>
                        <button className="login" onClick={this.onLoginAttempt.bind(this)}>
                            <span className="glyphicon glyphicon-arrow-right"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeInputs: state.inputReducers,
        homeUserData: state.userDataReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputFields: (fieldName, value) => {
            dispatch(
                homeLoginInputChange(fieldName, value)
            )
        },
        changeInputLabels: (labelName, status) => {
            dispatch(
                homeLoginLabelChange(labelName, status)
            )
        },
        saveUserData: (data) => {
            dispatch(
                saveUserData(data)
            )
        }
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(Home);
