import {
  CHANGE_DIRECTION,
  CHANGE_NAVIGATION_STYLE,
  DARK_THEME,
  DRAWER_TYPE,
  HORIZONTAL_MENU_POSITION,
  SWITCH_LANGUAGE,
  THEME_COLOR,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH,
  SET_DEVICES,
  SELECT_TERMINAL
} from "../constants/ActionTypes";

import {
  FAILURE_NOTIFICATION,
} from "../constants/notificationConstants";

import axios from "axios";
import { config } from "../url/url";

const URL = config.url.URL;


export function toggleCollapsedNav(isNavCollapsed) {
  return { type: TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}

export function setDrawerType(drawerType) {
  return { type: DRAWER_TYPE, drawerType };
}

export function updateWindowWidth(width) {
  return { type: WINDOW_WIDTH, width };
}

export function setThemeColor(color) {
  return { type: THEME_COLOR, color };
}

export function setDarkTheme() {
  return { type: DARK_THEME };
}

export function changeDirection() {
  return { type: CHANGE_DIRECTION };
}

export function changeNavigationStyle(layoutType) {
  return {
    type: CHANGE_NAVIGATION_STYLE,
    payload: layoutType
  };
}

export function setHorizontalMenuPosition(navigationPosition) {
  return {
    type: HORIZONTAL_MENU_POSITION,
    payload: navigationPosition
  };
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}

export function selectTerminal(payload) {
  return {
    type: SELECT_TERMINAL,
    payload,
  };
}

export const getDevices = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'GET_DEVICE_REQUEST' });

    const merchantId = payload;
    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/Merchant/${merchantId}/device-terminal`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: SET_DEVICES, payload: data.data.map((obj) => ({
        id: obj.id,
        terminalId: obj.terminalId,
        deviceId: obj.deviceId
      }))
    });

  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: 'GET_DEVICES_FAILURE',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDevices = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'GET_DEVICE_REQUEST' });

    const { merchantId, deviceList } = payload;
    const {
      verifyUser: { user },
    } = await getState();

    console.log({deviceList})

    const { data } = await axios.put(`${URL}/Merchant/${merchantId}/device-terminal`,
      deviceList
      , {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

    dispatch({
      type: 'SUCCESS_NOTIFICATION',
      payload: data.message,
    });

    dispatch({
      type : 'UPDATE_DEVICE_SUCCESS'
    });

    dispatch(getDevices(merchantId));

  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: 'GET_DEVICES_FAILURE',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};