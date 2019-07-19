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
// users
export const getAll_ConsumerUsers = (payload) => ({
    type: types.getAll_ConsumerUsers,
    payload: payload
});

export const getAll_ConsumerUsers_Success = (payload) => ({
    type: types.getAll_ConsumerUsers_Success,
    payload: payload
});

export const getAll_ConsumerUsers_Error = (payload) => ({
    type: types.getAll_ConsumerUsers_Error,
    payload: payload
});