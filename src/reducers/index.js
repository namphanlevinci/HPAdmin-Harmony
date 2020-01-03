import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Settings from "./Settings";
//! USER
import UserLogin from "./User/UserLogin";
import ViewProfile_User from "./User/ViewUserProfile";
import getAllUser from "./User/getAllUser";
import Verify from "./User/Verify";
import addAdminUser from "./User/addAdmin";
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
//! VIEW MERCHANT SERVICE
import VIEW_SERVICE_EDIT from "./Merchants/viewService";
//! SEND APPROVAL & REJECT REQUEST
import Approval from "./Merchants/Approval";
import Reject from "./Merchants/Reject";
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
import Update_Questions from "./Business/update_Questions";
//! CONSUMER & TRANSACTIONS & BATCHS
import getUser_Transaction from "./Transactions/getUser_Transactions";
import getUser_Activity from "./Transactions/getUser_Activity";
import getAllBatch from "./Transactions/getBatch";
import getAllP2P_Transactions from "./Transactions/getP2P";
import getBatchDetail from "./Transactions/getBatchDetail";
//! REPORT STATICS
import Approved_Static from "./Reports/Approved";
//! View Principal Infor
import viewPrincipalInfo from "./Merchants/getPrincipal_Info";
//! GIFTCARD
import GiftCardReducer from "./gift-card/gift-card.reducer";

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
    getMerchant: getMerchant_byID,
    Approval,
    Reject,
    Verify_User: Verify,
    uQuestions: Update_Questions,
    ApprovedStatic: Approved_Static,
    addAdminUser,
    getAllBatch,
    GetP2P: getAllP2P_Transactions,
    BatchDetail: getBatchDetail,
    viewPrincipal: viewPrincipalInfo,
    serviceProps: VIEW_SERVICE_EDIT,
    GiftCardData: GiftCardReducer
  });
