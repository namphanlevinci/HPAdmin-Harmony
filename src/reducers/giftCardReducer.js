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

export { addGiftCardGeneralReducer, getGiftCardGeneralByIdReducer };
