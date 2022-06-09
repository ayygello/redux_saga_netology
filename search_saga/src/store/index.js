import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import skillsReducer from '../reducers/skills';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);

export default store;
