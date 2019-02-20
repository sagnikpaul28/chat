import React from "react";
import { Link } from "react-router-dom";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            usernameLabelClass: '',
            passwordLabelClass: ''
        }
    }

    componentDidMount() {

    }

    onChangeInput(e) {
        let fieldName = e.target.name;
        this.setState({
            [fieldName]: e.target.value
        });
    }

    onFocusInput(e) {
        let fieldName = e.target.name + "LabelClass";
        if (!this.state[fieldName].length) {
            this.setState({
                [fieldName]: 'active'
            })
        }
    }

    onBlurInput(e) {
        let labelName = e.target.name + "LabelClass";
        let fieldName = e.target.name;
        if (!this.state[fieldName].trim().length) {
            this.setState({
                [labelName]: ''
            })
        }
    }

    onLoginAttempt() {
        if (!this.state.username.length) {
            console.log('Username can not be empty');
        }else if (!this.state.password.length) {
            console.log('Password can not be empty');
        }else {
            fetch('http://localhost:4000/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        console.log('Error', res.message);
                    } else {
                        this.fetchUserDetails();
                    }
                })
        }
    }

    fetchUserDetails() {
        fetch('http://localhost:4000/api/getUserDetails?username=' + this.state.username, {
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    render() {
        return (
            <div className="home-main-container">
                <div className="home-sign-up">
                    <h1 className="title">What are you waiting for?</h1>
                    <Link to="/sign-up">Join Now</Link>
                </div>
                <div className="home-login">
                    <h1 className="title">Sign Back In</h1>
                    <div className="form-container">
                        <label className={this.state.usernameLabelClass}>Enter your username</label>
                        <input type="text" name="username" id="username" value={this.state.username} onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusInput.bind(this)} onBlur={this.onBlurInput.bind(this) } />
                    </div>
                    <div className="form-container">
                        <label className={this.state.passwordLabelClass}>Enter your password</label>
                        <input type="password" name="password" id="password" value={this.state.password} onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusInput.bind(this)} onBlur={this.onBlurInput.bind(this) }/>
                        <button className="login" onClick={this.onLoginAttempt.bind(this)}>
                            <span className="glyphicon glyphicon-arrow-right"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
