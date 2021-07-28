import React, { Component } from 'react';
import Popup from "reactjs-popup";
import "./style.scss";

export default class PopupSuccess extends Component {
    render() {
        const { isPopup = false, actionOK } = this.props;

        return (
            <Popup
                open={isPopup}
                contentStyle={{ width: 600, borderRadius: 8 }}
                closeOnDocumentClick={false}
            >
                <div style={{ position: 'relative' }} className="close_settlement_popup">
                    <div className="title">
                        Success !
                    </div>
                    <div className="content">
                        Close Settlement Successfull
                    </div>
                    <div className="containerButton">
                        <div
                            style={{ color: '#1366AE', fontWeight: '400', cursor: 'pointer', width: 80, textAlign: 'right', fontSize: '1.1rem' }}
                            onClick={actionOK}>
                            OK
                        </div>
                    </div>

                </div>
            </Popup>
        )
    }
}
