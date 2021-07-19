import React, { Component } from 'react';
import Popup from "reactjs-popup";
import ReactLoading from 'react-loading';
import "./style.scss";

export default class PopupConfirmRefund extends Component {
    render() {
        const { isPopup = false, actionNo, actionYes, loadingRefund } = this.props;

        return (
            <Popup
                open={isPopup}
                contentStyle={{ width: 600 }}
                closeOnDocumentClick={false}
            >
                <div style={{ position: 'relative' }} className="invoice_popup">
                    <div className="invoice_popup_title">
                        Refund Confirmation
                    </div>
                    <div className="invoice_popup_content">
                        Are you sure you want to refund this invoice?
                    </div>
                    <div className="invoice_popup_containerButton">
                        <div onClick={actionYes}>Yes</div>
                        <div onClick={actionNo}>No</div>
                    </div>

                    {
                        loadingRefund &&
                        <div className="loading_refund_invoice">
                            <ReactLoading
                                type={'spin'} d
                                height={'50px'}
                                width={'50px'}
                                color="#1366AE"
                            />
                        </div>
                    }
                </div>
            </Popup>
        )
    }
}
