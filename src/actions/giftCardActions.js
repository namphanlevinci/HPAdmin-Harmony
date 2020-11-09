import * as types from "../constants/giftCardConstants";
import {
  FAILURE_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "../constants/notificationConstants";

import axios from "axios";
import { config } from "../url/url";
import { history } from "../store/index";

const URL = config.url.URL;

export const addGiftCardGeneral = (giftCardGeneralId, quantity) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ADD_GIFT_CARD_GENERAL_CODE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.post(
      `${URL}/giftcardgeneral/general`,
      { giftCardGeneralId, quantity },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ADD_GIFT_CARD_GENERAL_CODE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getGiftCardGeneral(giftCardGeneralId));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ADD_GIFT_CARD_GENERAL_CODE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getGiftCardGeneral = (giftCardGeneralId, path) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.GET_GIFT_CARD_GENERAL_BY_ID_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/giftcardgeneral/${giftCardGeneralId}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_GIFT_CARD_GENERAL_BY_ID_SUCCESS,
      payload: data.data,
    });

    if (path) {
      history.push(path);
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.GET_GIFT_CARD_GENERAL_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const exportGiftCardGeneral = (url) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.EXPORT_GIFT_CARD_GENERAL_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.EXPORT_GIFT_CARD_GENERAL_SUCCESS,
      payload: data,
    });

    window.open(data.data.path);
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
      type: types.EXPORT_GIFT_CARD_GENERAL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCodeLog = (CodeId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.GET_CODE_LOG_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/giftcardlog/${CodeId}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.GET_CODE_LOG_SUCCESS,
      payload: data.data,
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
      type: types.GET_CODE_LOG_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
