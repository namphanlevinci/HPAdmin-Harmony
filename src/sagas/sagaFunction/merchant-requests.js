import { takeLatest, put } from 'redux-saga/effects';
import { getAll_Merchant_Requests_api } from '../api/merchant-requests'
import * as typeMerchantRequests from "../../actions/merchants/types"

export function* getAll_Merchant_Request_Saga() {
    yield takeLatest(typeMerchantRequests.getAll_Merchant_Requests, function* () {
        try {
            const MerchantRequests = yield getAll_Merchant_Requests_api();
            if (MerchantRequests !== null) {
                yield put({ type: typeMerchantRequests.getAll_Merchant_Requests_Success, payload: MerchantRequests});
            } else {
                yield put({ type: typeMerchantRequests.getAll_Merchant_Requests_Error, payload: 'Something went wrong, please try again later!'})
            }
        } catch (error) {
            console.log(error)
        }
    })
}