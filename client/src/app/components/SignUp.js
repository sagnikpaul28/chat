import React from "react";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            email: '',
            number: '',
            password: '',
            confirmPassword: '',
            nameLabel: '',
            usernameLabel: '',
            emailLabel: '',
            numberLabel: '',
            passwordLabel: '',
            confirmPasswordLabel: '',
            errorMessage: ''
        };

        this.saveDetails = this.saveDetails.bind(this);
    }

    onChangeInput(e) {
        let fieldName = e.target.name;
        this.setState({
            [fieldName]: e.target.value,
        });
        if (this.state.errorMessage.length) {
            this.setState({
                errorMessage: ''
            })
        }
    }

    onInputFocus(e) {
        let fieldName = e.target.name;
        let labelName = fieldName + 'Label';
        this.setState({
            [labelName]: 'active'
        });
    }

    onInputBlur(e) {
        let fieldName = e.target.name;
        let labelName = fieldName + 'Label';
        if (e.target.value.trim().length === 0) {
            this.setState({
                [labelName]: ''
            });
        }
    }

    onFormSubmit() {
        if (!this.state.username.length) {
            this.setState({
                errorMessage: '*Username can not be blank'
            });
        }else if (!this.state.name.length) {
            this.setState({
                errorMessage: '*Name can not be blank'
            })
        }else if (!this.state.email.length) {
            this.setState({
                errorMessage: '*Email can not be blank'
            })
        }else if (!this.state.number.length) {
            this.setState({
                errorMessage: '*Number can not be blank'
            })
        }else if (!this.state.password.length) {
            this.setState({
                errorMessage: '*Password can not be blank'
            })
        }else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errorMessage: '*Passwords do not match'
            });
        }else {
            this.saveDetails();
        }
    }

    saveDetails() {
        let self = this;
        fetch('http://localhost:4000/api/addNewUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                name: this.state.name,
                email: this.state.email,
                number: this.state.number,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error === true) {
                    this.setState({
                        errorMessage: res.message
                    })
                }else {
                    //Success
                }
            })
    }

    render() {
        return (
            <div className="sign-up">
                <div className="sign-up-container">
                    <div className="error-message">{this.state.errorMessage}</div>
                    <div className="form-container">
                        <label className={this.state.usernameLabel}>Username</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.state.nameLabel}>Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.state.emailLabel}>Email</label>
                        <input type="text" name="email" value={this.state.email} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.state.numberLabel}>Mobile Number</label>
                        <input type="text" name="number" value={this.state.number} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.state.passwordLabel}>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.state.confirmPasswordLabel}>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <button type="button" onClick={this.onFormSubmit.bind(this)}>Join</button>
                </div>
            </div>
        )
    }
}
