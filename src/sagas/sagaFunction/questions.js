import { takeLatest, put } from "redux-saga/effects";
import {
  getAll_Questions_api,
  getAll_ConsumerUsers_api,
  update_Questions_api
} from "../api/questions";
import * as typeQuestions from "../../actions/business/types";

export function* getAll_Questions_Saga() {
  yield takeLatest(typeQuestions.getAll_Questions, function*() {
    try {
      const QuestionList = yield getAll_Questions_api();
      // console.log(NotiList)
      if (QuestionList !== null) {
        yield put({
          type: typeQuestions.getAll_Questions_Success,
          payload: QuestionList
        });
      } else {
        yield put({
          type: typeQuestions.getAll_Questions_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
//! UPDATE QUESTIONS
export function* update_Questions_Saga() {
  yield takeLatest(typeQuestions.UPDATE_QUESTIONS, function*(payload) {
    try {
      const UpdateQuestion = yield update_Questions_api(payload.payload);
      if (UpdateQuestion !== null) {
        yield put({
          type: typeQuestions.UPDATE_QUESTIONS_SUCCESS,
          payload: UpdateQuestion
        });
      } else {
        yield put({
          type: typeQuestions.UPDATE_QUESTIONS_ERROR,
          payload: "ITS DIDNT WORK"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
export function* getAll_ConsumerUsers_Saga() {
  yield takeLatest(typeQuestions.getAll_ConsumerUsers, function*() {
    try {
      const ConsumerList = yield getAll_ConsumerUsers_api();
      if (ConsumerList !== null) {
        yield put({
          type: typeQuestions.getAll_ConsumerUsers_Success,
          payload: ConsumerList.data
        });
      } else {
        yield put({
          type: typeQuestions.getAll_ConsumerUsers_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
