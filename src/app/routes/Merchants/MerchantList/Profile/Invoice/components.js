import React from "react";

import {
    FormControl,
    Select,
    MenuItem,
    Grid,
    InputLabel,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";


export const PaymentMethod = ({ paymentMethod, onChange }) => {
    return (
        <Grid item xs={2} style={{}}>
            <FormControl style={{ width: "100%" }}>
                <InputLabel>Payment method</InputLabel>
                <Select
                    value={paymentMethod}
                    onChange={onChange}
                >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"harmony"}>HarmonyPay</MenuItem>
                    <MenuItem value={"credit_card"}>Credit Card</MenuItem>
                    <MenuItem value={"cash"}>Cash</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                    <MenuItem value={"giftcard"}>Gift card</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}

export const Status = ({ status, onChange }) => {
    return (
        <Grid item xs={2} style={{}}>
            <FormControl style={{ width: "100%" }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={onChange}
                >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"complete"}>Complete </MenuItem>
                    <MenuItem value={"incomplete"}>Incomplete</MenuItem>
                    <MenuItem value={"paid"}>Paid</MenuItem>
                    <MenuItem value={"void"}>Void</MenuItem>
                    <MenuItem value={"refund"}>Refund</MenuItem>
                    <MenuItem value={"cancel"}>Cancel</MenuItem>
                    <MenuItem value={"transaction fail"}>Transaction Fail</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}

export class TimeRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: moment().startOf("month").format("YYYY-MM-DD"),
            to: moment().endOf("month").format("YYYY-MM-DD"),
            range: "thisMonth",
        }
    }

    timeRange = async (e) => {
        const value = e.target.value;
        await this.setState({ range: value });
        let from = moment().startOf("day").format("YYYY-MM-DD");
        let to = moment().startOf("day").format("YYYY-MM-DD");

        switch (value) {
            case "today":
                from = moment().startOf("day").format("YYYY-MM-DD");
                to = moment().startOf("day").format("YYYY-MM-DD");
                break;

            case "yesterday":
                from = moment().subtract(1, "day").format("YYYY-MM-DD");
                to = moment().subtract(1, "day").format("YYYY-MM-DD");
                break;

            case "thisWeek":
                from = moment().startOf("week").format("YYYY-MM-DD");
                to = moment().endOf("week").format("YYYY-MM-DD");
                break;

            case "lastWeek":
                from = moment().subtract(1, "week").format("YYYY-MM-DD");
                to = moment().subtract(1, "week").endOf("week").format("YYYY-MM-DD");
                break;

            case "thisMonth":
                from = moment().startOf("month").format("YYYY-MM-DD");
                to = moment().endOf("month").format("YYYY-MM-DD");
                break;

            case "lastMonth":
                from = moment()
                    .subtract(1, "month")
                    .startOf("month")
                    .format("YYYY-MM-DD");
                to = moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD");

                break;
            default:
                break;
        }
        this.setState({ from, to });
        this.props.timeRange(from, to, value);
    };

    handleDateChange = async (e, name) => {
        const value = moment(e).format("MM/DD/YYYY");
        await this.setState({
            [name]: value,
        });
        await this.props.handleDateChange(name, value);
    };

    reset = () =>{
        this.setState({
            from: moment().startOf("month").format("YYYY-MM-DD"),
            to: moment().endOf("month").format("YYYY-MM-DD"),
            range: "thisMonth",
        })
    }

    render() {
        const { from, to, range } = this.state;

        return (
            <>
                <Grid item xs={2} style={{}}>
                    <FormControl style={{ width: "100%" }}>
                        <InputLabel>Time Range</InputLabel>
                        <Select value={range} onChange={this.timeRange}>
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

                {range === "all" ? (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={2} style={{}}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                label="From"
                                name="from"
                                value={from}
                                onChange={(e) => this.handleDateChange(e, "from")}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                autoOk={true}
                                style={{ width: "100%", margin: 0 }}
                            />
                        </Grid>
                        <Grid item xs={2} style={{}}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                label="To"
                                value={to}
                                name="to"
                                onChange={(e) => this.handleDateChange(e, "to")}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                autoOk={true}
                                style={{ width: "100%", margin: 0 }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                ) : null}
            </>
        );
    }
}