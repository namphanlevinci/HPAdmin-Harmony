import * as typeGiftCard from "../../actions/gift-card/types";

const initialState = {
  generation: [],
  template: [],
  detail: {},
  generation_code: [],
  generationCode_log: []
};

const GiftCardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeGiftCard.GET_GIFTCARD_SUCCESS:
      state.generation = payload;
      return { ...state };
    case typeGiftCard.GET_TEMPLATE_SUCCESS:
      state.template = payload;
      return { ...state };
    case typeGiftCard.VIEW_DETAIL:
      state.detail = payload;
      return { ...state };
    case typeGiftCard.GET_GIFTCARD_BY_ID_SUCCESS:
      state.generation_code = payload?.giftCards;
      return { ...state };
    case typeGiftCard.GET_GIFTCARD_CODE_LOG_BY_ID_SUCCESS:
      state.generationCode_log = payload;
      return { ...state };
    default:
      return state;
  }
};

export default GiftCardReducer;
