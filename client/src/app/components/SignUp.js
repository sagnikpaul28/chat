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
            confirmPassword: ''
        }
    }

    onChangeInput(e) {

    }

    onInputFocus(e) {

    }

    onInputBlur(e) {

    }

    render() {
        return (
            <div className="sign-up">
                <div className="sign-up-container">
                    <div className="form-container">
                        <label>Username</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label>Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label>Email</label>
                        <input type="text" name="email" value={this.state.email} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label>Mobile Number</label>
                        <input type="text" name="number" value={this.state.number} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label>Password</label>
                        <input type="text" name="password" value={this.state.password} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label>Confirm Password</label>
                        <input type="text" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <button type="button">Join</button>
                </div>
            </div>
        )
    }
}
