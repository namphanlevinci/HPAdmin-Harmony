import { fork } from "redux-saga/effects";
import {
  USER_LOGIN_SAGA,
  GET_ALL_USER_SAGA,
  USER_VERIFY_SAGA,
  ADD_USER_SAGA,
  GET_USER_BY_ID_SAGA,
  GET_PERMISSION_BY_ROLE_ID_SAGA,
  GET_ALL_PERMISSION_SAGA,
  UPDATE_PERMISSION_SAGA,
} from "../sagas/sagaFunction/user";
import {
  GET_ALL_MERCHANT_SAGA,
  UPDATE_MERCHANT_SAGA,
  GET_MERCHANT_BY_ID_SAGA,
  GET_ALL_REJECTED_MERCHANT_SAGA,
  GET_ALL_MERCHANT_REQUEST_SAGA,
  MERCHANT_APPROVAL_SAGA,
  MERCHANT_REJECT_SAGA,
  DELETE_MERCHANT_SAGA,
} from "../sagas/sagaFunction/merchants";

import { GET_ALL_NOTIFICATION_SAGA } from "../sagas/sagaFunction/notifications";
import { GET_ALL_LOG_SAGA } from "../sagas/sagaFunction/logs";
import {
  GET_ALL_QUESTION_SAGA,
  UPDATE_QUESTION_SAGA,
  // GET_ALL_USER_SAGA,
} from "./sagaFunction/questions";
import {
  GET_ALL_TRANSACTION_SAGA,
  GET_USER_TRANSACTION_SAGA,
  GET_USER_ACTIVITY_SAGA,
  GET_ALL_BATCH_SAGA,
  GET_P2P_TRANSACTION_SAGA,
  GET_BATCH_DETAIL_SAGA,
} from "./sagaFunction/transactions";

import { GET_APPROVED_SAGA } from "./sagaFunction/reports";

import {
  GET_GIFT_CARD_SAGA,
  GET_TEMPLATE_SAGA,
  GET_GIFT_CARD_BY_ID_SAGA,
  GET_GIFT_CARD_CODE_LOG_BY_ID_SAGA,
} from "./sagaFunction/gift-card";

export default function* rootSaga() {
  yield fork(USER_LOGIN_SAGA);
  yield fork(GET_ALL_MERCHANT_SAGA);
  yield fork(GET_ALL_MERCHANT_REQUEST_SAGA);
  yield fork(GET_ALL_USER_SAGA);
  yield fork(GET_ALL_NOTIFICATION_SAGA);
  yield fork(GET_ALL_LOG_SAGA);
  yield fork(GET_ALL_REJECTED_MERCHANT_SAGA);
  yield fork(GET_ALL_QUESTION_SAGA);
  yield fork(GET_ALL_TRANSACTION_SAGA);
  // yield fork(GET_ALL_USER_SAGA);
  yield fork(GET_USER_TRANSACTION_SAGA);
  yield fork(GET_USER_ACTIVITY_SAGA);
  yield fork(UPDATE_MERCHANT_SAGA);
  yield fork(GET_MERCHANT_BY_ID_SAGA);
  yield fork(MERCHANT_APPROVAL_SAGA);
  yield fork(MERCHANT_REJECT_SAGA);
  yield fork(USER_VERIFY_SAGA);
  yield fork(UPDATE_QUESTION_SAGA);
  yield fork(GET_APPROVED_SAGA);
  yield fork(ADD_USER_SAGA);
  yield fork(GET_USER_BY_ID_SAGA);
  yield fork(GET_ALL_BATCH_SAGA);
  yield fork(GET_P2P_TRANSACTION_SAGA);
  yield fork(GET_BATCH_DETAIL_SAGA);
  yield fork(GET_GIFT_CARD_SAGA);
  yield fork(GET_TEMPLATE_SAGA);
  yield fork(GET_GIFT_CARD_BY_ID_SAGA);
  yield fork(GET_GIFT_CARD_CODE_LOG_BY_ID_SAGA);
  yield fork(GET_PERMISSION_BY_ROLE_ID_SAGA);
  yield fork(GET_ALL_PERMISSION_SAGA);
  yield fork(UPDATE_PERMISSION_SAGA);
  yield fork(DELETE_MERCHANT_SAGA);
}
