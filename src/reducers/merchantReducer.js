import * as types from "../constants/merchantConstants";

const restoreStaffReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_STAFF_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_STAFF_SUCCESS:
      return {
        loading: false,
      };

    case types.RESTORE_STAFF_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const archiveStaffReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_STAFF_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_STAFF_SUCCESS:
      return {
        loading: false,
      };

    case types.ARCHIVE_STAFF_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const getStaffReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_STAFF_REQUEST:
      return {
        loading: true,
      };
    case types.GET_STAFF_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.GET_STAFF_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const getStaffByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_STAFF_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.GET_STAFF_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.GET_STAFF_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const updateStaffByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_STAFF_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_STAFF_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.UPDATE_STAFF_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const getMerchantByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_MERCHANT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_MERCHANT_BY_ID_SUCCESS:
      return {
        loading: false,
        merchant: payload,
      };
    case types.GET_MERCHANT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const updateMerchantByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_MERCHANT_PENDING_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_MERCHANT_PENDING_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.UPDATE_MERCHANT_PENDING_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const revertMerchantByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.REVERT_MERCHANT_REQUEST:
      return {
        loading: true,
      };
    case types.REVERT_MERCHANT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.REVERT_MERCHANT_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const deleteMerchantByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.DELETE_MERCHANT_REQUEST:
      return {
        loading: true,
      };
    case types.DELETE_MERCHANT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.DELETE_MERCHANT_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const updateMerchantGeneralByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_STAFF_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_STAFF_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.UPDATE_STAFF_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const updateMerchantBankByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_MERCHANT_BANK_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_MERCHANT_BANK_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.UPDATE_MERCHANT_BANK_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const updateMerchantPrincipalByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.VIEW_MERCHANT_PRINCIPAL:
      return {
        ...state,
        principal: payload,
      };
    case types.UPDATE_MERCHANT_PRINCIPAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_MERCHANT_PRINCIPAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.UPDATE_MERCHANT_PRINCIPAL_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const getMerchantCategoryByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.VIEW_MERCHANT_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case types.GET_MERCHANT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_MERCHANT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: payload,
      };
    case types.GET_MERCHANT_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const updateMerchantCategoryByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_MERCHANT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_MERCHANT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: payload,
      };
    case types.UPDATE_MERCHANT_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const addMerchantCategoryByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_MERCHANT_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case types.ADD_MERCHANT_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ADD_MERCHANT_CATEGORY_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const archiveMerchantCategoryByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_MERCHANT_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_MERCHANT_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ARCHIVE_MERCHANT_CATEGORY_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const restoreMerchantCategoryByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_MERCHANT_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_MERCHANT_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.RESTORE_MERCHANT_CATEGORY_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const getMerchantServiceByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_MERCHANT_SERVICE_REQUEST:
      return {
        loading: true,
      };
    case types.GET_MERCHANT_SERVICE_SUCCESS:
      return {
        loading: false,
        serviceList: payload,
      };
    case types.GET_MERCHANT_SERVICE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const addMerchantServiceByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_MERCHANT_SERVICE_REQUEST:
      return {
        loading: true,
      };
    case types.ADD_MERCHANT_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ADD_MERCHANT_SERVICE_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const updateMerchantServiceByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.VIEW_MERCHANT_SERVICE:
      return {
        ...state,
        service: payload,
      };
    case types.UPDATE_MERCHANT_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_MERCHANT_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.UPDATE_MERCHANT_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const archiveMerchantServiceByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_MERCHANT_SERVICE_FAILURE:
      return {
        loading: true,
      };
    case types.ARCHIVE_MERCHANT_SERVICE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ARCHIVE_MERCHANT_SERVICE_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const restoreMerchantServiceByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_MERCHANT_SERVICE_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_MERCHANT_SERVICE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.RESTORE_MERCHANT_SERVICE_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

export {
  restoreStaffReducer,
  archiveStaffReducer,
  getStaffReducer,
  getStaffByIdReducer,
  updateStaffByIdReducer,
  getMerchantByIdReducer,
  updateMerchantByIdReducer,
  revertMerchantByIdReducer,
  deleteMerchantByIdReducer,
  updateMerchantGeneralByIdReducer,
  updateMerchantBankByIdReducer,
  updateMerchantPrincipalByIdReducer,
  getMerchantCategoryByIdReducer,
  updateMerchantCategoryByIdReducer,
  addMerchantCategoryByIdReducer,
  archiveMerchantCategoryByIdReducer,
  restoreMerchantCategoryByIdReducer,
  getMerchantServiceByIdReducer,
  addMerchantServiceByIdReducer,
  updateMerchantServiceByIdReducer,
  restoreMerchantServiceByIdReducer,
  archiveMerchantServiceByIdReducer,
};
