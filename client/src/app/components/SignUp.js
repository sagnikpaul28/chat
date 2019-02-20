import React from "react";
import {setSignUpErrorMessage, signUpInputChange, signUpLabelChange} from "../actions/inputActions";
import {connect} from "react-redux";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.saveDetails = this.saveDetails.bind(this);
    }

    onChangeInput(e) {
        this.props.inputChange(e.target.name, e.target.value);
        if (this.props.inputs.signUpErrorMessage.length) {
            this.props.setErrorMessage('');
        }
    }

    onInputFocus(e) {
        let fieldName = e.target.name;
        this.props.labelChange(fieldName, 'active');
    }

    onInputBlur(e) {
        let fieldName = e.target.name;
        if (e.target.value.trim().length === 0) {
            this.props.labelChange(fieldName, '');
        }
    }

    onFormSubmit() {
        if (!this.props.inputs.signUpUsername.length) {
            this.props.setErrorMessage('*Username can not be blank');
        }else if (!this.props.inputs.signUpName.length) {
            this.props.setErrorMessage('*Name can not be blank');
        }else if (!this.props.inputs.signUpEmail.length) {
            this.props.setErrorMessage('*Email can not be blank');
        }else if (!this.props.inputs.signUpNumber.length) {
            this.props.setErrorMessage('*Number can not be blank');
        }else if (!this.props.inputs.signUpPassword.length) {
            this.props.setErrorMessage('*Password can not be blank');
        }else if (this.props.inputs.signUpPassword !== this.props.inputs.signUpConfirmPassword) {
            this.props.setErrorMessage('*Passwords do not match');
        }else {
            this.saveDetails();
        }
    }

    saveDetails() {
        fetch('http://localhost:4000/api/addNewUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.props.inputs.username,
                name: this.props.inputs.name,
                email: this.props.inputs.email,
                number: this.props.inputs.number,
                password: this.props.inputs.password
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error === true) {
                    this.props.setErrorMessage(res.message);
                }else {
                    //Success
                }
            })
    }

    render() {
        return (
            <div className="sign-up">
                <div className="sign-up-container">
                    <div className="error-message">{this.props.inputs.signUpErrorMessage}</div>
                    <div className="form-container">
                        <label className={this.props.inputs.signUpUsernameLabel}>Username</label>
                        <input type="text" name="username" value={this.props.inputs.signUpUsername} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.props.inputs.signUpNameLabel}>Name</label>
                        <input type="text" name="name" value={this.props.inputs.signUpName} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.props.inputs.signUpEmailLabel}>Email</label>
                        <input type="text" name="email" value={this.props.inputs.signUpEmail} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.props.inputs.signUpNumberLabel}>Mobile Number</label>
                        <input type="text" name="number" value={this.props.inputs.signUpNumber} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.props.inputs.signUpPasswordLabel}>Password</label>
                        <input type="password" name="password" value={this.props.inputs.signUpPassword} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.props.inputs.signUpConfirmPasswordLabel}>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={this.props.inputs.signUpConfirmPassword} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <button type="button" onClick={this.onFormSubmit.bind(this)}>Join</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inputs: state.inputReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        inputChange: (fieldName, value) => {
            dispatch(
                signUpInputChange(fieldName, value)
            )
        },
        labelChange: (fieldName, value) => {
            dispatch(
                signUpLabelChange(fieldName, value)
            )
        },
        setErrorMessage: (message) => {
            dispatch(
                setSignUpErrorMessage(message)
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
