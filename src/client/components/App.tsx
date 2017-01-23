import * as React from 'react';
import { Link, hashHistory } from 'react-router';

export default class App extends React.Component<any, any> {
    render() {
        return (
            <div>
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
