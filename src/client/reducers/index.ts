import { combineReducers } from 'redux';
import {counterReducer} from './counter';
import {IAppState} from '../store/configureStore';
import {spinnerReducer} from './spinner';
import {routerReducer} from 'react-router-redux';
import {loginReducer} from './login';

export const rootReducer = combineReducers<IAppState>({
  isWaiting: spinnerReducer,
  counter: counterReducer,
  routing: routerReducer,
  authToken: loginReducer
});

