import React, { Component } from 'react';
import Title from "./Title";
import Detail from "./Detail";
import Basket from "./Basket";
import History from "./History";
import PopupConfirmRefund from "./PopupConfirmRefund";
import "./style.scss";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPopupConfirm: false,
        }
    }

    onPressYes = () => {
        const { invoiceDetail } = this.props;
        const { checkoutId } = invoiceDetail;
        if (checkoutId) {
            this.props.refundInvoice(checkoutId, invoiceDetail);
        }
    }

    onPressNo = () => {
        this.closePopupConfirm();
    }

    closePopupConfirm = () => {
        this.setState({ isPopupConfirm: false })
    }

    showPopupConfirm = () => {
        this.setState({ isPopupConfirm: true });
    }

    render() {
        const { invoiceDetail, closeDetail, loadingRefund } = this.props;
        const code = invoiceDetail?.code || '';
        const createdDate = invoiceDetail?.createdDate || '';
        const firstName = invoiceDetail?.user?.firstName || '';
        const lastName = invoiceDetail?.user?.lastName || '';
        const phone = invoiceDetail?.user?.phone || '';
        const paymentMethod = invoiceDetail?.paymentMethod || '';
        const status = invoiceDetail?.status || '';
        const total = invoiceDetail?.total || '';
        const createdBy = invoiceDetail?.createdBy || '';
        const modifiedBy = invoiceDetail?.modifiedBy || '';
        const services = invoiceDetail?.basket?.services || [];
        const products = invoiceDetail?.basket?.products || [];
        const extras = invoiceDetail?.basket?.extras || [];
        const giftCards = invoiceDetail?.basket?.giftCards || [];
        const history = invoiceDetail?.history || [];
        const checkoutPayments = invoiceDetail?.checkoutPayments || [];

        const subTotal = invoiceDetail?.subTotal || '';
        const tipAmount = invoiceDetail?.tipAmount || '';
        const discount = invoiceDetail?.discount || '';
        const tax = invoiceDetail?.tax || '';

        return (
            <>
                <Title
                    closeDetail={closeDetail}
                    code={code}
                    isShowRefund={status === 'paid' && checkoutPayments.length === 1}
                    showPopupConfirm={this.showPopupConfirm}
                />
                <div className="invoice-row-title block-basket" style={{ alignItems: 'flex-start' }}>
                    <Detail
                        code={code}
                        createdDate={createdDate}
                        firstName={firstName}
                        lastName={lastName}
                        phone={phone}
                        paymentMethod={paymentMethod}
                        status={status}
                        total={total}
                        createdBy={createdBy}
                        modifiedBy={modifiedBy}
                    />
                    <Basket
                        services={services}
                        products={products}
                        extras={extras}
                        giftCards={giftCards}
                        subTotal={subTotal}
                        tipAmount={tipAmount}
                        discount={discount}
                        tax={tax}
                        total={total}
                    />
                </div>
                <History history={history} />
                <PopupConfirmRefund
                    isPopup={this.state.isPopupConfirm}
                    actionNo={this.onPressNo}
                    actionYes={this.onPressYes}
                    loadingRefund={loadingRefund}
                />
            </>
        )
    }
}
