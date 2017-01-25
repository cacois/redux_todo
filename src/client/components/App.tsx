import * as React from 'react';
import { Link, hashHistory } from 'react-router';
import Spinner from './Spinner';

export default class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Spinner/>
                <header>
                    Links:
                    {' '}
                    <Link to='/'>Counter</Link>
                    {' '}
                    <Link to='/foo'>Foo</Link>
                </header>
                <div>
                    <button onClick={() => hashHistory.push('/foo')}>Go to /foo</button>
                </div>
                <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
            </div>
        );
    }
}
