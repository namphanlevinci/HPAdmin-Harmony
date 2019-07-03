import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
// USER
import UserLogin from "./User/UserLogin";
import ViewProfile_User from "./User/ViewUserProfile"
import getAllUser from "./User/getAllUser"
// MERCHANT LIST
import MerchantsList from "./Merchants/Merchants_List";
import SearchMerchants from './Merchants/SearchMerchants';
import ViewProfile_Merchants from "./Merchants/ViewProfile_Merchants";
// MERCHANT REQUEST
import MerchantRequests_List from "./Merchant-Request/Request_List";
import ViewMerchant_Request from "./Merchant-Request/ViewMerchant_Request"
// NOTIFICATIONS
import getAll_Notifications from "./notifications/getAll_Notifications";

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  User: UserLogin,
  getAllUser,
  ViewProfile_User,
  ViewProfile_Merchants,
  MerchantsList,
  SearchMerchants,
  MerchantRequests_List,
  ViewMerchant_Request,
  getNoti : getAll_Notifications
});
