import * as types from './types'

export const getAll_Logs = (payload) => ({
    type: types.getAll_Logs,
    payload: payload
});

export const getAll_Logs_Success = (payload) => ({
    type: types.getAll_Logs_Success,
    payload: payload
});

export const getAll_Logs_Error = (payload) => ({
    type: types.getAll_Logs_Error,
    payload: payload
});