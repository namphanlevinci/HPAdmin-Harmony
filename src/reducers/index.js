import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import Settings from "./Settings";
// USER
import userReducer from "./User/UserReducer";
// import Verify from "./User/Verify";
// import addAdminUser from "./User/addAdmin";
// MERCHANT ACCEPTED LIST
import ViewProfile_Merchants from "./Merchants/ViewProfile_Merchants";
import ViewProfile_Rejected from "./Merchants/ViewProfile_Rejected";
import VIEW_SERVICE_EDIT from "./Merchants/viewService";

// GET MERCHANT BY ID
import getMerchant_byID from "./Merchants/getMerchant_byID";
// NOTIFICATIONS
import NotificationReducer from "./Notifications/";
// LOGS
import getAll_Logs from "./Logs/getAll_Logs";
// BUSINESS
import getAll_Questions from "./Business/getAll_Questions";
import getAll_Transactions from "./Transactions/getTransactions";
import getAll_ConsumerUsers from "./Business/getAll_ConsumerUsers";
import Update_Questions from "./Business/update_Questions";

// CONSUMER & TRANSACTIONS & BATCH
import getUser_Transaction from "./Transactions/getUser_Transactions";
import getUser_Activity from "./Transactions/getUser_Activity";
import getAllBatch from "./Transactions/getBatch";
import getAllP2P_Transactions from "./Transactions/getP2P";
import getBatchDetail from "./Transactions/getBatchDetail";
// REPORT STATICS
import Approved_Static from "./Reports/Approved";

// Gift Card
import GiftCardReducer from "./gift-card/gift-card.reducer";
import {
  downloadMerchantTemplateReducer,
  MerchantReducer,
  addMerchantTemplateReducer,
} from "./Merchants/MerchantReducer";
// Consumer
import ConsumerReducer from "./Consumer/index";
// Fetch api
import { fetchApiReducer } from "./fetchApiReducer";
// Merchant & Staff
import {
  restoreStaffReducer,
  archiveStaffReducer,
  getStaffReducer,
  getStaffByIdReducer,
  updateStaffByIdReducer,
  getMerchantByIdReducer,
  updateMerchantByIdReducer,
  revertMerchantByIdReducer,
  deleteMerchantByIdReducer,
  updateMerchantGeneralByIdReducer,
  updateMerchantBankByIdReducer,
  updateMerchantPrincipalByIdReducer,
  getMerchantCategoryByIdReducer,
  updateMerchantCategoryByIdReducer,
  addMerchantCategoryByIdReducer,
  restoreMerchantCategoryByIdReducer,
  archiveMerchantCategoryByIdReducer,
} from "./merchantReducer";
// Consumer
import {
  getConsumerByIdReducer,
  restoreConsumerByIdReducer,
  archiveConsumerByIdReducer,
  updateConsumerByIdReducer,
} from "./consumerReducer";
// User
import {
  getUserByIdReducer,
  restoreUserReducer,
  archiveUserReducer,
  changeUserPasswordByIdReducer,
  updateUserByIdReducer,
  verifyUserReducer,
  userLoginReducer,
  userPermissionReducer,
} from "./userReducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,

    userReducer,
    ViewProfile_Merchants,

    ViewProfile_Rejected,
    NotificationReducer,
    getLogs: getAll_Logs,
    getQuestions: getAll_Questions,
    getTransactions: getAll_Transactions,
    getConsumerUsers: getAll_ConsumerUsers,
    userTransaction: getUser_Transaction,
    userActivity: getUser_Activity,
    getMerchant: getMerchant_byID,

    uQuestions: Update_Questions,
    ApprovedStatic: Approved_Static,
    // addAdminUser,
    getAllBatch,
    GetP2P: getAllP2P_Transactions,
    BatchDetail: getBatchDetail,

    serviceProps: VIEW_SERVICE_EDIT,

    GiftCardReducer,
    MerchantReducer,
    ConsumerReducer,

    // Merchant
    downloadTemplate: downloadMerchantTemplateReducer,
    addTemplate: addMerchantTemplateReducer,
    fetchApi: fetchApiReducer,
    merchant: getMerchantByIdReducer,
    updateMerchant: updateMerchantByIdReducer,
    revertMerchant: revertMerchantByIdReducer,
    deleteMerchant: deleteMerchantByIdReducer,
    updateMerchantGeneral: updateMerchantGeneralByIdReducer,
    updateMerchantBank: updateMerchantBankByIdReducer,
    updateMerchantPrincipal: updateMerchantPrincipalByIdReducer,
    category: getMerchantCategoryByIdReducer,
    updateCategory: updateMerchantCategoryByIdReducer,
    addCategory: addMerchantCategoryByIdReducer,
    archiveCategory: archiveMerchantCategoryByIdReducer,
    restoreCategory: restoreMerchantCategoryByIdReducer,

    // Staff
    restoreStaff: restoreStaffReducer,
    archiveStaff: archiveStaffReducer,
    staff: getStaffReducer,
    staffById: getStaffByIdReducer,
    updateStaffById: updateStaffByIdReducer,

    // Consumer
    consumerById: getConsumerByIdReducer,
    archiveConsumer: archiveConsumerByIdReducer,
    restoreConsumer: restoreConsumerByIdReducer,
    updateConsumerById: updateConsumerByIdReducer,

    // User
    userById: getUserByIdReducer,
    archiveUser: archiveUserReducer,
    restoreUser: restoreUserReducer,
    changeUserPassword: changeUserPasswordByIdReducer,
    updateUser: updateUserByIdReducer,
    user: userLoginReducer,
    verifyUser: verifyUserReducer,
    userPermissions: userPermissionReducer,
  });
