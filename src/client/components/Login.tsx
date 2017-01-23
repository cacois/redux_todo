import * as React from 'react';
import {connect} from 'react-redux';
import {FormControl, Button} from 'react-bootstrap';
import {IAppState} from '../store/IAppState';
import AuthActions from '../actions/AuthActions';

interface ILoginProps {
}
interface ILoginState {
    username: string;
    password: string;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
    static propTypes = {};

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    usernameChange = (event: any): void => {
        this.setState({
            username: event.target.value,
            password: this.state.password
        });
    }

    passwordChange = (event: any): void => {
        this.setState({
            username: this.state.username,
            password: event.target.value
        });
    }

    login = (event: any): void => {
        event.preventDefault();
        console.log('login');
        console.log(this.state);
    }

    render() {
        return (
            <p>
                LOGIN
                <FormControl
                    type='text'
                    value={this.state.username}
                    placeholder='username'
                    onChange={this.usernameChange}
                />
                <FormControl
                    type='text'
                    value={this.state.password}
                    placeholder='password'
                    onChange={this.passwordChange}
                />
                <Button bsStyle='primary' onClick={this.login}>+</Button>
            </p>
        );
    }
}

export function mapStateToProps(state: IAppState) {
    return {};
}

export default connect(mapStateToProps, AuthActions)(Login);
