import * as types from './types'

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
