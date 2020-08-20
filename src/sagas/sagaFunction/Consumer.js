import * as typeConsumer from "../../actions/consumer/types";
import * as typeNotification from "../../actions/notifications/types";

import { takeLatest, put } from "redux-saga/effects";
import { history } from "../../store/index";
import {
  GET_CONSUMER_BY_ID_API,
  UPDATE_CONSUMER_API,
  DELETE_CONSUMER_BY_ID_API,
  RESTORE_CONSUMER_BY_ID_API,
} from "../api/Consumer";

export function* GET_CONSUMER_BY_ID_SAGA() {
  yield takeLatest(typeConsumer.GET_CONSUMER_BY_ID, function*(action) {
    const ID = action.payload;
    try {
      const Consumer = yield GET_CONSUMER_BY_ID_API(ID);
      if (Consumer !== null) {
        yield put({
          type: typeConsumer.GET_CONSUMER_BY_ID_SUCCESS,
          payload: Consumer,
        });

        history.push("/app/consumers/profile/general");
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function* UPDATE_CONSUMER_SAGA() {
  yield takeLatest(typeConsumer.UPDATE_CONSUMER, function*(action) {
    const ID = action.payload;
    try {
      const Consumer = yield UPDATE_CONSUMER_API(ID);

      if (Consumer === "Success") {
        yield put({
          type: typeConsumer.UPDATE_CONSUMER_SUCCESS,
          payload: Consumer,
        });
        yield put({
          type: typeConsumer.GET_CONSUMER_BY_ID,
          payload: action.consumerId,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: Consumer,
        });

        history.push("/app/consumers/profile/general");
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function* DELETE_CONSUMER_BY_ID_SAGA() {
  yield takeLatest(typeConsumer.DELETE_CONSUMER_BY_ID, function*(action) {
    const ID = action.payload.ID;

    try {
      const Consumer = yield DELETE_CONSUMER_BY_ID_API(action.payload);
      if (Consumer === "Success") {
        yield put({
          type: typeConsumer.DELETE_CONSUMER_BY_ID_SUCCESS,
          payload: Consumer,
        });
        yield put({
          type: typeConsumer.GET_CONSUMER_BY_ID,
          payload: ID,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: Consumer,
        });
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function* RESTORE_CONSUMER_BY_ID_SAGA() {
  yield takeLatest(typeConsumer.RESTORE_CONSUMER_BY_ID, function*(action) {
    const ID = action.payload;
    try {
      const Consumer = yield RESTORE_CONSUMER_BY_ID_API(ID);
      if (Consumer === "Success") {
        yield put({
          type: typeConsumer.RESTORE_CONSUMER_BY_ID_SUCCESS,
          payload: Consumer,
        });
        yield put({
          type: typeConsumer.GET_CONSUMER_BY_ID,
          payload: action.payload,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: Consumer,
        });
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
