import * as types from "./types";

// LOGIN USER
export const USER_LOGIN_REQUEST = (payload) => ({
  type: types.USER_LOGIN_REQUEST,
  payload: payload,
});
export const USER_LOGIN_SUCCESS = (payload) => ({
  type: types.USER_LOGIN_SUCCESS,
  payload: payload,
});

export const USER_LOGIN_FAILURE = (payload) => ({
  type: types.USER_LOGIN_FAILURE,
  payload: payload,
});
// LOGOUT USER
export const USER_LOGOUT = (payload) => ({
  type: types.USER_LOGOUT,
  payload: payload,
});

// VERIFY USER
export const VERIFY_USER = (payload) => ({
  type: types.VERIFY_USER,
  payload: payload,
});
export const VERIFY_SUCCESS = (payload) => ({
  type: types.VERIFY_SUCCESS,
  payload: payload,
});
export const VERIFY_FAILURE = (payload) => ({
  type: types.VERIFY_FAILURE,
  payload: payload,
});

// GET ALL USER
export const GET_USER_REQUEST = (payload) => ({
  type: types.GET_USER_REQUEST,
  payload: payload,
});
export const GET_USER_SUCCESS = (payload) => ({
  type: types.GET_USER_SUCCESS,
  payload: payload,
});
export const GET_USER_FAILURE = (payload) => ({
  type: types.GET_USER_FAILURE,
  payload: payload,
});
export const VIEW_PROFILE_USER = (payload) => ({
  type: types.VIEW_PROFILE_USER,
  payload: payload,
});

// GET ADMIN USER BY ID
export const GET_USER_BY_ID = (payload) => ({
  type: types.GET_USER_BY_ID,
  payload: payload,
});
export const GET_USER_BY_ID_SUCCESS = (payload) => ({
  type: types.GET_USER_BY_ID_SUCCESS,
  payload: payload,
});
export const GET_USER_BY_ID_FAILURE = (payload) => ({
  type: types.GET_USER_BY_ID_FAILURE,
  payload: payload,
});
// ADD ADMIN USER
export const ADD_ADMIN = (payload) => ({
  type: types.ADD_ADMIN,
  payload: payload,
});
export const ADD_ADMIN_SUCCESS = (payload) => ({
  type: types.ADD_ADMIN_SUCCESS,
  payload: payload,
});
export const ADD_ADMIN_FAILURE = (payload) => ({
  type: types.ADD_ADMIN_FAILURE,
  payload: payload,
});

// GET PERMISSION BY ROLE ID
export const GET_PERMISSION_BY_ID = (payload) => ({
  type: types.GET_PERMISSION_BY_ID,
  payload: payload,
});
export const GET_PERMISSION_BY_ID_SUCCESS = (payload) => ({
  type: types.GET_PERMISSION_BY_ID_SUCCESS,
  payload: payload,
});
export const GET_PERMISSION_BY_ID_FAILURE = (payload) => ({
  type: types.GET_PERMISSION_BY_ID_FAILURE,
  payload: payload,
});

// GET ALL PERMISSION
export const GET_ALL_PERMISSION = (payload) => ({
  type: types.GET_ALL_PERMISSION,
  payload: payload,
});
export const GET_ALL_PERMISSION_SUCCESS = (payload) => ({
  type: types.GET_ALL_PERMISSION_SUCCESS,
  payload: payload,
});
export const GET_ALL_PERMISSION_FAILURE = (payload) => ({
  type: types.GET_ALL_PERMISSION_FAILURE,
  payload: payload,
});

// Get permissions on login
export const GET_PERMISSION_ON_LOGIN = (payload) => ({
  type: types.GET_PERMISSION_ON_LOGIN,
  payload: payload,
});

export const GET_PERMISSION_ON_LOGIN_SUCCESS = (payload) => ({
  type: types.GET_PERMISSION_ON_LOGIN_SUCCESS,
  payload: payload,
});

// UPDATE ROLE PERMISSION
export const UPDATE_PERMISSIONS = (payload, ID) => ({
  type: types.UPDATE_PERMISSIONS,
  payload: payload,
  currentUser: ID,
});
export const UPDATE_PERMISSIONS_SUCCESS = (payload) => ({
  type: types.UPDATE_PERMISSIONS_SUCCESS,
  payload: payload,
});
export const UPDATE_PERMISSIONS_FAILURE = (payload) => ({
  type: types.UPDATE_PERMISSIONS_FAILURE,
  payload: payload,
});

// Update user admin
export const UPDATE_USER_ADMIN = (payload) => ({
  type: types.UPDATE_USER_ADMIN,
  payload: payload,
});
export const UPDATE_USER_ADMIN_SUCCESS = (payload) => ({
  type: types.UPDATE_USER_ADMIN_SUCCESS,
  payload: payload,
});
export const UPDATE_USER_ADMIN_FAILURE = (payload) => ({
  type: types.UPDATE_USER_ADMIN_FAILURE,
  payload: payload,
});

// Change user password
export const UPDATE_USER_PASSWORD = (payload) => ({
  type: types.UPDATE_USER_PASSWORD,
  payload: payload,
});

// Get current user login
export const GET_CURRENT_USER = (payload) => ({
  type: types.GET_CURRENT_USER,
  payload: payload,
});
export const GET_CURRENT_USER_SUCCESS = (payload) => ({
  type: types.GET_CURRENT_USER_SUCCESS,
  payload: payload,
});
export const GET_CURRENT_USER_FAILURE = (payload) => ({
  type: types.GET_CURRENT_USER_FAILURE,
  payload: payload,
});

// Enable & Disable user
export const DISABLE_USER = (payload) => ({
  type: types.DISABLE_USER,
  payload: payload,
});
export const ENABLE_USER = (payload) => ({
  type: types.ENABLE_USER,
  payload: payload,
});
