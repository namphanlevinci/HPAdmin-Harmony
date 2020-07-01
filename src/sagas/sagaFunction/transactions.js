import { takeLatest, put } from "redux-saga/effects";
import {
  GET_ALL_TRANSACTION_API,
  GET_USER_TRANSACTION_API,
  GET_USER_ACTIVITY_API,
  GET_ALL_BATCH_API,
  GET_P2P_TRANSACTION_API,
  GET_BATCH_DETAIL_API,
} from "../api/transactions";
import * as typeTransactions from "../../actions/transactions/types";

// GET ALL TRANSACTIONS
export function* GET_ALL_TRANSACTION_SAGA() {
  yield takeLatest(typeTransactions.getAll_Transactions, function*() {
    try {
      const TransactionsList = yield GET_ALL_TRANSACTION_API();
      if (TransactionsList !== null) {
        yield put({
          type: typeTransactions.getAll_Transactions_Success,
          payload: TransactionsList.data,
        });
      } else {
        yield put({
          type: typeTransactions.getAll_Transactions_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// GET P2P TRANSACTIONS
export function* GET_P2P_TRANSACTION_SAGA() {
  yield takeLatest(typeTransactions.getP2P_Transactions, function*() {
    try {
      const P2PTransactionsList = yield GET_P2P_TRANSACTION_API();
      if (P2PTransactionsList !== null) {
        yield put({
          type: typeTransactions.getP2P_Transactions_Success,
          payload: P2PTransactionsList.data,
        });
      } else {
        yield put({
          type: typeTransactions.getP2P_Transactions_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// CONSUMER TRANSACTIONS
export function* GET_USER_TRANSACTION_SAGA() {
  yield takeLatest(typeTransactions.getUser_Transaction, function*(action) {
    try {
      const IDUser = action.payload;
      const userTransactions = yield GET_USER_TRANSACTION_API(IDUser);
      if (userTransactions !== null) {
        yield put({
          type: typeTransactions.getUser_Transaction_Success,
          payload: userTransactions.data,
        });
      } else {
        yield put({
          type: typeTransactions.getUser_Transaction_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// CONSUMER ACTIVITY
export function* GET_USER_ACTIVITY_SAGA() {
  yield takeLatest(typeTransactions.getUser_Activity, function*(action) {
    try {
      const IDUser = action.payload;
      const userTransactions = yield GET_USER_ACTIVITY_API(IDUser);
      if (userTransactions !== null) {
        yield put({
          type: typeTransactions.getUser_Activity_Success,
          payload: userTransactions.data,
        });
      } else {
        yield put({
          type: typeTransactions.getUser_Activity_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// GET BATCH SETTLEMENT
export function* GET_ALL_BATCH_SAGA() {
  yield takeLatest(typeTransactions.getBatch, function*(action) {
    try {
      const getBatchData = yield GET_ALL_BATCH_API();
      if (getBatchData !== null) {
        // console.log("=====================", getBatchData);
        yield put({
          type: typeTransactions.getBatch_Success,
          payload: getBatchData.data,
        });
      } else {
        yield put({
          type: typeTransactions.getBatch_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// GET BATCH DETAIL
export function* GET_BATCH_DETAIL_SAGA() {
  yield takeLatest(typeTransactions.getBatchDetail, function*(action) {
    try {
      const BatchDetail = yield GET_BATCH_DETAIL_API(action);
      if (BatchDetail !== null) {
        yield put({
          type: typeTransactions.getBatchDetail_Success,
          payload: BatchDetail.data,
        });
      } else {
        yield put({
          type: typeTransactions.getBatchDetail_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
