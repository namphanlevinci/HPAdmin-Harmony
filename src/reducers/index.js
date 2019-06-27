import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import UserLogin from "./UserLogin";
// MERCHANT LIST
import MerchantsList from "./Merchants/Merchants_List";
import SearchMerchants from './Merchants/SearchMerchants';
import ViewProfile_Merchants from "./Merchants/ViewProfile_Merchants";
// MERCHANT REQUEST
import MerchantRequests_List from "./Merchant-Request/Request_List";
import SearchMerchant_Request from "./Merchant-Request/SearchMerchant_Request";
import ViewMerchant_Request from "./Merchant-Request/ViewMerchant_Request"
export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  User: UserLogin,
  MerchantsList,
  SearchMerchants,
  ViewProfile_Merchants,
  MerchantRequests_List,
  SearchMerchant_Request,
  ViewMerchant_Request
});
