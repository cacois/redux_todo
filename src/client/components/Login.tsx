import * as React from 'react';
import {connect} from 'react-redux';
import {FormControl, Button} from 'react-bootstrap';
import {IAppState} from '../store/configureStore';
import LoginActions from '../actions/LoginActions';
import Spinner from './Spinner';

interface ILoginProps {
    login: (username: string, password: string) => Function;
}

interface ILoginState {
    username: string;
    password: string;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
    static propTypes = {
        login: React.PropTypes.func.isRequired
    };
    state = {
        username: '',
        password: ''
    };

    usernameChange(event: any): void {
        this.setState({
            username: event.target.value,
            password: this.state.password
        });
    }

    passwordChange(event: any): void {
        this.setState({
            username: this.state.username,
            password: event.target.value
        });
    };

    render() {
        const {login} = this.props;
        return (
            <div>
                <Spinner/>
                LOGIN
                <FormControl id='username' type='text' value={this.state.username}
                             placeholder='username' onChange={(e) => this.usernameChange(e)}/>
                <FormControl id='password' type='text' value={this.state.password}
                             placeholder='password' onChange={(e) => this.passwordChange(e)}/>
                <Button id='login' bsStyle='primary'
                        onClick={(e) => login(this.state.username, this.state.password)}>Login</Button>
            </div>
        );
    }
}

export function mapStateToProps(state: IAppState) {
    return {};
}

export default connect(mapStateToProps, LoginActions)(Login);
