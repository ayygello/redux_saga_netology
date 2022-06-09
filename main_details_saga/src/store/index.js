import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import serviceListReducer from '../reducers/serviceList';
import singleServiceReducer from '../reducers/singleService';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    serviceList: serviceListReducer,
    singleService: singleServiceReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);

export default store;
