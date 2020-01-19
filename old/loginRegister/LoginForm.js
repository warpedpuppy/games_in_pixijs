import React from 'react';


export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.sendToServer = this.sendToServer.bind(this);

        this.state = {
            feedback: '',
        };
    }

    sendToServer(e) {
        e.preventDefault();
        // this has to be username because of passport-local
        const obj = { username: this.props.email, password: this.props.password };
        if (this.props.email === '' || this.props.password === '') {
            this.setState({
                feedback: 'please fill out all fields',
            });
            return;
        }
        this.props.loginFunction(obj);
        this.setState({ feedback: '' });
    }

    render() {
        return (
            <form style={this.props.styleProp} onSubmit={this.sendToServer}>
                <h4>Log In</h4>
                <input
                    type="text"
                    placeholder="email"
                    value={this.props.email}
                    onChange={this.props.updateEmail}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={this.props.password}
                    onChange={this.props.updatePassword}
                    required
                />
                <div>
                    <button type="submit" value="log in">log in</button>
                </div>
                <div className="formFeedback">{this.props.feedback}</div>
                <div className="formFeedback">{this.state.feedback}</div>
            </form>
        );
    }
}
