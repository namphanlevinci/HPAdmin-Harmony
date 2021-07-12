import {
    SET_INVOICE_LIST,
    SET_INVOICE_DETAIL,
    LOADING_INVOICE,
    STOP_LOADING_INVOICE,
    LOADING_INVOICE_DETAIL,
    STOP_LOADING_INVOICE_DETAIL,
    LOADING_REFUND_INVOICE,
    STOP_LOADING_REFUND_INVOICE,
} from "../constants/invoiceConstant";

const initialState = {
    loading: false,
    loadingDetail: false,
    loadingRefund: false,
    invoiceList: [],
    countInvoiceList: 0,
    invoiceDetail: {},
    pages: 0,
};

const invoiceReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOADING_INVOICE:
            return {
                ...state,
                loading: true
            };

        case STOP_LOADING_INVOICE:
            return {
                ...state,
                loading: false
            };

        case LOADING_INVOICE_DETAIL:
            return {
                ...state,
                loadingDetail: true
            };

        case STOP_LOADING_INVOICE_DETAIL:
            return {
                ...state,
                loadingDetail: false
            };

        case LOADING_REFUND_INVOICE:
            return {
                ...state,
                loadingRefund: true
            };

        case STOP_LOADING_REFUND_INVOICE:
            return {
                ...state,
                loadingRefund: false
            };

        case SET_INVOICE_LIST:
            return {
                ...state,
                invoiceList: payload.invoiceList,
                countInvoiceList: payload.count,
                pages: payload.pages,
            };

        case SET_INVOICE_DETAIL:
            return {
                ...state,
                invoiceDetail: payload
            };

        default:
            return state;
    }
};

export { invoiceReducer };