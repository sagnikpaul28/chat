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
            confirmPasswordLabel: ''
        }
    }

    onChangeInput(e) {
        let fieldName = e.target.name;
        this.setState({
            [fieldName]: e.target.value
        });
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

    render() {
        return (
            <div className="sign-up">
                <div className="sign-up-container">
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
                        <input type="text" name="password" value={this.state.password} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <div className="form-container">
                        <label className={this.state.confirmPasswordLabel}>Confirm Password</label>
                        <input type="text" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChangeInput.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)}/>
                    </div>
                    <button type="button">Join</button>
                </div>
            </div>
        )
    }
}
