import { takeLatest, put } from "redux-saga/effects";
import {
  GET_ALL_QUESTION_API,
  GET_ALL_USER_API,
  UPDATE_QUESTION_API,
} from "../api/questions";
import * as typeQuestions from "../../actions/business/types";

export function* GET_ALL_QUESTION_SAGA() {
  yield takeLatest(typeQuestions.getAll_Questions, function*() {
    try {
      const QuestionList = yield GET_ALL_QUESTION_API();
      // console.log(NotiList)
      if (QuestionList !== null) {
        yield put({
          type: typeQuestions.getAll_Questions_Success,
          payload: QuestionList,
        });
      } else {
        yield put({
          type: typeQuestions.getAll_Questions_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
// UPDATE QUESTIONS
export function* UPDATE_QUESTION_SAGA() {
  yield takeLatest(typeQuestions.UPDATE_QUESTIONS, function*(payload) {
    try {
      const UpdateQuestion = yield UPDATE_QUESTION_API(payload.payload);
      if (UpdateQuestion !== null) {
        yield put({
          type: typeQuestions.UPDATE_QUESTIONS_SUCCESS,
          payload: UpdateQuestion,
        });
      } else {
        yield put({
          type: typeQuestions.UPDATE_QUESTIONS_ERROR,
          payload: "ITS DIDN'T WORK",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
export function* GET_ALL_USER_SAGA() {
  yield takeLatest(typeQuestions.getAll_ConsumerUsers, function*() {
    try {
      const ConsumerList = yield GET_ALL_USER_API();
      if (ConsumerList !== null) {
        yield put({
          type: typeQuestions.getAll_ConsumerUsers_Success,
          payload: ConsumerList.data,
        });
      } else {
        yield put({
          type: typeQuestions.getAll_ConsumerUsers_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
