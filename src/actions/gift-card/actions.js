import * as types from "./types";

// GENERATION
export const GET_GIFT_CARD = (payload) => ({
  type: types.GET_GIFT_CARD,
  payload: payload,
});
export const GET_GIFT_CARD_SUCCESS = (payload) => ({
  type: types.GET_GIFT_CARD_SUCCESS,
  payload: payload,
});
export const GET_GIFT_CARD_ERROR = (payload) => ({
  type: types.GET_GIFT_CARD_ERROR,
  payload: payload,
});
// GENERATION BY ID
export const GET_GIFT_CARD_BY_ID = (payload) => ({
  type: types.GET_GIFT_CARD_BY_ID,
  payload: payload,
});
export const GET_GIFT_CARD_BY_ID_SUCCESS = (payload) => ({
  type: types.GET_GIFT_CARD_BY_ID_SUCCESS,
  payload: payload,
});
export const GET_GIFT_CARD_BY_ID_ERROR = (payload) => ({
  type: types.GET_GIFT_CARD_BY_ID_ERROR,
  payload: payload,
});
// GENERATION CODE LOG BY ID
export const GET_GIFT_CARD_CODE_LOG_BY_ID = (payload) => ({
  type: types.GET_GIFT_CARD_CODE_LOG_BY_ID,
  payload: payload,
});
export const GET_GIFT_CARD_CODE_LOG_BY_ID_SUCCESS = (payload) => ({
  type: types.GET_GIFT_CARD_CODE_LOG_BY_ID_SUCCESS,
  payload: payload,
});
export const GET_GIFT_CARD_CODE_LOG_BY_ID_ERROR = (payload) => ({
  type: types.GET_GIFT_CARD_CODE_LOG_BY_ID_ERROR,
  payload: payload,
});

// GENERATION NEW CODE
// export const GENERATION_CODE = payload => ({
//   type: types.GENERATION_CODE,
//   payload: payload
// });
// export const GENERATION_CODE_SUCCESS = payload => ({
//   type: types.GENERATION_CODE_SUCCESS,
//   payload: payload
// });
// export const GENERATION_CODE_SUCCESS = payload => ({
//   type: types.GENERATION_CODE_ERROR,
//   payload: payload
// });

// TEMPLATE
export const GET_TEMPLATE = (payload) => ({
  type: types.GET_TEMPLATE,
  payload: payload,
});

export const GET_TEMPLATE_SUCCESS = (payload) => ({
  type: types.GET_TEMPLATE_SUCCESS,
  payload: payload,
});

export const GET_TEMPLATE_ERROR = (payload) => ({
  type: types.GET_TEMPLATE_ERROR,
  payload: payload,
});

// VIEW DETAIL
export const VIEW_DETAIL = (payload) => ({
  type: types.VIEW_DETAIL,
  payload: payload,
});
