import * as types from "../constants/merchantConstants";
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
      type: types.RESTORE_STAFF_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/staff/restore/${ID}?merchantId=${MerchantID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.RESTORE_STAFF_SUCCESS,
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
      type: types.RESTORE_STAFF_FAILURE,
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
      type: types.ARCHIVE_STAFF_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/staff/archive/${ID}?merchantId=${MerchantID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ARCHIVE_STAFF_SUCCESS,
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
      type: types.ARCHIVE_STAFF_FAILURE,
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
      type: types.GET_STAFF_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/staff/getbymerchant/${MerchantID}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_STAFF_SUCCESS,
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
      type: types.GET_STAFF_FAILURE,
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
      type: types.GET_STAFF_BY_ID_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/staff/${StaffID}?merchantId=${MerchantID}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_STAFF_BY_ID_SUCCESS,
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
      type: types.GET_STAFF_BY_ID_FAILURE,
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
      type: types.UPDATE_STAFF_BY_ID_REQUEST,
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
      verifyUser: { user },
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
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_STAFF_BY_ID_SUCCESS,
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
      type: types.UPDATE_STAFF_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMerchantByID = (MerchantID, path) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.GET_MERCHANT_BY_ID_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/merchant/${MerchantID}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.GET_MERCHANT_BY_ID_SUCCESS,
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
      type: types.GET_MERCHANT_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMerchantPendingByID = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_PENDING_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { ID, path } = payload;

    const { data } = await axios.put(
      `${URL}/merchant/${ID}`,
      {
        ...payload,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_PENDING_SUCCESS,
      payload: data.data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data.message,
    });

    dispatch(getMerchantByID(ID, path));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_MERCHANT_PENDING_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const revertMerchantById = (ID, path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.REVERT_MERCHANT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/merchant/restorepending/${ID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.REVERT_MERCHANT_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
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
      type: types.REVERT_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMerchantById = (ID, path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.DELETE_MERCHANT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.delete(`${URL}/merchant/delete/${ID}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.DELETE_MERCHANT_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
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
      type: types.DELETE_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMerchantGeneralById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_GENERAL_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { ID, path, merchantId } = payload;

    const { data } = await axios.put(
      `${URL}/general/${ID}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_GENERAL_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getMerchantByID(merchantId, path));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_MERCHANT_GENERAL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMerchantBankById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_BANK_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { path, merchantId, businessBankId } = payload;

    const { data } = await axios.put(
      `${URL}/merchant/businessbank/${businessBankId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_BANK_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getMerchantByID(merchantId, path));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_MERCHANT_BANK_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const viewPrincipal = (payload) => async (dispatch) => {
  dispatch({
    type: types.VIEW_MERCHANT_PRINCIPAL,
    payload: payload,
  });
};

export const updateMerchantPrincipalById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_PRINCIPAL_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { path, merchantId, principalID } = payload;

    const { data } = await axios.put(
      `${URL}/merchant/principal/${principalID}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_PRINCIPAL_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(viewPrincipal(payload));
    dispatch(getMerchantByID(merchantId));
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
      type: types.UPDATE_MERCHANT_PRINCIPAL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const viewCategory = (payload) => async (dispatch) => {
  dispatch({
    type: types.VIEW_MERCHANT_CATEGORY,
    payload: payload,
  });
};

export const getCategoryByID = (MerchantID, path) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.GET_MERCHANT_CATEGORY_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/category/getbymerchant/${MerchantID}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_MERCHANT_CATEGORY_SUCCESS,
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
      type: types.GET_MERCHANT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMerchantCategoryById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_CATEGORY_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, categoryId } = payload;

    const { data } = await axios.put(
      `${URL}/category/${categoryId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_CATEGORY_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getCategoryByID(merchantId));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_MERCHANT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMerchantCategoryById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ADD_MERCHANT_CATEGORY_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId } = payload;

    const { data } = await axios.post(
      `${URL}/category`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ADD_MERCHANT_CATEGORY_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getCategoryByID(merchantId));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ADD_MERCHANT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveCategoryById = (categoryID, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ARCHIVE_MERCHANT_CATEGORY_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/category/archive/${categoryID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ARCHIVE_MERCHANT_CATEGORY_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getCategoryByID(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ARCHIVE_MERCHANT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const restoreCategoryById = (categoryID, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.RESTORE_MERCHANT_CATEGORY_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/category/restore/${categoryID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.RESTORE_MERCHANT_CATEGORY_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getCategoryByID(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.RESTORE_MERCHANT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
