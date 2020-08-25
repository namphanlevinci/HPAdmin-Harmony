import * as types from "./types";

export const SearchMerchants = (payload) => ({
  type: types.SearchMerchants,
  payload: payload,
});

export const ViewProfile_Merchants = (payload) => ({
  type: types.ViewProfile_Merchants,
  payload,
});
// GET PENDING MERCHANT LIST
export const getAll_Merchant_Requests = (payload) => ({
  type: types.getAll_Merchant_Requests,
  payload: payload,
});

export const getAll_Merchant_Requests_Success = (payload) => ({
  type: types.getAll_Merchant_Requests_Success,
  payload: payload,
});

export const getAll_Merchant_Requests_Error = (payload) => ({
  type: types.getAll_Merchant_Requests_Error,
  payload: payload,
});

export const ViewMerchant_Request = (payload) => ({
  type: types.ViewMerchant_Request,
  payload,
});

// GET REJECTED MERCHANT LIST

export const getAll_Rejected_Merchants = (payload) => ({
  type: types.getAll_Rejected_Merchants,
  payload: payload,
});

export const getAll_Rejected_Merchants_Success = (payload) => ({
  type: types.getAll_Rejected_Merchants_Success,
  payload: payload,
});

export const getAll_Rejected_Merchants_Error = (payload) => ({
  type: types.getAll_Rejected_Merchants_Error,
  payload: payload,
});

export const ViewMerchant_Rejected_Merchants = (payload) => ({
  type: types.ViewMerchant_Rejected_Merchants,
  payload,
});

// Edit Merchant Information (General)
export const UpdateMerchant_Infor = (payload) => ({
  type: types.UpdateMerchant_Infor,
  payload: payload,
});
export const UpdateMerchant_Infor_Success = (payload) => ({
  type: types.UpdateMerchant_Infor_Success,
  payload: payload,
});
export const UpdateMerchant_Infor_Error = (payload) => ({
  type: types.UpdateMerchant_Infor_Error,
  payload: payload,
});
// Get merchant infor by ID
export const GetMerchant_byID = (payload) => ({
  type: types.GetMerchant_byID,
  payload: payload,
});
export const GetMerchant_byID_Success = (payload) => ({
  type: types.GetMerchant_byID_Success,
  payload: payload,
});
export const GetMerchant_byID_Error = (payload) => ({
  type: types.GetMerchant_byID_Error,
  payload: payload,
});
// Send approval request
export const MERCHANT_APPROVAL = (payload) => ({
  type: types.MERCHANT_APPROVAL,
  payload: payload,
});
export const MERCHANT_APPROVAL_SUCCESS = (payload) => ({
  type: types.MERCHANT_APPROVAL_SUCCESS,
  payload: payload,
});
export const MERCHANT_APPROVAL_ERROR = (payload) => ({
  type: types.MERCHANT_APPROVAL_ERROR,
  payload: payload,
});
// Send reject request
export const MERCHANT_REJECT = (payload) => ({
  type: types.MERCHANT_REJECT,
  payload: payload,
});
export const MERCHANT_REJECT_SUCCESS = (payload) => ({
  type: types.MERCHANT_REJECT_SUCCESS,
  payload: payload,
});
export const MERCHANT_REJECT_ERROR = (payload) => ({
  type: types.MERCHANT_REJECT_ERROR,
  payload: payload,
});

// UPDATE PRINCIPAL INFORMATION
export const UPDATE_PRINCIPAL = (payload) => ({
  type: types.UPDATE_PRINCIPAL,
  payload: payload,
});

// VIEW SERVICE
export const VIEW_SERVICE = (payload) => ({
  type: types.VIEW_SERVICE,
  payload,
});

// VIEW STAFF DETAIL
export const VIEW_STAFF = (payload) => ({
  type: types.VIEW_STAFF,
  payload,
});

// DELETE MERCHANT
export const DELETE_MERCHANT = (payload) => ({
  type: types.DELETE_MERCHANT,
  payload: payload,
});
export const DELETE_MERCHANT_SUCCESS = (payload) => ({
  type: types.DELETE_MERCHANT_SUCCESS,
  payload: payload,
});
export const DELETE_MERCHANT_ERROR = (payload) => ({
  type: types.DELETE_MERCHANT_ERROR,
  payload: payload,
});

// Get Merchant by ID
export const GET_MERCHANT_BY_ID = (payload, path) => ({
  type: types.GET_MERCHANT_BY_ID,
  payload: payload,
  path: path,
});
export const GET_MERCHANT_BY_ID_SUCCESS = (payload) => ({
  type: types.GET_MERCHANT_BY_ID_SUCCESS,
  payload: payload,
});
export const GET_MERCHANT_BY_ID_FAILURE = (payload) => ({
  type: types.GET_MERCHANT_BY_ID_FAILURE,
  payload: payload,
});

// View Merchant profile
export const VIEW_MERCHANT = (payload) => ({
  type: types.VIEW_MERCHANT,
  payload: payload,
});

// Archive & Restore
export const ARCHIVE_MERCHANT = (payload) => ({
  type: types.ARCHIVE_MERCHANT,
  payload: payload,
});
export const RESTORE_MERCHANT = (payload) => ({
  type: types.RESTORE_MERCHANT,
  payload: payload,
});

// Handle status pending merchant
export const SET_PENDING_STATUS = (payload) => ({
  type: types.SET_PENDING_STATUS,
  payload: payload,
});
export const SET_PENDING_STATUS_SUCCESS = (payload) => ({
  type: types.SET_PENDING_STATUS_SUCCESS,
  payload: payload,
});
export const SET_PENDING_STATUS_FAILURE = (payload) => ({
  type: types.SET_PENDING_STATUS_FAILURE,
  payload: payload,
});

// Update merchant settings
export const MERCHANT_UPDATE_SETTING = (payload) => ({
  type: types.MERCHANT_UPDATE_SETTING,
  payload: payload,
});
export const MERCHANT_UPDATE_SETTING_SUCCESS = (payload) => ({
  type: types.MERCHANT_UPDATE_SETTING_SUCCESS,
  payload: payload,
});
export const MERCHANT_UPDATE_SETTING_FAILURE = (payload) => ({
  type: types.MERCHANT_UPDATE_SETTING_FAILURE,
  payload: payload,
});
