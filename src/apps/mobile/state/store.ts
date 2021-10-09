import { Reducer, combineReducers } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { numberReducer, NumberState } from 'src/ducks';
import rootSaga from './sagas';

export interface IApplicationState {
  router: RouterState;
  numericData: NumberState;
}

export const createRootReducer = (history: History): Reducer<IApplicationState> =>
  combineReducers<IApplicationState>({
    router: connectRouter(history),
    numericData: numberReducer,
  });

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(createRootReducer(history), applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export const selectNumber = (state: IApplicationState): number => state.numericData.number;
