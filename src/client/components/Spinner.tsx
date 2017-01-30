import * as React from 'react';
import {connect} from 'react-redux';
import {IAppState} from '../store/configureStore';

interface ISpinnerProps {
    isWaiting: Boolean;
}

export class Spinner extends React.Component<ISpinnerProps, any> {
    render() {
        const {isWaiting} = this.props;

        let el:JSX.Element = null;
        if (isWaiting) {
            el = <div className='loading'>Loading</div>;
        }
        return el;
    }
}

export function SpinnerSelector(state: IAppState) {
    return {
        isWaiting: state.isWaiting
    };
}

export default connect(SpinnerSelector)(Spinner);
