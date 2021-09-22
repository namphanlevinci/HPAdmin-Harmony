import {
    FETCH_API_FAILURE,
} from "../constants/fetchApiConstants";

import {
    LOADING_INVOICE,
    STOP_LOADING_INVOICE,
    LOADING_INVOICE_DETAIL,
    STOP_LOADING_INVOICE_DETAIL,
    SET_INVOICE_LIST,
    SET_INVOICE_DETAIL,
    LOADING_REFUND_INVOICE,
    STOP_LOADING_REFUND_INVOICE,
} from "../constants/invoiceConstant";

import { FAILURE_NOTIFICATION } from "../constants/notificationConstants";
import { config } from "../url/url";

import axios from "axios";

const URL = config.url.URL;

export const getListInvoice = (url) => async (dispatch, getState) => {
    try {
        dispatch({ type: LOADING_INVOICE });

        const { verifyUser: { user } } = await getState();
        const { data } = await axios.get(`${URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });

        if (parseInt(data.codeNumber) === 200) {
            dispatch({
                type: SET_INVOICE_LIST,
                payload: {
                    invoiceList: data?.data || [],
                    count: data?.count || 0,
                    pages: data?.pages || 0,
                }
            });
        }
    } catch (error) {
        dispatch({
            type: FAILURE_NOTIFICATION,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });

        dispatch({
            type: FETCH_API_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    } finally {
        dispatch({ type: STOP_LOADING_INVOICE });
    }
};


export const getInvoiceDetail = ({ url, callBack, isCallFromRefundInvoice = false }) => async (dispatch, getState) => {
    try {
        dispatch({ type: LOADING_INVOICE_DETAIL });

        const { verifyUser: { user } } = await getState();
        const { data } = await axios.get(`${URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });

        if (parseInt(data.codeNumber) === 200) {
            dispatch({
                type: SET_INVOICE_DETAIL,
                payload: data?.data || {},
            });
            if (callBack) callBack();
            if (isCallFromRefundInvoice === true) {
                dispatch({ type: STOP_LOADING_REFUND_INVOICE });
            }
        }
    } catch (error) {
        dispatch({
            type: FAILURE_NOTIFICATION,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });

        dispatch({
            type: FETCH_API_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    } finally {
        dispatch({ type: STOP_LOADING_INVOICE_DETAIL });
    }
};

export const refundInvoice = ({ checkoutId, invoiceDetail, callBack }) => async (dispatch, getState) => {
    try {
        dispatch({ type: LOADING_REFUND_INVOICE });

        const { merchant: { merchant } } = await getState();
        const { verifyUser: { user } } = await getState();
        const { merchantId } = merchant;
        const { paymentInformation, paymentMethod } = invoiceDetail;
        const body = {
            responseData: paymentMethod !== "credit_card" ? null : paymentInformation[0].responseData,
            paymentTerminal: paymentInformation[0]?.paymentTerminal,
        }

        const { data } = await axios.put(`${URL}/checkout/paymentvoidrefundtransaction/${checkoutId}`, body, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });

        if (parseInt(data.codeNumber) === 200) {
            dispatch(
                getInvoiceDetail({
                    url: `checkout/${checkoutId}?merchantId=${merchantId}`,
                    callBack: callBack,
                    isCallFromRefundInvoice: true,
                })
            );
        }
    } catch (error) {
        dispatch({
            type: FAILURE_NOTIFICATION,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });

        dispatch({
            type: FETCH_API_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    } finally {
    }
};