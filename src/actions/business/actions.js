import * as types from './types'

export const getAll_Questions = (payload) => ({
    type: types.getAll_Questions,
    payload: payload
});

export const getAll_Questions_Success = (payload) => ({
    type: types.getAll_Questions_Success,
    payload: payload
});

export const getAll_Questions_Error = (payload) => ({
    type: types.getAll_Questions_Error,
    payload: payload
});