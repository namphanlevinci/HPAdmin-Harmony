import * as types from './types'

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
