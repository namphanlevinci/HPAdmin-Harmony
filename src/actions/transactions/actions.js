import * as types from './types'


export const getAll_Transactions = (payload) => ({
    type: types.getAll_Transactions,
    payload: payload
});

export const getAll_Transactions_Success = (payload) => ({
    type: types.getAll_Transactions_Success,
    payload: payload
});

export const getAll_Transactions_Error = (payload) => ({
    type: types.getAll_Transactions_Error,
    payload: payload
});