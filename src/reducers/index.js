import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
// USER
import UserLogin from "./User/UserLogin";
import ViewProfile_User from "./User/ViewUserProfile"
import getAllUser from "./User/getAllUser"
// MERCHANT ACCEPTED LIST
import MerchantsList from "./Merchants/Merchants_List";
import SearchMerchants from './Merchants/SearchMerchants';
import ViewProfile_Merchants from "./Merchants/ViewProfile_Merchants";
// MERCHANT REJECTED LIST 
import Merchants_RejectedList from "./Merchants/Merchants_RejectList";
import ViewProfile_Rejected from "./Merchants/ViewProfile_Rejected";
// MERCHANT PENDING LIST
import MerchantRequests_List from "./Merchants/MerchantsPending_List";
import ViewMerchant_Request from "./Merchants/ViewMerchant_Pending";
// NOTIFICATIONS
import getAll_Notifications from "./notifications/getAll_Notifications";
// LOGS
import getAll_Logs from "./Logs/getAll_Logs";
//BUSINESS 
import getAll_Questions from "./Business/getAll_Questions"

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
  ViewProfile_Rejected,
  Merchants_RejectedList,
  getNoti : getAll_Notifications,
  getLogs: getAll_Logs,
  getQuestions: getAll_Questions
});
