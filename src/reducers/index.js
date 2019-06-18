import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import UserLogin from "./UserLogin"


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  User: UserLogin
});
