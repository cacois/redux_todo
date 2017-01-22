import Store = Redux.Store;
import {IAppState} from '../store/IAppState';

export interface IRootProps {
    store: Store<IAppState>;
}
