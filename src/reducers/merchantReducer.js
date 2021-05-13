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
    statusAddStaff: false,
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

    case types.UPDATE_STATUS_ADD_STAFF:
      return {
        ...state,
        statusAddStaff: payload,
      }
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
    case "SET_SIZE":
      return { ...state, size: payload };
    case "SET_PAGE":
      return { ...state, page: payload };
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
    case types.ARCHIVE_MERCHANT_SERVICE_REQUEST:
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

const getMerchantProductByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_MERCHANT_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case types.GET_MERCHANT_PRODUCT_SUCCESS:
      return {
        loading: false,
        productList: payload,
      };
    case types.GET_MERCHANT_PRODUCT_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const addMerchantProductByIdReducer = (
  state = {
    loading: false,
    statusAddProduct: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_MERCHANT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_MERCHANT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.ADD_MERCHANT_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.UPDATE_STATUS_ADD_PRODUCT:
      return {
        ...state,
        statusAddProduct: payload
      }
    default:
      return state;
  }
};

const updateMerchantProductByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "SET_PAGE_PROD":
      return { ...state, page: payload };
    case "SET_SIZE_PROD":
      return { ...state, size: payload };
    case types.VIEW_MERCHANT_PRODUCT:
      return {
        ...state,
        updateProduct: payload,
      };
    case types.UPDATE_MERCHANT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_MERCHANT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.UPDATE_MERCHANT_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const archiveMerchantProductByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_MERCHANT_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_MERCHANT_PRODUCT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ARCHIVE_MERCHANT_PRODUCT_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const restoreMerchantProductByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_MERCHANT_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_MERCHANT_PRODUCT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.RESTORE_MERCHANT_PRODUCT_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const getMerchantExtraByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_MERCHANT_EXTRA_REQUEST:
      return {
        loading: true,
      };
    case types.GET_MERCHANT_EXTRA_SUCCESS:
      return {
        loading: false,
        extraList: payload,
      };
    case types.GET_MERCHANT_EXTRA_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const updateMerchantExtraByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "SET_PAGE_EXTRA":
      return { ...state, page: payload };
    case "SET_SIZE_EXTRA":
      return { ...state, size: payload };
    case types.UPDATE_MERCHANT_EXTRA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_MERCHANT_EXTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.UPDATE_MERCHANT_EXTRA_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const archiveMerchantExtraByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_MERCHANT_EXTRA_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_MERCHANT_EXTRA_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ARCHIVE_MERCHANT_EXTRA_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const restoreMerchantExtraByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_MERCHANT_EXTRA_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_MERCHANT_EXTRA_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.RESTORE_MERCHANT_EXTRA_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const archiveMerchantByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_MERCHANT_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_MERCHANT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ARCHIVE_MERCHANT_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const restoreMerchantByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_MERCHANT_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_MERCHANT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.RESTORE_MERCHANT_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const updateMerchantSettingByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_MERCHANT_SETTING_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_MERCHANT_SETTING_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.UPDATE_MERCHANT_SETTING_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const addMerchantStaffByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_STAFF_REQUEST:
      return {
        loading: true,
      };
    case types.ADD_STAFF_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ADD_STAFF_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const getMerchantActivityByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_MERCHANT_ACTIVITY_REQUEST:
      return {
        loading: true,
      };
    case types.GET_MERCHANT_ACTIVITY_SUCCESS:
      return {
        loading: false,
        activityList: payload,
      };
    case types.GET_MERCHANT_ACTIVITY_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const addMerchantReducer = (
  state = {
    loading: false,
    statusAddMerchant: false
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_MERCHANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_MERCHANT_SUCCESS:
      return {
        ...state,
        loading: false,
        activityList: payload,
      };
    case types.ADD_MERCHANT_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.UPDATE_STATUS_ADD_MERCHANT:
      return {
        ...state,
        statusAddMerchant: payload,
      }
    default:
      return state;
  }
};

const merchantPendingStatusReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.SET_PENDING_STATUS_REQUEST:
      return {
        loading: true,
      };
    case types.SET_PENDING_STATUS_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.SET_PENDING_STATUS_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const downloadMerchantTemplateReducer = (
  state = { loading: false },
  { type, payload }
) => {
  switch (type) {
    case types.MERCHANT_DOWNLOAD_TEMPLATE_REQUEST:
      return {
        loading: true,
        template: {},
      };
    case types.MERCHANT_DOWNLOAD_TEMPLATE_SUCCESS:
      window.open(payload);

      return {
        loading: false,
        template: payload,
      };

    case types.MERCHANT_DOWNLOAD_TEMPLATE_FAIL:
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
    case types.MERCHANT_ADD_TEMPLATE_REQUEST:
      return {
        loading: true,
        template: {},
      };
    case types.MERCHANT_ADD_TEMPLATE_SUCCESS:
      return {
        loading: false,
        template: payload,
      };

    case types.MERCHANT_ADD_TEMPLATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const approveMerchantReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.APPROVE_MERCHANT_REQUEST:
      return {
        loading: true,
      };
    case types.APPROVE_MERCHANT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.APPROVE_MERCHANT_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const rejectMerchantReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.REJECT_MERCHANT_REQUEST:
      return {
        loading: true,
      };
    case types.REJECT_MERCHANT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.REJECT_MERCHANT_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const addGiftCardByMerchantReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_GIFT_CARD_MERCHANT_REQUEST:
      return {
        loading: true,
      };
    case types.ADD_GIFT_CARD_MERCHANT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ADD_GIFT_CARD_MERCHANT_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const exportGiftCardByMerchantReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.EXPORT_GIFT_CARD_MERCHANT_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.EXPORT_GIFT_CARD_MERCHANT_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.EXPORT_GIFT_CARD_MERCHANT_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const giftCardNameReducer = (
  state = {
    name: "",
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_GIFT_CARD_NAME:
      return {
        name: payload,
      };

    default:
      return state;
  }
};

const merchantSubscriptionReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_MERCHANT_SUBSCRIPTION_REQUEST:
      return {
        loading: true,
      };
    case types.GET_MERCHANT_SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.GET_MERCHANT_SUBSCRIPTION_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const updateMerchantSubscriptionByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_MERCHANT_SUBSCRIPTION_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_MERCHANT_SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.UPDATE_MERCHANT_SUBSCRIPTION_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const packageReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_PACKAGE_REQUEST:
      return {
        loading: true,
      };
    case types.GET_PACKAGE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.GET_PACKAGE_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

const merchantStateReducer = (
  state = {
    data: [],
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_STATE_MERCHANT_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case types.GET_STATE_MERCHANT_FAILURE:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
};


const deviceReducer = (
  state = {
    loading: false,
    deviceList: [],
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_DEVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_DEVICE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case 'set_devices':
      return {
        ...state,
        loading: false,
        deviceList: payload,
      };
    case 'select_terminal':
      const { terminal, index } = payload;
      let deviceList = state.deviceList;
      deviceList = checkTerminal(terminal, deviceList);
      deviceList[index].terminalId = terminal;
      return {
        ...state,
        deviceList
      }
    default:
      return state;
  }
};

const checkTerminal = (terminal, deviceList = []) => {
  for (let index = 0; index < deviceList.length; index++) {
    if (deviceList[index].terminalId == terminal) {
      deviceList[index].terminalId = '';
    }
  }
  return deviceList;
}

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
  getMerchantProductByIdReducer,
  addMerchantProductByIdReducer,
  updateMerchantProductByIdReducer,
  archiveMerchantProductByIdReducer,
  restoreMerchantProductByIdReducer,
  getMerchantExtraByIdReducer,
  restoreMerchantExtraByIdReducer,
  archiveMerchantExtraByIdReducer,
  updateMerchantExtraByIdReducer,
  restoreMerchantByIdReducer,
  archiveMerchantByIdReducer,
  updateMerchantSettingByIdReducer,
  addMerchantStaffByIdReducer,
  getMerchantActivityByIdReducer,
  addMerchantReducer,
  merchantPendingStatusReducer,
  downloadMerchantTemplateReducer,
  addMerchantTemplateReducer,
  approveMerchantReducer,
  rejectMerchantReducer,
  addGiftCardByMerchantReducer,
  exportGiftCardByMerchantReducer,
  giftCardNameReducer,
  merchantSubscriptionReducer,
  updateMerchantSubscriptionByIdReducer,
  packageReducer,
  deviceReducer,
  merchantStateReducer,
};
