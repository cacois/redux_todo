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
    state = {
        username: '',
        password: ''
    };

    componentDidMount() {
        console.log('mounted');
        console.log(this);
        this.render = this.render.bind(this);
    }

    render() {
        let usernameChange = (event: any): void => {
            console.log(this);
            this.setState({
                username: event.target.value,
                password: this.state.password
            });
        };

        let passwordChange = (event: any): void => {
            this.setState({
                username: this.state.username,
                password: event.target.value
            });
        };

        let login = (event: any): void => {
            event.preventDefault();
            console.log('login');
            console.log(this);
        };

        return (
            <p>
                LOGIN
                <FormControl
                    type='text'
                    value={this.state.username}
                    placeholder='username'
                    onChange={usernameChange}
                />
                <FormControl
                    type='text'
                    value={this.state.password}
                    placeholder='password'
                    onChange={passwordChange}
                />
                <Button bsStyle='primary' onClick={(e) => {console.log(this);}}>Login</Button>
            </p>
        );
    }
}

export function mapStateToProps(state: IAppState) {
    return {};
}

export default connect(mapStateToProps, AuthActions)(Login);
