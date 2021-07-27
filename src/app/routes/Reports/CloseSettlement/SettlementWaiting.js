import React, { Component } from 'react';
import {
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@material-ui/core";
import NewButton from "@components/Button/Search";
import "./style.scss";

export default class SettlementWaiting extends Component {
    render() {
        const { settlementWaitng } = this.props;
        console.log({ settlementWaitng })
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
                        <RowInfo title="Harmony account" price={'100.00'} color="white" background="#0A416F" />
                        <RowInfo title="Credit card" price={'100.00'} color="white" background="#115D9E" />
                        <RowInfo title="Cash" price={'100.00'} color="white" background="#3881BC" />
                        <RowInfo title="Other" price={'100.00'} color="white" background="#BCD4E8" />
                        <RowInfo title="Discount" price={'100.00'} color="#333" background="#f1f1f1" />
                        <RowInfo title="Total" price={'100.00'} color="#53D769" background="#DDF7FE" />
                        <Note />
                    </Grid>

                    <Grid item xs={6} style={{ height: 500 }}>
                        <RowInfo title="Credit card transaction:" price={'24'} color="white" background="#1366AE" />

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
        <div style={{ fontWeight: '600' }}>$ {price}</div>
    </div>
)