import { configureStore } from '@reduxjs/toolkit'
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga'
import rootReducer, { IAppState } from '../reducers/rootReducer'
import { Store } from 'redux'
import {rootSaga} from '../sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

export default function configuredstore(): Store<IAppState, any> {
  const store = configureStore({ reducer: rootReducer,
          middleware: (getDefaultMiddleware) => getDefaultMiddleware({
              thunk : false
          })
          .concat(sagaMiddleware).concat(logger)});
  sagaMiddleware.run(rootSaga)
  return store
}


