import * as types from "../../actions/merchants/types";
import {
  MERCHANT_DOWNLOAD_TEMPLATE_REQUEST,
  MERCHANT_DOWNLOAD_TEMPLATE_SUCCESS,
  MERCHANT_DOWNLOAD_TEMPLATE_FAIL,
  MERCHANT_ADD_TEMPLATE_REQUEST,
  MERCHANT_ADD_TEMPLATE_SUCCESS,
  MERCHANT_ADD_TEMPLATE_FAIL,
} from "../../constants/merchantConstants";

const initialState = {
  MerchantData: "",
  setPendingStatus: false,
  PrincipalData: "",
  ServiceData: "",
  ExtraData: [],
  StaffData: "",
  AddStaff: false,
};

const MerchantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.DELETE_MERCHANT_SUCCESS:
      state = payload;
      return { ...state };
    case types.GET_MERCHANT_BY_ID_SUCCESS:
      state.MerchantData = payload;
      return { ...state };
    case types.SET_PENDING_STATUS:
      state.setPendingStatus = true;
      return { ...state };
    case types.SET_PENDING_STATUS_SUCCESS:
      state.setPendingStatus = false;
      return { ...state };
    case types.SET_PENDING_STATUS_FAILURE:
      state.setPendingStatus = false;
      return { ...state };
    case types.VIEW_PRINCIPAL:
      state.PrincipalData = payload;
      return { ...state };
    case types.VIEW_SERVICE:
      state.ServiceData = payload;
      return { ...state };
    case types.GET_MERCHANT_EXTRA_SUCCESS:
      state.ExtraData = payload;
      return { ...state };

    case types.ADD_STAFF:
      state.AddStaff = payload;
      return { ...state };
    case types.MERCHANT_APPROVAL_SUCCESS:
      state = payload;
      return { ...state };
    default:
      return state;
  }
};

const downloadMerchantTemplateReducer = (
  state = { loading: false },
  { type, payload }
) => {
  switch (type) {
    case MERCHANT_DOWNLOAD_TEMPLATE_REQUEST:
      return {
        loading: true,
        template: {},
      };
    case MERCHANT_DOWNLOAD_TEMPLATE_SUCCESS:
      window.open(payload.data);

      return {
        loading: false,
        template: payload,
      };

    case MERCHANT_DOWNLOAD_TEMPLATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const addMerchantTemplateReducer = (
  state = { loading: false },
  { type, payload }
) => {
  switch (type) {
    case MERCHANT_ADD_TEMPLATE_REQUEST:
      return {
        loading: true,
        template: {},
      };
    case MERCHANT_ADD_TEMPLATE_SUCCESS:
      return {
        loading: false,
        template: payload,
      };

    case MERCHANT_ADD_TEMPLATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export {
  MerchantReducer,
  downloadMerchantTemplateReducer,
  addMerchantTemplateReducer,
};
