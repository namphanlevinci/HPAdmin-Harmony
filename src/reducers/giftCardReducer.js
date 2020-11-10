import * as types from "../constants/giftCardConstants";

const addGiftCardGeneralReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_GIFT_CARD_GENERAL_CODE_REQUEST:
      return {
        loading: true,
      };
    case types.ADD_GIFT_CARD_GENERAL_CODE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ADD_GIFT_CARD_GENERAL_CODE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const getGiftCardGeneralByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_GIFT_CARD_GENERAL_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.GET_GIFT_CARD_GENERAL_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.GET_GIFT_CARD_GENERAL_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const exportGiftCardGeneralReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.EXPORT_GIFT_CARD_GENERAL_REQUEST:
      return {
        loading: true,
      };
    case types.EXPORT_GIFT_CARD_GENERAL_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.EXPORT_GIFT_CARD_GENERAL_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const getCodeLogReducer = (
  state = {
    loading: false,
    log: [],
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_CODE_LOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_CODE_LOG_SUCCESS:
      return {
        loading: false,
        log: payload,
      };
    case types.GET_CODE_LOG_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const updateTemplateReducer = (
  state = {
    loading: false,
    template: "",
  },
  { type, payload }
) => {
  switch (type) {
    case types.VIEW_TEMPLATE:
      return {
        ...state,
        template: payload,
      };
    case types.UPDATE_TEMPLATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const archiveTemplateReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_TEMPLATE_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_TEMPLATE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ARCHIVE_TEMPLATE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const restoreTemplateReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_TEMPLATE_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_TEMPLATE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.RESTORE_TEMPLATE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const addTemplateReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_TEMPLATE_REQUEST:
      return {
        loading: true,
      };
    case types.ADD_TEMPLATE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ADD_TEMPLATE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export {
  addGiftCardGeneralReducer,
  getGiftCardGeneralByIdReducer,
  exportGiftCardGeneralReducer,
  getCodeLogReducer,
  updateTemplateReducer,
  archiveTemplateReducer,
  restoreTemplateReducer,
  addTemplateReducer,
};
