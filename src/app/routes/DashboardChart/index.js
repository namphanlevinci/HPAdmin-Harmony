import React from "react";
import { Helmet } from "react-helmet";
import {
    Typography,
    Checkbox,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Grid,
} from "@material-ui/core";

import ContainerHeader from "../../../components/ContainerHeader/index";
import ItemDashboard from "./ItemDashboard";
import CustomerChart from "./CustomerChart";
import AppointmentChart from "./AppointmentChart";

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="app-wrapper react-transition swipe-right">
                <div className="container-fluid">
                    <Helmet>
                        <title>Dashboard | Harmony Admin</title>
                    </Helmet>
                    <ContainerHeader
                        match={this.props.match}
                        title={"Dashboard"}
                    />
                    <Grid
                        container
                        spacing={2}
                        className="search"
                    >
                        <Grid item={true} md={6} lg={3} xs={12}>
                            <ItemDashboard
                                title="Appointment booked via Consumer"
                            />
                        </Grid>

                        <Grid item={true} md={6} lg={3} xs={12}>
                            <ItemDashboard
                                title="Appointment booked via Website"
                            />
                        </Grid>

                        <Grid item={true} md={6} lg={3} xs={12}>
                            <ItemDashboard
                                title="Appointment booked via POS"
                            />
                        </Grid>


                        <Grid item={true} md={6} lg={3} xs={12}>
                            <ItemDashboard
                                title="New Consumer"
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        spacing={2}
                        className="search"
                        style={{ marginTop : 15 }}
                    >
                        <AppointmentChart />
                        <CustomerChart />
                    </Grid>
                </div>
            </div>
        );
    }
}

