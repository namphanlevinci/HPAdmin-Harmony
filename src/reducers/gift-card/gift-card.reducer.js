import * as typeGiftCard from "../../actions/gift-card/types";

const initialState = {
  generation: [],
  template: [],
  detail: {},
  GenerationByID: [],
  generationCode_log: [],
};

const GiftCardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeGiftCard.GET_GIFT_CARD_SUCCESS:
      state.generation = payload;
      return { ...state };
    case typeGiftCard.GET_TEMPLATE_SUCCESS:
      state.template = payload;
      return { ...state };
    case typeGiftCard.VIEW_DETAIL:
      state.detail = payload;
      return { ...state };
    case typeGiftCard.GET_GIFT_CARD_BY_ID_SUCCESS:
      state.GenerationByID = payload;
      return { ...state };
    case typeGiftCard.GET_GIFT_CARD_CODE_LOG_BY_ID_SUCCESS:
      state.generationCode_log = payload;
      return { ...state };
    default:
      return state;
  }
};

export default GiftCardReducer;
