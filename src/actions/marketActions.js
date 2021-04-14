import * as types from "../constants/MarketPlaceConstants";
import {
  FAILURE_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "../constants/notificationConstants";

import axios from "axios";
import { config } from "../url/url";
import { history } from "../store/index";

const URL = config.url.URL;

export const restoreMarketPlaceByIdAction = (ID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.RESTORE_MARKET_PLACE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(`${URL}/marketplace/restore/${ID}`, null, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.RESTORE_MARKET_PLACE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
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
      type: types.RESTORE_MARKET_PLACE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveMarketPlaceByIdAction = (ID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ARCHIVE_MARKET_PLACE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(`${URL}/marketplace/archive/${ID}`, null, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.ARCHIVE_MARKET_PLACE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
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
      type: types.ARCHIVE_MARKET_PLACE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMarketPlaceAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ADD_MARKET_PLACE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.post(
      `${URL}/marketplace`,
      { ...value },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ADD_MARKET_PLACE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    history.goBack();
    dispatch({
      type: types.UPDATE_STATUS_ADD_MARKET_PLACE,
      payload: true,
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
      type: types.ADD_MARKET_PLACE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editMarketPlaceByIdAction = (value) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.EDIT_MARKET_PLACE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/marketplace`,
      { ...value },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.EDIT_MARKET_PLACE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    history.push("/app/market-place/home");
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.EDIT_MARKET_PLACE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMarketInfoAction = (value) => async (dispatch, getState) => {
  dispatch({
    type: types.MARKET_PLACE_INFO,
    payload: value,
  });
};
