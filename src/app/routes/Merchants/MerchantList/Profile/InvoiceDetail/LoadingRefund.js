import React, { Component } from 'react';
import Popup from "reactjs-popup";
import "./style.scss";

export default class PopupConfirmRefund extends Component {
    render() {
        const { isPopup = false, actionNo, actionYes } = this.props;
        return (
            <Popup
                open={isPopup}
                contentStyle={{ width: 600 }}
                closeOnDocumentClick={false}
            >
                <div className="invoice_popup">
                    <div className="invoice_popup_title">
                        Refund confirmation
                    </div>
                    <div className="invoice_popup_content">
                        Are you sure want to refund this invoice?
                    </div>
                    <div className="invoice_popup_containerButton">
                        <div onClick={actionYes}>Yes</div>
                        <div onClick={actionNo}>No</div>
                    </div>
                </div>
            </Popup>
        )
    }
}
