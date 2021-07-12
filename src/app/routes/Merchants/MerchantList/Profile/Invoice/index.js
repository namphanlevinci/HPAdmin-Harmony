import React from "react";
import { connect } from "react-redux";
import { fetchApiByPage } from "@/actions/fetchApiActions";
import { getListInvoice, getInvoiceDetail, refundInvoice } from "@/actions/invoiceActions";

import { Helmet } from "react-helmet";
import {
    Grid,
} from "@material-ui/core";

import ReactTable from "react-table";
import SearchComponent from "@/util/searchComponent";
import NewButton from "@/components/Button/Search";
import ResetButton from "@/components/Button/Reset";
import Pagination from "@/components/Pagination";
import InvoiceDetail from "../InvoiceDetail";
import columns from "./column";
import { Status, PaymentMethod, TimeRange } from "./components";
import Loading from "./Loading";
import moment from "moment";

import "react-table/react-table.css";

const initialState = {

    isShowDetail: false,

    from: moment().startOf("month").format("YYYY-MM-DD"),
    to: moment().endOf("month").format("YYYY-MM-DD"),
    range: "thisMonth",
    search: "",
    status: "all",
    paymentMethod: "all",

    row: 5,
    page: 1,
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.refTable = React.createRef();
        this.pagination = React.createRef();
        this.timeRange = React.createRef();
        this.refInvoiceDetail = React.createRef();
    }

    handleResetClick = async () => {
        await this.setState(initialState);
        await this.pagination.current.changePage(1);
        await this.timeRange.current.reset();
        this.getData();
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.fetchApi();
        }
    };

    getData = () => {
        let { from, to, range, status, search, paymentMethod, page, row } = this.state;
        if (range === "all") range = "";
        if (range !== "all") {
            from = "";
            to = "";
        }
        if (status === "all") status = "";
        if (paymentMethod === "all") paymentMethod = "";
        this.fetchApi(from, to, range, status, search, paymentMethod, page, row);
    }

    componentDidMount() {
        this.getData();
    }

    searchAction = async () => {
        await this.pagination.current.changePage(1);
        let { from, to, range, status, search, paymentMethod, page, row } = this.state;
        if (range === "all") range = "";
        if (range !== "all") {
            from = "";
            to = "";
        }
        if (status === "all") status = "";
        if (paymentMethod === "all") paymentMethod = "";
        await this.setState({ page: 1 });
        await this.fetchApi(from, to, range, status, search, paymentMethod, 1, row, search);
    }

    changeTimeRange = (from, to, range) => {
        this.setState({ from, to, range });
    }

    handleDateChange = async (name, value) => {
        await this.setState({
            [name]: value
        });
    }

    fetchApi = async (from, to, range, status, search, paymentMethod, page, row) => {
        const { MerchantProfile: { merchantId } } = this.props;
        const url = `checkout?page=${page}&row=${row}&merchantId=${merchantId}&method=${paymentMethod}&status=${status}&timeStart=${from}&timeEnd=${to}&key=${search}&quickFilter=${range}`;
        this.props.getListInvoice(url);
    };

    changePage = (pageIndex) => {
        this.setState({
            page: pageIndex,
        });
    };

    onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: (e) => {
                const { MerchantProfile: { merchantId } } = this.props;
                const checkoutId = rowInfo?.original?.checkoutId;
                const url = `checkout/${checkoutId}?merchantId=${merchantId}`
                checkoutId && this.props.getInvoiceDetail({ url, callBack: this.openDetail });
            },
        };
    };

    openDetail = () => {
        this.setState({ isShowDetail: true });
    }

    closeDetail = () => {
        this.getData();
        this.setState({ isShowDetail: false });
    }

    onChangePagination = async () => {
        const pagination = this.pagination.current;
        const { page, rowSelected } = pagination.state;
        await this.setState({ page, row: rowSelected });

        let { from, to, range, status, search, paymentMethod } = this.state;
        if (range === "all") range = "";
        if (range !== "all") {
            from = "";
            to = "";
        }
        if (status === "all") status = "";
        if (paymentMethod === "all") paymentMethod = "";
        this.fetchApi(from, to, range, status, search, paymentMethod, page, rowSelected);
    }

    refundInvoice = (checkoutId, invoiceDetail) => {
        this.props.refundInvoice({
            checkoutId,
            invoiceDetail,
            callBack: this.refundComplete
        });
    }

    refundComplete = () => {
        this.refInvoiceDetail.current.closePopupConfirm();
    }

    componentDidUpdate() {
        const { isShowDetail, row, page } = this.state;
        if (isShowDetail === false) {
            this.pagination.current.changePage(page);
            this.pagination.current.changeRow(row);
        }
    }

    render() {
        const { isShowDetail } = this.state;
        const { invoiceList = [], invoiceDetail, pages, loading, loadingDetail, loadingRefund } = this.props;

        if (isShowDetail) {
            return (
                <InvoiceDetail
                    ref={this.refInvoiceDetail}
                    closeDetail={this.closeDetail}
                    invoiceDetail={invoiceDetail}
                    refundInvoice={this.refundInvoice}
                    loadingRefund={loadingRefund}
                />
            );
        }

        return (
            <div style={{ position: 'relative' }} className="container-fluid react-transition swipe-right">
                <Helmet>
                    <title>Invoice | Harmony Admin</title>
                </Helmet>

                {
                    loadingDetail && <Loading />
                }


                <div>
                    <div className="TransactionsBox">
                        <Grid
                            container
                            spacing={0}
                            className="BatchSearch"
                            style={{ marginBottom: 15 }}
                        >
                            <div className="container-search-component">
                                <SearchComponent
                                    placeholder="Search"
                                    value={this.state.search}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handEnter}
                                    onClickIcon={() => this.setState({ search: "" })}
                                    name="search"
                                />
                                <NewButton
                                    style={{ marginLeft: "10px" }}
                                    onClick={this.searchAction}
                                >
                                    Search
                                </NewButton>
                            </div>
                        </Grid>
                    </div>
                    <Grid
                        container
                        spacing={3}
                        className="TransactionSearch"
                        style={{ marginTop: 5 }}
                    >
                        <TimeRange
                            ref={this.timeRange}
                            timeRange={this.changeTimeRange}
                            handleDateChange={this.handleDateChange}
                        />

                        <Status
                            status={this.state.status}
                            onChange={e => this.setState({ status: e.target.value })}
                        />

                        <PaymentMethod
                            paymentMethod={this.state.paymentMethod}
                            onChange={e => this.setState({ paymentMethod: e.target.value })}
                        />
                    </Grid>

                    <ResetButton
                        onClick={this.handleResetClick}
                        style={{ marginTop: "10px" }}
                    >
                        Reset filter
                    </ResetButton>

                    <div className="merchant-list-container category__container">
                        <ReactTable
                            ref={this.refTable}
                            data={invoiceList}
                            columns={columns}
                            minRows={1}
                            noDataText="NO DATA!"
                            loading={loading}
                            getTdProps={this.onRowClick}
                            PaginationComponent={() => <div />}
                            NoDataComponent={() => <div className="invoice_table_noData">No data</div>}
                        />
                        <Pagination
                            ref={this.pagination}
                            fetchApi={this.onChangePagination}
                            pageCount={pages}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    apiData: state.fetchApi,
    invoiceList: state.invoiceReducer.invoiceList,
    countInvoiceList: state.invoiceReducer.countInvoiceList,
    invoiceDetail: state.invoiceReducer.invoiceDetail,
    pages: state.invoiceReducer.pages,
    loading: state.invoiceReducer.loading,
    loadingRefund: state.invoiceReducer.loadingRefund,
    loadingDetail: state.invoiceReducer.loadingDetail,
    MerchantProfile: state.merchant.merchant,
});
const mapDispatchToProps = (dispatch) => ({
    fetchApiByPage: (url) => { dispatch(fetchApiByPage(url)) },
    getListInvoice: (url) => { dispatch(getListInvoice(url)); },
    getInvoiceDetail: (url) => { dispatch(getInvoiceDetail(url)); },
    refundInvoice: (payload) => { dispatch(refundInvoice(payload)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
