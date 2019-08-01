import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Settings from "./Settings";
//! USER
import UserLogin from "./User/UserLogin";
import ViewProfile_User from "./User/ViewUserProfile";
import getAllUser from "./User/getAllUser";
//! MERCHANT ACCEPTED LIST
import MerchantsList from "./Merchants/Merchants_List";
import SearchMerchants from "./Merchants/SearchMerchants";
import ViewProfile_Merchants from "./Merchants/ViewProfile_Merchants";
//! MERCHANT REJECTED LIST
import Merchants_RejectedList from "./Merchants/Merchants_RejectList";
import ViewProfile_Rejected from "./Merchants/ViewProfile_Rejected";
//! MERCHANT PENDING LIST
import MerchantRequests_List from "./Merchants/MerchantsPending_List";
import ViewMerchant_Request from "./Merchants/ViewMerchant_Pending";
//! EDIT MERCHANT INFOR (GENERAL)
import updateMerchant_Infor from "./Merchants/updateMerchant_Infor";
//! GET MERCHANT BY ID
import getMerchant_byID from "./Merchants/getMerchant_byID";
//! NOTIFICATIONS
import getAll_Notifications from "./notifications/getAll_Notifications";
//! LOGS
import getAll_Logs from "./Logs/getAll_Logs";
//! BUSINESS
import getAll_Questions from "./Business/getAll_Questions";
import getAll_Transactions from "./Transactions/getTransactions";
import getAll_ConsumerUsers from "./Business/getAll_ConsumerUsers";

//!CONSUMER
import getUser_Transaction from "./Transactions/getUser_Transactions";
import getUser_Activity from "./Transactions/getUser_Activity";

export default history =>
  combineReducers({
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
    getNoti: getAll_Notifications,
    getLogs: getAll_Logs,
    getQuestions: getAll_Questions,
    getTransactions: getAll_Transactions,
    getConsumerUsers: getAll_ConsumerUsers,
    userTransaction: getUser_Transaction,
    userActivity: getUser_Activity,
    updateMerchant_Infor,
    getMerchant: getMerchant_byID
  });
