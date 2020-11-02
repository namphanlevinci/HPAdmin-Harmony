import {
  RESTORE_STAFF_REQUEST,
  RESTORE_STAFF_SUCCESS,
  RESTORE_STAFF_FAILURE,
  ARCHIVE_STAFF_FAILURE,
  ARCHIVE_STAFF_SUCCESS,
  ARCHIVE_STAFF_REQUEST,
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
  GET_STAFF_FAILURE,
  GET_STAFF_BY_ID_REQUEST,
  GET_STAFF_BY_ID_SUCCESS,
  GET_STAFF_BY_ID_FAILURE,
  UPDATE_STAFF_BY_ID_REQUEST,
  UPDATE_STAFF_BY_ID_SUCCESS,
  UPDATE_STAFF_BY_ID_FAILURE,
} from "../constants/merchantConstants";
import {
  FAILURE_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "../constants/notificationConstants";

import axios from "axios";
import { config } from "../url/url";
import { history } from "../store/index";

const URL = config.url.URL;

export const restoreStaffById = (ID, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: RESTORE_STAFF_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/staff/restore/${ID}?merchantId=${MerchantID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${User?.token}`,
        },
      }
    );

    dispatch({
      type: RESTORE_STAFF_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getStaff(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: RESTORE_STAFF_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveStaffById = (ID, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ARCHIVE_STAFF_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/staff/archive/${ID}?merchantId=${MerchantID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${User?.token}`,
        },
      }
    );

    dispatch({
      type: ARCHIVE_STAFF_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getStaff(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: ARCHIVE_STAFF_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStaff = (MerchantID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_STAFF_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/staff/getbymerchant/${MerchantID}`,
      {
        headers: {
          Authorization: `Bearer ${User?.token}`,
        },
      }
    );

    dispatch({
      type: GET_STAFF_SUCCESS,
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
      type: GET_STAFF_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStaffByID = (StaffID, MerchantID, path) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_STAFF_BY_ID_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/staff/${StaffID}?merchantId=${MerchantID}`,
      {
        headers: {
          Authorization: `Bearer ${User?.token}`,
        },
      }
    );

    dispatch({
      type: GET_STAFF_BY_ID_SUCCESS,
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
      type: GET_STAFF_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStaffByID = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_STAFF_BY_ID_REQUEST,
    });
    const {
      firstName,
      lastName,
      displayName,
      cashPercent,
      address: { street, city, state, zip },
      cellphone,
      email,
      pin,
      fileId,
      confirmPin,
      isActive,
      isDisabled,
      driverLicense,
      socialSecurityNumber,
      professionalLicense,
      workingTime,
      tipFee,
      salary,
      productSalary,
      Roles: { NameRole },
      MerchantID,
      path,
      StaffID,
    } = payload;

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/staff/${StaffID}`,
      {
        firstName,
        lastName,
        displayName,
        cashPercent,
        address: { street, city, state, zip },
        cellphone,
        email,
        pin,
        fileId,
        confirmPin,
        isActive,
        isDisabled,
        driverLicense,
        socialSecurityNumber,
        professionalLicense,
        workingTime,
        tipFee,
        salary,
        productSalary,
        Roles: { NameRole },
        MerchantID,
      },
      {
        headers: {
          Authorization: `Bearer ${User?.token}`,
        },
      }
    );

    dispatch({
      type: UPDATE_STAFF_BY_ID_SUCCESS,
      payload: data.data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data.message,
    });

    dispatch(getStaffByID(StaffID, MerchantID, path));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: UPDATE_STAFF_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
