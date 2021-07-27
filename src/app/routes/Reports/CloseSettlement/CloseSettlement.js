import React, { Component } from "react";
import { connect } from "react-redux";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import { withRouter } from "react-router-dom";
import MerchantDevice from "./MerchantDevice";
import axios from "axios";
import { config } from "../../../../url/url";
import "./style.scss";

const URL = config.url.URL;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            merchantList: [],
            deviceList : [],
            serialList : [],
            merchantSelected: '',
            deviceId: '',
            serialDevice: '',
        };
    }


    getSteps = () => {
        return [
            "Merchant & Device",
            "Submit",
        ];
    };

    componentDidMount = () => {
        this.getMerchantListBasic();
    }

    getMerchantListBasic = async () => {
        const { user } = this.props;
        const url = `merchant/basicList`;
        const { data } = await axios.get(`${URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });
        this.setState({ merchantList: data.data || [] })
    }

    getDeviceOfMerchant = () => {

    }

    getSerialOfDevice = () => {

    }

    render() {
        const { activeStep, merchantList, merchantSelected } = this.state;
        const steps = this.getSteps();
        return (
            <div className="container-fluid react-transition swipe-right">
                <ContainerHeader
                    match={this.props.match}
                    title={'Close Settlement'}
                />
                <div
                    className="MerList page-heading"
                    style={{ padding: "20px", background: "white" }}
                >
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        className="horizontal-stepper-linear"
                    >
                        {steps.map((label, index) => {
                            return (
                                <Step
                                    key={label}
                                    className={`horizontal-stepper ${index === activeStep ? "active" : ""}`}
                                >
                                    <StepLabel className="stepperLabel">{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <MerchantDevice
                        merchantList={merchantList}
                        merchantSelected={merchantSelected}
                        selectMerchant={merchantSelected => this.setState({ merchantSelected })}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.verifyUser.user,
});
const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, null)(Index));
