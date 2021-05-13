import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import Settings from "./Settings";

// NOTIFICATIONS
import NotificationReducer from "./notificationReducer";

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
  getMerchantServiceByIdReducer,
  addMerchantServiceByIdReducer,
  updateMerchantServiceByIdReducer,
  archiveMerchantServiceByIdReducer,
  restoreMerchantServiceByIdReducer,
  getMerchantProductByIdReducer,
  addMerchantProductByIdReducer,
  updateMerchantProductByIdReducer,
  archiveMerchantProductByIdReducer,
  restoreMerchantProductByIdReducer,
  getMerchantExtraByIdReducer,
  archiveMerchantByIdReducer,
  restoreMerchantByIdReducer,
  updateMerchantSettingByIdReducer,
  addMerchantStaffByIdReducer,
  getMerchantActivityByIdReducer,
  addMerchantReducer,
  merchantPendingStatusReducer,
  downloadMerchantTemplateReducer,
  addMerchantTemplateReducer,
  addGiftCardByMerchantReducer,
  exportGiftCardByMerchantReducer,
  giftCardNameReducer,
  merchantSubscriptionReducer,
  updateMerchantSubscriptionByIdReducer,
  packageReducer,
  updateMerchantExtraByIdReducer,
  deviceReducer,
  merchantStateReducer,
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
  allPermissionReducer,
  updatePermissionReducer,
  allUserReducer,
  addUserReducer,
} from "./userReducer";
// Gift Card
import {
  addGiftCardGeneralReducer,
  getGiftCardGeneralByIdReducer,
  exportGiftCardGeneralReducer,
  getCodeLogReducer,
  updateTemplateReducer,
  archiveTemplateReducer,
  restoreTemplateReducer,
  addTemplateReducer,
  templateReducer,
  addGenerationReducer,
} from "./giftCardReducer";

// Report
import { viewReportMerchantReducer, setViewBatchDate } from "./reportReducer";

// Market Place
import {
  addMarketPlaceReducer,
  editMarketPlaceReducer,
  archiveMarketPlaceReducer,
  restoreMarketPlaceReducer,
  marketPlaceInfoReducer,
} from "./MarketPlaceReducer.js";
// Ticket
import {
  getTicketByIdReducer,
  addTicketReducer,
  updateTicketReducer,
  getTicketCommenByIdReducer,
  getTicketLogByIdReducer,
  sendCommentReducer,
  delTicketFileReducer,
  addTicketFile,
  changeTicketStatusReducer,
} from "./ticketReducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,

    // Notification
    notification: NotificationReducer,

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
    service: getMerchantServiceByIdReducer,
    addService: addMerchantServiceByIdReducer,
    updateService: updateMerchantServiceByIdReducer,
    archiveService: archiveMerchantServiceByIdReducer,
    restoreService: restoreMerchantServiceByIdReducer,
    product: getMerchantProductByIdReducer,
    addProduct: addMerchantProductByIdReducer,
    updateProduct: updateMerchantProductByIdReducer,
    archiveProduct: archiveMerchantProductByIdReducer,
    restoreProduct: restoreMerchantProductByIdReducer,
    extra: getMerchantExtraByIdReducer,
    archiveMerchant: archiveMerchantByIdReducer,
    restoreMerchant: restoreMerchantByIdReducer,
    updateMerchantSetting: updateMerchantSettingByIdReducer,
    activity: getMerchantActivityByIdReducer,
    addMerchant: addMerchantReducer,
    pendingStatus: merchantPendingStatusReducer,
    addGiftCard: addGiftCardByMerchantReducer,
    exportGiftCard: exportGiftCardByMerchantReducer,
    giftCardName: giftCardNameReducer,
    subscription: merchantSubscriptionReducer,
    updateSubscription: updateMerchantSubscriptionByIdReducer,
    package: packageReducer,
    updateMerchantExtra: updateMerchantExtraByIdReducer,
    device : deviceReducer,

    // Staff
    restoreStaff: restoreStaffReducer,
    archiveStaff: archiveStaffReducer,
    staff: getStaffReducer,
    staffById: getStaffByIdReducer,
    updateStaffById: updateStaffByIdReducer,
    addStaff: addMerchantStaffByIdReducer,

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
    allPermissions: allPermissionReducer,
    updatePermissions: updatePermissionReducer,
    addUser: addUserReducer,

    // Gift Card
    addGiftCardGeneral: addGiftCardGeneralReducer,
    getGiftCardGeneral: getGiftCardGeneralByIdReducer,
    exportGiftCardGeneral: exportGiftCardGeneralReducer,
    codeLog: getCodeLogReducer,
    updateTemplate: updateTemplateReducer,
    archiveTemplate: archiveTemplateReducer,
    restoreTemplate: restoreTemplateReducer,
    addTemplateGiftCard: addTemplateReducer,
    template: templateReducer,
    addGeneration: addGenerationReducer,

    // Report
    reportMerchant: viewReportMerchantReducer,
    adminUser: allUserReducer,
    batchTime: setViewBatchDate,

    // Market Place
    addMarketPlace: addMarketPlaceReducer,
    editMarketPlace: editMarketPlaceReducer,
    archiveMarketPlace: archiveMarketPlaceReducer,
    restoreMarketPlace: restoreMarketPlaceReducer,
    marketInfo: marketPlaceInfoReducer,

    // Ticket
    getTicketById: getTicketByIdReducer,
    getTicketCommentById: getTicketCommenByIdReducer,
    getTicketLogById: getTicketLogByIdReducer,
    addTicket: addTicketReducer,
    updateTicket: updateTicketReducer,
    sendComment: sendCommentReducer,
    deleteFile: delTicketFileReducer,
    addFile: addTicketFile,
    changeTicketStatus: changeTicketStatusReducer,
    merchantState : merchantStateReducer
  });
