import { takeLatest, put } from "redux-saga/effects";
import {
  getAll_Transactions_api,
  getUser_Transaction_api,
  getUser_Activity_api,
  getAll_Batch_api,
  getAll_P2PTransactions_api,
  getBatchDetail_api
} from "../api/transactions";
import * as typeTransactions from "../../actions/transactions/types";

//! GET ALL TRANSACTIONS
export function* getAll_Transactions_Saga() {
  yield takeLatest(typeTransactions.getAll_Transactions, function*() {
    try {
      const TransactionsList = yield getAll_Transactions_api();
      if (TransactionsList !== null) {
        yield put({
          type: typeTransactions.getAll_Transactions_Success,
          payload: TransactionsList.data
        });
      } else {
        yield put({
          type: typeTransactions.getAll_Transactions_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! GET P2P TRANSACTIONS
export function* getP2P_Transactions_Saga() {
  yield takeLatest(typeTransactions.getP2P_Transactions, function*() {
    try {
      const P2PTransactionsList = yield getAll_P2PTransactions_api();
      if (P2PTransactionsList !== null) {
        yield put({
          type: typeTransactions.getP2P_Transactions_Success,
          payload: P2PTransactionsList.data
        });
      } else {
        yield put({
          type: typeTransactions.getP2P_Transactions_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! CONSUMER TRANSACTIONS
export function* getUser_Transaction_Saga() {
  yield takeLatest(typeTransactions.getUser_Transaction, function*(action) {
    try {
      const IDUser = action.payload;
      const userTransactions = yield getUser_Transaction_api(IDUser);
      if (userTransactions !== null) {
        yield put({
          type: typeTransactions.getUser_Transaction_Success,
          payload: userTransactions.data
        });
      } else {
        yield put({
          type: typeTransactions.getUser_Transaction_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! CONSUMER ACTIVITY
export function* getUser_Activity_Saga() {
  yield takeLatest(typeTransactions.getUser_Activity, function*(action) {
    try {
      const IDUser = action.payload;
      const userTransactions = yield getUser_Activity_api(IDUser);
      if (userTransactions !== null) {
        yield put({
          type: typeTransactions.getUser_Activity_Success,
          payload: userTransactions.data
        });
      } else {
        yield put({
          type: typeTransactions.getUser_Activity_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! GET BATCH SETTLEMENT
export function* getAll_Batch_Saga() {
  yield takeLatest(typeTransactions.getBatch, function*(action) {
    try {
      const getBatchData = yield getAll_Batch_api();
      if (getBatchData !== null) {
        // console.log("=====================", getBatchData);
        yield put({
          type: typeTransactions.getBatch_Success,
          payload: getBatchData.data
        });
      } else {
        yield put({
          type: typeTransactions.getBatch_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! GET BATCH DETAIL
export function* getBatchDetail_Saga() {
  yield takeLatest(typeTransactions.getBatchDetail, function*(action) {
    try {
      const BatchDetail = yield getBatchDetail_api(action);
      if (BatchDetail !== null) {
        yield put({
          type: typeTransactions.getBatchDetail_Success,
          payload: BatchDetail.data
        });
      } else {
        yield put({
          type: typeTransactions.getBatchDetail_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
