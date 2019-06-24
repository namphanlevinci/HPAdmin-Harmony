import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import UserLogin from "./UserLogin";
import MerchantsList from "./Merchants/Merchants_List";
import SearchMerchants from './Merchants/SearchMerchants';
import ViewProfile_Merchants from "./Merchants/ViewProfile_Merchants";
import MerchantRequests_List from "./Merchant-Request/Request_List"
export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  User: UserLogin,
  MerchantsList,
  SearchMerchants,
  ViewProfile_Merchants,
  MerchantRequests_List
});
