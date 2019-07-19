import { takeLatest, put } from 'redux-saga/effects';
import { getAll_Transactions_api } from '../api/transactions'
import * as typeTransactions from "../../actions/transactions/types"

export function* getAll_Transactions_Saga() {
    yield takeLatest(typeTransactions.getAll_Transactions, function* () {
        try {
            const TransactionsList = yield getAll_Transactions_api();
            if (TransactionsList !== null) {
                yield put({ type: typeTransactions.getAll_Transactions_Success, payload: TransactionsList.data});
            } else {
                yield put({ type: typeTransactions.getAll_Transactions_Error, payload: 'Something went wrong, please try again later!'})
            }
        } catch (error) {
            console.log(error)
        }
    })
}