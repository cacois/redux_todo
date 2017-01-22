import { combineReducers } from 'redux';
import {counterReducer} from './counter';
import {IAppState} from '../store/IAppState';
import {routerReducer} from 'react-router-redux';

export const rootReducer = combineReducers<IAppState>({
  counter: counterReducer,
  routing: routerReducer
});

