import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { isEmpty } from "lodash";
import "./style.scss";

export default class PopupBookingLink extends Component {

    openLink = () => {
        const { link } = this.props;
        if (link)
            window.location.href = link;
    }

    copyToClipboard = (e) => {
        this.linkBooking.select();
        document.execCommand('copy');
        e.target.focus();
    };
    render() {
        const { link, close } = this.props;

        return (
            <Popup
                open={!isEmpty(link)}
                contentStyle={{ width: 600, borderRadius: 8 }}
                closeOnDocumentClick={false}
            >
                <div style={{ position: 'relative' }} className="booking_link">
                    <div className="title">
                        Online Booking Link
                    </div>
                    <div
                        onClick={this.openLink}
                        style={{ width: 550, wordWrap: 'break-word', cursor: 'pointer' }} className="content">
                        {link}
                    </div>
                    <input
                        style={{ opacity: 0 }}
                        value={link}
                        ref={(textarea) => this.linkBooking = textarea}
                    />
                    <div className="containerButton">
                        <div
                            style={{ color: 'red', fontWeight: '400', cursor: 'pointer', width: 80, textAlign: 'right', fontSize: '1rem' }}
                            onClick={close}>
                            CLOSE
                        </div>
                        <div
                            style={{ color: '#1366AE', fontWeight: '400', cursor: 'pointer', width: 80, textAlign: 'right', fontSize: '1rem' }}
                            onClick={this.copyToClipboard}>
                            COPY
                        </div>
                    </div>

                </div>
            </Popup>
        )
    }
}
