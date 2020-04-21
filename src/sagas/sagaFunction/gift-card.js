import { takeLatest, put } from "redux-saga/effects";
import {
  GET_GIFTCARD_API,
  GET_TEMPLATE_API,
  GET_GIFTCARD_BY_ID_API,
  GET_GIFTCARD_CODE_LOG_BY_ID_API
} from "../api/gift-card";
import * as typeGiftCard from "../../actions/gift-card/types";

// GENERATION
export function* GET_GIFTCARD_SAGA() {
  yield takeLatest(typeGiftCard.GET_GIFTCARD, function*() {
    try {
      const giftCard_Data = yield GET_GIFTCARD_API();
      if (giftCard_Data !== null) {
        yield put({
          type: typeGiftCard.GET_GIFTCARD_SUCCESS,
          payload: giftCard_Data
        });
      } else {
        yield put({
          type: typeGiftCard.GET_GIFTCARD_ERROR,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function* GET_GIFTCARD_BY_ID_SAGA() {
  yield takeLatest(typeGiftCard.GET_GIFTCARD_BY_ID, function*({ payload }) {
    try {
      const GiftCardbyID = yield GET_GIFTCARD_BY_ID_API(payload);
      if (GiftCardbyID) {
        yield put({
          type: typeGiftCard.GET_GIFTCARD_BY_ID_SUCCESS,
          payload: GiftCardbyID
        });
      }
    } catch (error) {
      yield put({
        type: typeGiftCard.GET_GIFTCARD_BY_ID_ERROR,
        payload: "Something went wrong, please try again later!"
      });
    }
  });
}

// GET LOG BY ID
export function* GET_GIFTCARD_CODE_LOG_BY_ID_SAGA() {
  yield takeLatest(typeGiftCard.GET_GIFTCARD_CODE_LOG_BY_ID, function*({
    payload
  }) {
    try {
      const LogByID = yield GET_GIFTCARD_CODE_LOG_BY_ID_API(payload);
      if (LogByID) {
        yield put({
          type: typeGiftCard.GET_GIFTCARD_CODE_LOG_BY_ID_SUCCESS,
          payload: LogByID
        });
      }
    } catch (error) {
      yield put({
        type: typeGiftCard.GET_GIFTCARD_CODE_LOG_BY_ID_ERROR,
        payload: "Something went wrong, please try agian later!"
      });
    }
  });
}

// TEMPLATE
export function* GET_TEMPLATE_SAGA() {
  yield takeLatest(typeGiftCard.GET_TEMPLATE, function*() {
    try {
      const Template_Data = yield GET_TEMPLATE_API();
      if (Template_Data !== null) {
        yield put({
          type: typeGiftCard.GET_TEMPLATE_SUCCESS,
          payload: Template_Data
        });
      } else {
        yield put({
          type: typeGiftCard.GET_TEMPLATE_ERROR,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}