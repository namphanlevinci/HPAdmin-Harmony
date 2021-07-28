import React, { Component } from 'react';
import {
    Typography,
    Grid,
} from "@material-ui/core";
import NewButton from "@components/Button/Search";
import visaLogo from "@/assets/images/card/visaLogo.png";
import masterCardLogo from "@/assets/images/card/masterCardLogo.png";
import discoverLogo from "@/assets/images/card/discoverLogo.png";
import other_card from "@/assets/images/card/other_card.png";
import american_express from "@/assets/images/card/american_express.png";

import "./style.scss";

export default class SettlementWaiting extends Component {

    getCredicardIcon = (type) => {
        let icon = "";
        if (`${type}`.indexOf("visa") !== -1) {
            icon = visaLogo;
        } else if (`${type}`.indexOf("mastercard") !== -1) {
            icon = masterCardLogo;
        } else if (`${type}`.indexOf("discover") !== -1) {
            icon = discoverLogo;
        } else if (`${type}`.indexOf("americanexpress") !== -1) {
            icon = american_express;
        } else if (`${type}`.indexOf("other") !== -1) {
            icon = other_card;
        } else {
            icon = other_card;
        }

        return icon;
    };


    render() {
        const { settlementWaitng } = this.props;

        return (
            <div className="container-settlement-waiting" style={{ position: 'relative' }}>
                <Typography style={{ color: '#1366AE', marginTop: 45 }} variant="h6" gutterBottom>
                    Submit
                </Typography>
                <Grid
                    container
                    spacing={3}
                    className="TransactionSearch"
                    style={{ marginTop: 5 }}
                >
                    <Grid item xs={12} lg={6} style={{ height: 500 }}>
                        <Typography style={{ fontSize: '1rem', marginBottom: 16, marginTop: 8 }} variant="h6" gutterBottom>
                            Actual Amount
                        </Typography>
                        <RowInfo title="Harmony account"
                            price={settlementWaitng?.paymentByHarmony || "0.00"}
                            color="white"
                            background="#0A416F"
                        />
                        <RowInfo
                            title="Credit card"
                            price={settlementWaitng?.paymentByCreditCard || "0.00"}
                            color="white"
                            background="#115D9E"
                        />
                        <RowInfo
                            title="Cash"
                            price={settlementWaitng?.paymentByCash || "0.00"}
                            color="white"
                            background="#3881BC"
                        />
                        <RowInfo
                            title="Other"
                            price={settlementWaitng?.otherPayment || "0.00"}
                            color="white"
                            background="#BCD4E8"
                        />
                        <RowInfo
                            title="Discount"
                            price={settlementWaitng?.discount || "0.00"}
                            color="#333"
                            background="#f1f1f1"
                        />
                        <RowInfo
                            title="Total"
                            price={settlementWaitng?.total || "0.00"}
                            color="#53D769"
                            background="#DDF7FE"
                        />
                        <Note value={settlementWaitng?.note || ""} />
                    </Grid>

                    <Grid item xs={12} lg={6} style={{ height: 500 }}>
                        <Typography style={{ fontSize: '1rem', marginBottom: 16, marginTop: 8 }} variant="h6" gutterBottom>
                            Open batch
                        </Typography>
                        <RowInfo title="Credit card transaction:" price={settlementWaitng?.paymentTransaction?.length || "0"} color="white" background="#1366AE" />
                        <RowTransaction isHeader />
                        <div className="transaction_data" style={{ width: '100%', height: 450, overflowY: 'scroll' }}>
                            {
                                settlementWaitng?.paymentTransaction &&
                                settlementWaitng?.paymentTransaction?.length > 0 &&
                                settlementWaitng.paymentTransaction.map((payment) => {
                                    const icon = this.getCredicardIcon(payment.paymentData.card_type)
                                    return (
                                        <RowTransaction
                                            key={payment.transactionId + "transaction"}
                                            payment={payment}
                                            icon={icon}
                                        />
                                    )
                                })
                            }
                        </div>

                    </Grid>
                </Grid>
                <div className="group-button-settlement-wating">
                    <NewButton onClick={() => this.props.back()}>
                        Back
                    </NewButton>
                    <NewButton style={{ marginLeft: 16 }} blue={true} onClick={() => this.props.submitCloseSettlement()}>
                        Close Settlement
                    </NewButton>
                </div>
            </div>
        )
    }
}

const Note = ({ value = '' }) => (
    <>
        <p style={{ fontSize: '1.05rem', fontWeight: '600', marginTop: 40 }}>Note:</p>
        <div className="note-settlement">{value}</div>
    </>
)


const RowInfo = ({
    background = "#0A416F",
    color = "white",
    title = '',
    price = '',
}) => (
    <div
        style={{ background, color }}
        className="rowInfo_settlement"
    >
        <div
            style={{
                color: title === "Total" ? "#333" : color,
                fontWeight: title === "Total" ? "500" : "400",
            }}>
            {title}
        </div>
        <div style={{ fontWeight: '600' }}>
            {title === "Credit card transaction:" ? price : `$ ${price}`}
        </div>
    </div>
);

const RowTransaction = ({ isHeader = false, payment, icon }) => (
    isHeader ?
        <div className="row_transaction_settlement_header">
            <div>Trans ID</div>
            <div>Invoice</div>
            <div>Payments</div>
            <div>Status</div>
            <div>Amount</div>
        </div> :
        <div className="row_transaction_settlement">
            <div>#{payment.transactionId}</div>
            <div>#{payment.checkoutId}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={icon}
                    style={{ width: 32, height: 32, marginRight: 6, objectFit: 'contain' }}
                    alt="imgcard"
                />
                x{payment.paymentData.card_number}
            </div>
            <div>{payment.status}</div>
            <div>$ {payment.amount}</div>
        </div>
)
