import React, { Component } from "react";
import { connect } from "react-redux";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import { withRouter } from "react-router-dom";
import MerchantDevice from "./MerchantDevice";
import SettlementWaiting from "./SettlementWaiting";
import axios from "axios";
import { isEmpty } from "lodash";
import { config } from "../../../../url/url";
import FadeLoader from "react-spinners/FadeLoader";
import "./style.scss";

const URL = config.url.URL;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            merchantList: [],
            deviceList: [],
            serialList: [],
            merchantSelected: '',
            deviceSelected: '',
            serialSelected: '',
            isLoading: false,
            settlementWaitng: null,
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

    /***************** get Merchant List *****************/
    getMerchantListBasic = async () => {
        this.setState({ isLoading: true });
        const { user } = this.props;
        const url = `merchant/basicList`;
        const { data } = await axios.get(`${URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });
        this.setState({ merchantList: data.data || [], isLoading: false });
    }

    /***************** get Device Mecrchant Selected *****************/
    getDeviceOfMerchant = async (merchantId) => {
        this.setState({ isLoading: true });
        const { user } = this.props;
        const url = `merchant/${merchantId}/device-terminal`;
        const { data } = await axios.get(`${URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });
        this.setState({ deviceList: data.data || [], isLoading: false });
    }

    /***************** get Serial number from device *****************/
    getSerialOfDevice = async (device) => {
        this.setState({ isLoading: true });
        const { merchantSelected } = this.state;
        const { user } = this.props;
        const url = `settlement/ssnByDevice?merchantId=${merchantSelected.merchantid}&deviceId=${device.deviceId}`;
        const { data } = await axios.get(`${URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });
        this.setState({ serialSelected: isEmpty(data?.data) ? "" : data?.data, isLoading: false });
    }


    /***************** get data settlement *****************/
    getSettlementWaiting = async () => {
        this.setState({ isLoading: true });
        const { deviceSelected, merchantSelected, serialSelected } = this.state;

        let url = `settlement/waiting?sn=${serialSelected}&merchantId=${merchantSelected.merchantid}&deviceId=${deviceSelected.deviceId}`;
        if (isEmpty(serialSelected)) {
            url = `settlement/waiting?sn=&merchantId=${merchantSelected.merchantid}&deviceId=${deviceSelected.deviceId}`;
        }
        const { user } = this.props;
        const { data } = await axios.get(`${URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });
        this.setState({
            settlementWaitng: data.data || [],
            isLoading: false
        });
    }

    selectMerchant = (merchant) => {
        this.setState({
            merchantSelected: merchant,
            deviceList: [],
            deviceSelected: '',
            serialSelected: '',
        });
        this.getDeviceOfMerchant(merchant.merchantid);
    }

    selectDevice = (device) => {
        this.setState({
            deviceSelected: device,
            serialSelected: '',
        });
        this.getSerialOfDevice(device);
    }

    nextMerchantDevice = () => {
        const { merchantSelected, deviceSelected } = this.state;
        if (isEmpty(merchantSelected)) {
            alert('Pleaee select merchant');
            return;
        }
        if (isEmpty(deviceSelected)) {
            alert('Pleaee select device');
            return;
        }

        this.setState({ activeStep: 1 });
        this.getSettlementWaiting();
    }

    cancelMerchantDevice = () => {
        this.props.history.push("/app/reports/batchs");
    }

    backToMerchantDevice = () => {
        this.setState({
            activeStep: 0,
            settlementWaitng: null,
        });
    }

    submitCloseSettlement = () => {

    }

    render() {
        const {
            activeStep,
            merchantList,
            deviceList,
            serialList,
            merchantSelected,
            deviceSelected,
            serialSelected,
            isLoading,
            settlementWaitng
        } = this.state;

        const steps = this.getSteps();

        return (
            <div style={{ position: 'relative' }} className="container-fluid react-transition swipe-right">
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

                    {
                        parseInt(activeStep) === 1 && 
                        <MerchantDevice
                            merchantList={merchantList}
                            deviceList={deviceList}
                            serialList={serialList}
                            serialSelected={serialSelected}
                            merchantSelected={merchantSelected}
                            deviceSelected={deviceSelected}
                            selectMerchant={this.selectMerchant}
                            selectDevice={this.selectDevice}
                            next={this.nextMerchantDevice}
                            cancel={this.cancelMerchantDevice}
                        />
                    }

                    {
                        parseInt(activeStep) === 0 &&
                        <SettlementWaiting
                            submitCloseSettlement={this.submitCloseSettlement}
                            back={this.backToMerchantDevice}
                            settlementWaitng={settlementWaitng}
                        />
                    }
                </div>
                {
                    isLoading && <div className="container-loading-settlement">
                        <FadeLoader
                            color={'#1366AE'}
                            loading={isLoading}
                            size={20} css={{
                                display: 'block',
                                borderColor: 'red',
                            }} />
                    </div>
                }
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
