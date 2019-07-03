import * as types from './types'

export const getAll_Notifications = (payload) => ({
    type: types.getAll_Notifications,
    payload: payload
});

export const getAll_Notifications_Success = (payload) => ({
    type: types.getAll_Notifications_Success,
    payload: payload
});

export const getAll_Notifications_Error = (payload) => ({
    type: types.getAll_Notifications_Error,
    payload: payload
});