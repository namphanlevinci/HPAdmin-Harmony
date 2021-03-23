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

export const getStaff = (MerchantID, path) => async (dispatch, getState) => {
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
      `${URL}/staff/${StaffID}?api-version=1.1`,
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

export const getServiceByID = (MerchantID, path) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.GET_MERCHANT_SERVICE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/service/getbymerchant/${MerchantID}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_MERCHANT_SERVICE_SUCCESS,
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
      type: types.GET_MERCHANT_SERVICE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMerchantServiceById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ADD_MERCHANT_SERVICE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId } = payload;

    const { data } = await axios.post(
      `${URL}/service`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ADD_MERCHANT_SERVICE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getServiceByID(merchantId));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ADD_MERCHANT_SERVICE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const viewService = (payload) => async (dispatch) => {
  dispatch({
    type: types.VIEW_MERCHANT_SERVICE,
    payload: payload,
  });
};
export const setPageExtra = (payload) => async (dispatch) => {
  dispatch({
    type: "SET_PAGE_EXTRA",
    payload: payload,
  });
};
export const setSizeExtra = (payload) => async (dispatch) => {
  dispatch({
    type: "SET_SIZE_EXTRA",
    payload: payload,
  });
};
export const setPageProduct = (payload) => async (dispatch) => {
  dispatch({
    type: "SET_PAGE_PROD",
    payload: payload,
  });
};
export const setSizeProduct = (payload) => async (dispatch) => {
  dispatch({
    type: "SET_SIZE_PROD",
    payload: payload,
  });
};

export const setPage = (payload) => async (dispatch) => {
  dispatch({
    type: "SET_PAGE",
    payload: payload,
  });
};
export const setSize = (payload) => async (dispatch) => {
  dispatch({ type: "SET_SIZE", payload: payload });
};
export const updateMerchantServiceById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_SERVICE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, serviceId, path } = payload;

    const { data } = await axios.put(
      `${URL}/service/${serviceId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_SERVICE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getServiceByID(merchantId, path));
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

export const restoreServiceById = (serviceID, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.RESTORE_MERCHANT_SERVICE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/service/restore/${serviceID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.RESTORE_MERCHANT_SERVICE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getServiceByID(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.RESTORE_MERCHANT_SERVICE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveServiceById = (serviceID, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ARCHIVE_MERCHANT_SERVICE_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/service/archive/${serviceID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ARCHIVE_MERCHANT_SERVICE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getServiceByID(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ARCHIVE_MERCHANT_SERVICE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductByID = (merchantID, path) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.GET_MERCHANT_PRODUCT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/product/getbymerchant/${merchantID}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_MERCHANT_PRODUCT_SUCCESS,
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
      type: types.GET_MERCHANT_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMerchantProductById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ADD_MERCHANT_PRODUCT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, path, sku } = payload;

    const { data } = await axios.get(`${URL}/product/checksku?sku=${sku}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (Number(data.codeNumber) === 404) {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data.message,
      });

      dispatch({
        type: types.ADD_MERCHANT_PRODUCT_FAILURE,
        payload: data.message,
      });
    } else {
      const { data } = await axios.post(
        `${URL}/product`,
        { ...payload },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      dispatch({
        type: types.ADD_MERCHANT_PRODUCT_SUCCESS,
        payload: data,
      });

      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data?.message,
      });

      dispatch(getProductByID(merchantId, path));
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
      type: types.ADD_MERCHANT_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const viewProduct = (payload) => async (dispatch) => {
  const { path } = payload;

  dispatch({
    type: types.VIEW_MERCHANT_PRODUCT,
    payload: payload,
  });

  history.push(path);
};

export const updateMerchantProductById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_PRODUCT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, productId, path } = payload;

    const { data } = await axios.put(
      `${URL}/product/${productId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_PRODUCT_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getProductByID(merchantId, path));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_MERCHANT_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveProductById = (productId, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ARCHIVE_MERCHANT_PRODUCT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/product/archive/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ARCHIVE_MERCHANT_PRODUCT_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getProductByID(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ARCHIVE_MERCHANT_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const restoreProductById = (productId, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.RESTORE_MERCHANT_PRODUCT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/product/restore/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.RESTORE_MERCHANT_PRODUCT_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getProductByID(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.RESTORE_MERCHANT_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExtraByID = (merchantID, path) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.GET_MERCHANT_EXTRA_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/extra/getbymerchant/${merchantID}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_MERCHANT_EXTRA_SUCCESS,
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
      type: types.GET_MERCHANT_EXTRA_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMerchantExtraById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_EXTRA_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, extraId, path } = payload;

    const { data } = await axios.put(
      `${URL}/extra/${extraId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_EXTRA_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getExtraByID(merchantId, path));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_MERCHANT_EXTRA_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveExtraById = (extraId, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ARCHIVE_MERCHANT_EXTRA_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(`${URL}/extra/archive/${extraId}`, null, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.ARCHIVE_MERCHANT_EXTRA_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getExtraByID(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ARCHIVE_MERCHANT_EXTRA_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const restoreExtraById = (productId, MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.RESTORE_MERCHANT_EXTRA_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/extra/restore/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.RESTORE_MERCHANT_EXTRA_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getExtraByID(MerchantID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.RESTORE_MERCHANT_EXTRA_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const DownloadMerchantTemplateById = () => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: types.MERCHANT_DOWNLOAD_TEMPLATE_REQUEST });
    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/customer/import/template`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    dispatch({
      type: types.MERCHANT_DOWNLOAD_TEMPLATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: types.MERCHANT_DOWNLOAD_TEMPLATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const importService = (merchantID, file) => async (
  dispatch,
  getState
) => {
  try {
    const {
      verifyUser: { user },
    } = await getState();
    let formData = new FormData();
    formData.append("serviceFile", file);

    const { data } = await axios.put(
      `${URL}/service/importByMerchant/${merchantID}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (data.codeNumber === 200) {
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data.message,
      });
      dispatch(getServiceByID(merchantID));
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const importCategory = (merchantID, file) => async (
  dispatch,
  getState
) => {
  try {
    const {
      verifyUser: { user },
    } = await getState();

    let formData = new FormData();
    formData.append("fileCategory", file);

    const { data } = await axios.put(
      `${URL}/category/import/${merchantID}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (data.codeNumber === 200) {
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data.message,
      });
      dispatch(getCategoryByID(merchantID));
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const importExtra = (merchantID, file) => async (dispatch, getState) => {
  try {
    const {
      verifyUser: { user },
    } = await getState();

    let formData = new FormData();
    formData.append("fileExtra", file);

    const { data } = await axios.put(
      `${URL}/extra/import/${merchantID}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (data.codeNumber === 200) {
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data.message,
      });
      dispatch(getExtraByID(merchantID));
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const AddMerchantTemplateById = ({ merchantId, file }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: types.MERCHANT_ADD_TEMPLATE_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    let formData = new FormData();
    formData.append("customer-template", file);

    const { data } = await axios.put(
      `${URL}/customer/import/${merchantId}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.MERCHANT_ADD_TEMPLATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: types.MERCHANT_ADD_TEMPLATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveMerchantById = (merchantId, reason) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ARCHIVE_MERCHANT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.delete(`${URL}/merchant/${merchantId}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      data: { reason },
    });

    dispatch({
      type: types.ARCHIVE_MERCHANT_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getMerchantByID(merchantId));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ARCHIVE_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const restoreMerchantById = (merchantId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.RESTORE_MERCHANT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/merchant/enable/${merchantId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.RESTORE_MERCHANT_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getMerchantByID(merchantId));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.RESTORE_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMerchantSettingById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_SETTING_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, path } = payload;

    const { data } = await axios.put(
      `${URL}/merchant/updatesetting/${merchantId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_SETTING_SUCCESS,
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
      type: types.UPDATE_MERCHANT_SETTING_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const AddMerchantStaffById = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.ADD_STAFF_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, path } = payload;

    const { data } = await axios.post(
      `${URL}/staff?api-version=1.1`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ADD_STAFF_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getStaff(merchantId, path));
  } catch (error) {
    dispatch({
      type: types.ADD_STAFF_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMerchantActivityById = (merchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: types.GET_MERCHANT_ACTIVITY_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/merchantactivity/${merchantID}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.GET_MERCHANT_ACTIVITY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_MERCHANT_ACTIVITY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMerchant = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.ADD_MERCHANT_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { path } = payload;

    const { data } = await axios.post(
      `${URL}/merchant?api-version=1.1`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch({
      type: types.ADD_MERCHANT_SUCCESS,
      payload: data,
    });

    history.push(path);
  } catch (error) {
    dispatch({
      type: types.ADD_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setPendingStatus = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.SET_PENDING_STATUS_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, Status } = payload;

    const { data } = await axios.put(
      `${URL}/merchant/updateStatus/${merchantId}`,
      { Status },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.SET_PENDING_STATUS_SUCCESS,
      payload: data.data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getMerchantByID(merchantId));
  } catch (error) {
    dispatch({
      type: types.SET_PENDING_STATUS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveMerchantById = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.APPROVE_MERCHANT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, path } = payload;

    const { data } = await axios.put(
      `${URL}/merchant/approve/${merchantId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.APPROVE_MERCHANT_SUCCESS,
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
      type: types.APPROVE_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const rejectMerchantById = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.REJECT_MERCHANT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { merchantId, path } = payload;

    const { data } = await axios.put(
      `${URL}/merchant/reject/${merchantId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.REJECT_MERCHANT_SUCCESS,
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
      type: types.REJECT_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addGiftCardByMerchantId = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ADD_GIFT_CARD_MERCHANT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { path } = payload;

    const { data } = await axios.post(
      `${URL}/giftcard/general`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.ADD_GIFT_CARD_MERCHANT_SUCCESS,
      payload: data.data,
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
      type: types.ADD_GIFT_CARD_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const exportGiftCardByMerchantId = (id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.EXPORT_GIFT_CARD_MERCHANT_BY_ID_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/giftcard/getByGeneral/export/excel?generalId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    window.open(data.data.path);

    dispatch({
      type: types.EXPORT_GIFT_CARD_MERCHANT_SUCCESS,
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
      type: types.EXPORT_GIFT_CARD_MERCHANT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getGiftCardName = (name) => async (dispatch, getState) => {
  dispatch({
    type: types.GET_GIFT_CARD_NAME,
    payload: name,
  });
};

export const getMerchantSubscriptionByID = (MerchantID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.GET_MERCHANT_SUBSCRIPTION_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/subscription/getbymerchant/${MerchantID}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_MERCHANT_SUBSCRIPTION_SUCCESS,
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
      type: types.GET_MERCHANT_SUBSCRIPTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMerchantSubscriptionById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_MERCHANT_SUBSCRIPTION_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { subscriptionId } = payload;

    const { data } = await axios.put(
      `${URL}/subscription/${subscriptionId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_MERCHANT_SUBSCRIPTION_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    history.goBack();
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_MERCHANT_SUBSCRIPTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const exportExtra = (id) => async (dispatch, getState) => {
  try {
    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/extra/export/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (data.codeNumber === 200) {
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data?.message,
      });
      window.open(data.data, "_blank").focus();
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const exportService = (id) => async (dispatch, getState) => {
  try {
    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/service/exportByMerchant/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (data.codeNumber === 200) {
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data?.message,
      });
      window.open(data.data, "_blank").focus();
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const exportCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.EXPORT_CATEGORY_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/category/export/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (data.codeNumber === 200) {
      dispatch({
        type: types.EXPORT_CATEGORY_SUCCESS,
        payload: data,
      });
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data?.message,
      });
      window.open(data.data, "_blank").focus();
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: "Failure",
      });
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
      type: types.EXPORT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const delService = (serviceId, merchantID) => async (
  dispatch,
  getState
) => {
  try {
    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.delete(`${URL}/service/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (data.codeNumber === 200) {
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data?.message,
      });
      dispatch(getServiceByID(merchantID));
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data?.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const delExtra = (id, merchantId) => async (dispatch, getState) => {
  try {
    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.delete(`${URL}/extra/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (data?.codeNumber === 200) {
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data?.message,
      });
      dispatch(getExtraByID(merchantId));
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data?.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const delCategory = (id, merchantID) => async (dispatch, getState) => {
  try {
    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.delete(`${URL}/category/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    if (data.codeNumber === 200) {
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data?.message,
      });
      dispatch(getCategoryByID(merchantID));
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data?.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPackageAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.GET_PACKAGE_REQUEST,
    });

    const { data } = await axios.get(`${URL}/package/`);

    dispatch({
      type: types.GET_PACKAGE_SUCCESS,
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
      type: types.GET_PACKAGE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
