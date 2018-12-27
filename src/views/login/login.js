import React, { Component } from 'react';
import { connect } from 'react-redux'

//Actions
import { onLogin } from '../../redux/login/actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// Style
const errorText = {
    color: 'red',
};

const progressBar = {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px',
    alignItems: 'center'
}
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px'
}

class LoginContainer extends Component {

    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            missingUsername: false,
            missingPassword: false,
            invalidCredentials: false,
        }
    }
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    onLogin = async (event) => {
        let { username, password } = this.state;
        let result = null;
        if (!username) {
            this.setState({ missingUsername: true });
            event.preventDefault();
            return true;
        }
        if (!password) {
            this.setState({ missingPassword: true })
            event.preventDefault();
            return true;
        }
        event.preventDefault();
        if (username && password) {
            await this.props.onLogin();
            result = this.props.login && this.props.login.results.some(item => {
                return item.name === username && item.birth_year === password;
            })
            if (result) {
                this.setState({
                    username: null,
                    password: null,
                    missingUsername: null,
                    missingPassword: null,
                    invalidCredentials: null
                });
                this.props.history.replace('/landing');
            }
            else
                this.setState({ invalidCredentials: 'Invalid Credentials' });
        }
        event.preventDefault();
    }
    render() {
        let { missingUsername, missingPassword, invalidCredentials } = this.state
        let { isFetching } = this.props
        return (
            <form style={formStyle}>
                <TextField
                    required
                    error={missingUsername}
                    id="username-required"
                    label="UserName"
                    onChange={this.handleUsernameChange}
                    margin="normal"
                />
                <TextField
                    required
                    error={missingPassword}
                    type="password"
                    id="password-required"
                    label="Password"
                    onChange={this.handlePasswordChange}
                    margin="normal"
                />

                {isFetching &&
                    <div style={progressBar}>
                        <CircularProgress />
                    </div>
                }
                <Button variant="contained" color="primary" onClick={this.onLogin}>Submit</Button>
                {invalidCredentials && <p style={errorText}>{invalidCredentials}</p>}
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login.peopleList,
        isFetching: state.login.isFetching,
        error: state.login.error,
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        onLogin: (credentials) => dispatch(onLogin(credentials)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)