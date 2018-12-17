import workspace from './reducers/workspace';
import common from './reducers/common'
import database from './reducers/database'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  database,
  workspace,
  common,
  router: routerReducer
});
