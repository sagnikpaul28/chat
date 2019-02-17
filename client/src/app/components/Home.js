import React from "react";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            labelClass: ''
        }
    }

    componentDidMount() {

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onFocusUsername() {
        if (!this.state.labelClass.length) {
            this.setState({
                labelClass: 'active'
            })
        }
    }

    onBlurUsername() {
        if (!this.state.username.trim().length) {
            this.setState({
                labelClass: ''
            })
        }
    }

    render() {
        return (
            <div className="home-main-container">
                <div className="home-sign-up">
                    <h1 className="title">What are you waiting for?</h1>
                    <button type="button" className="sign-up">Join Now</button>
                </div>
                <div className="home-login">
                    <h1 className="title">Sign Back In</h1>
                    <div className="form-container">
                        <label className={this.state.labelClass}>Enter your username</label>
                        <input type="text" name="name" id="name" value={this.state.username} onChange={this.onChangeUsername.bind(this)} onFocus={this.onFocusUsername.bind(this)} onBlur={this.onBlurUsername.bind(this) }/>
                        <button className="login">
                            <span className="glyphicon glyphicon-arrow-right"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
