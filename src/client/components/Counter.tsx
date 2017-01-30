import * as React from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import {IAppState} from '../store/configureStore';
import CounterActions from '../actions/CounterActions';

interface ICounterProps {
    increment: () => void;
    incrementIfOdd: () => void;
    decrement: () => void;
    incrementAsync: () => void;
    counter: number;
}

export class Counter extends React.Component<ICounterProps, number> {
    static propTypes = {
        increment: React.PropTypes.func.isRequired,
        incrementIfOdd: React.PropTypes.func.isRequired,
        decrement: React.PropTypes.func.isRequired,
        incrementAsync: React.PropTypes.func.isRequired,
        counter: React.PropTypes.number.isRequired
    };

    render() {
        const {increment, incrementIfOdd, decrement, incrementAsync, counter} = this.props;
        return (
            <p>
                Clicked: {counter} times
                {' '}
                <Button bsStyle='primary' onClick={increment}>+</Button>
                {' '}
                <Button bsStyle='primary' onClick={decrement}>-</Button>
                {' '}
                <Button bsStyle='danger' onClick={incrementIfOdd}>Increment if odd</Button>
                {' '}
                <Button bsStyle='danger' onClick={incrementAsync}>Increment Async</Button>
            </p>
        );
    }
}

export function mapStateToProps(state: IAppState) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps, CounterActions)(Counter);
