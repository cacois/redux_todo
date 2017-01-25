import { combineReducers } from 'redux';
import {counterReducer} from './counter';
import {IAppState} from '../store/IAppState';
import {spinnerReducer} from './spinner';
import {routerReducer} from 'react-router-redux';
import {authReducer} from './auth';

export const rootReducer = combineReducers<IAppState>({
  isWaiting: spinnerReducer,
  counter: counterReducer,
  routing: routerReducer,
  authToken: authReducer
});

