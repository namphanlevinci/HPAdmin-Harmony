import React, { Component } from 'react';
import {
    Typography,
    Grid,
} from "@material-ui/core";
import NewButton from "@components/Button/Search";
import "./style.scss";

export default class SettlementWaiting extends Component {
    render() {
        const { settlementWaitng } = this.props;
        return (
            <div style={{ minHeight: 600, position: 'relative' }}>
                <Typography style={{ color: '#1366AE', marginTop: 45 }} variant="h6" gutterBottom>
                    Submit
                </Typography>
                <Grid
                    container
                    spacing={3}
                    className="TransactionSearch"
                    style={{ marginTop: 5 }}
                >
                    <Grid item xs={6} style={{ height: 500 }}>
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

                    <Grid item xs={6} style={{ height: 500 }}>
                        <RowInfo title="Credit card transaction:" price={settlementWaitng?.paymentTransaction?.length || "0"} color="white" background="#1366AE" />
                        <RowTransaction isHeader />
                        <div style={{ width: '100%', height: 450, overflowY: 'scroll' }}>
                            {
                                settlementWaitng?.paymentTransaction &&
                                settlementWaitng?.paymentTransaction?.length > 0 &&
                                settlementWaitng.paymentTransaction.map((payment) => (
                                    <RowTransaction
                                        key={payment.transactionId + "transaction"}
                                        payment={payment}
                                    />
                                ))
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
        <div>{title}</div>
        <div style={{ fontWeight: '600' }}>
            {title === "Credit card transaction:" ? price : `$ ${price}`}
        </div>
    </div>
);

const RowTransaction = ({ isHeader = false, payment }) => (
    isHeader ?
        <div className="row_transaction_settlement_header">
            <div>Trans ID</div>
            <div>Invoice</div>
            <div>Payments</div>
            <div>Status</div>
            <div>Amount</div>
        </div> :
        <div className="row_transaction_settlement">
            <div>{payment.transactionId}</div>
            <div>{payment.checkoutId}</div>
            <div>526</div>
            <div>{payment.status}</div>
            <div>{payment.amount}</div>
        </div>
)
