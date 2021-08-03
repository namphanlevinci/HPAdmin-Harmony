import React, { Component } from 'react';
import "./style.scss";

export default class Index extends Component {
    render() {
        const { closeDetail, code, isShowRefund = false , showPopupConfirm } = this.props;

        return (
            <div
                style={{ borderBottom: '1px solid #eeeeee', paddingBottom: '0.7rem' }}
                className="invoice-row-title">
                <div
                    className="invoice-row">
                    <p className="invoice_code">
                        Invoice #{code}
                    </p>
                    <p
                        onClick={closeDetail}
                        className="invoice_back"
                        style={{ }}>
                        Back to list
                    </p>
                </div>

                {
                    isShowRefund &&
                    <div onClick={showPopupConfirm} className="invoice-button-refund">
                        Refund
                    </div>
                }
            </div>
        )
    }
}
