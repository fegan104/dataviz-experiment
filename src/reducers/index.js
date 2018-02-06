import DataReducer from './DataReducer'
import responseReducer from './ResponseReducer';
import sessionIdReducer from './SessionIdReducer';
import counterReducer from './CounterReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  data: DataReducer,
  router: routerReducer,
  responses: responseReducer,
  sessionId: sessionIdReducer,
  counter: counterReducer
});