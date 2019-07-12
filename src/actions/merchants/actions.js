import * as types from './types'

//GET ALL ACCEPTED MERCHANT LIST
export const getAll_Merchants = (payload) => ({
    type: types.getAll_Merchants,
    payload: payload
});

export const getAll_Merchants_Success = (payload) => ({
    type: types.getAll_Merchants_Success,
    payload: payload
});

export const getAll_Merchants_Error = (payload) => ({
    type: types.getAll_Merchants_Error,
    payload: payload
});

export const SearchMerchants = (payload) => ({
    type: types.SearchMerchants,
    payload: payload
})

export const ViewProfile_Merchants = (payload) => ({
    type: types.ViewProfile_Merchants,
    payload
})
// GET PENDING MERCHANT LIST
export const getAll_Merchant_Requests = (payload) => ({
    type: types.getAll_Merchant_Requests,
    payload: payload
});

export const getAll_Merchant_Requests_Success = (payload) => ({
    type: types.getAll_Merchant_Requests_Success,
    payload: payload
});

export const getAll_Merchant_Requests_Error = (payload) => ({
    type: types.getAll_Merchant_Requests_Error,
    payload: payload
});

export const ViewMerchant_Request = (payload) => ({
    type: types.ViewMerchant_Request,
    payload
})

// GET REJECTED MERCHANT LIST

export const getAll_Rejected_Merchants = (payload) => ({
    type: types.getAll_Rejected_Merchants,
    payload: payload
});

export const getAll_Rejected_Merchants_Success = (payload) => ({
    type: types.getAll_Rejected_Merchants_Success,
    payload: payload
});

export const getAll_Rejected_Merchants_Error = (payload) => ({
    type: types.getAll_Rejected_Merchants_Error,
    payload: payload
});

export const ViewMerchant_Rejected_Merchants = (payload) => ({
    type: types.ViewMerchant_Rejected_Merchants,
    payload
})