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

export default class MerchantDevice extends Component {

    onNext = () => { }

    onCancel = () => { }

    changeMerchant = (merchant) => {
        this.props.selectMerchant(merchant);
    }

    render() {
        const { merchantList, merchantSelected } = this.props;

        return (
            <div style={{ height: 400, position: 'relative' }}>
                <Typography style={{ color: '#1366AE', marginTop: 45 }} variant="h6" gutterBottom>
                    Merchant & Device
                </Typography>
                <Grid
                    container
                    spacing={3}
                    className="TransactionSearch"
                    style={{ marginTop: 5 }}
                >
                    <Grid item xs={3} style={{}}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel>Merchant</InputLabel>
                            <Select value={merchantSelected} onChange={e => this.changeMerchant(e.target.value)}>
                                {
                                    merchantList.map((m) => (
                                        <MenuItem
                                            key={m.merchantId + 'merchantId'}
                                            value={m}
                                        >
                                            {m.businessname}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3} style={{}}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel>Device</InputLabel>
                            <Select value={""} onChange={() => { }}>
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="yesterday">Yesterday</MenuItem>
                                <MenuItem value="thisWeek">This Week</MenuItem>
                                <MenuItem value="lastWeek">Last Week</MenuItem>
                                <MenuItem value="thisMonth">This Month</MenuItem>
                                <MenuItem value="lastMonth">Last Month</MenuItem>
                                <MenuItem value="all">Custom</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={3} style={{}}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            label="Serial number"
                            placeholder="Device serial number"
                            value={""}
                            onChange={() => { }}
                            name="serialDevice"
                            style={{ width: "100%" }}
                        />
                    </Grid>
                </Grid>

                <GroupButton
                    onNext={this.onNext}
                    onCancel={this.onCancel}
                />
            </div>
        )
    }
}


const GroupButton = (onNext = () => { }, onCancel = () => { }) => {
    return (
        <div className="group-button-merchant-device">
            <NewButton blue onClick={onNext}>
                Next
            </NewButton>

            <NewButton onClick={onCancel}>
                Cancel
            </NewButton>
        </div>
    )
}