import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MerchantDevice from "./MerchantDevice";
import SettlementWaiting from "./SettlementWaiting";
import axios from "axios";
import { isEmpty } from "lodash";
import { config } from "../../../../url/url";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import FadeLoader from "react-spinners/PulseLoader";
import { Stepper } from 'react-form-stepper';
import PopupSuccess from "./PopupSuccess";
import "./style.scss";

const URL = config.url.URL;

const initialState = {
    activeStep: 0,
    merchantList: [],
    deviceList: [],
    serialList: [],
    merchantSelected: 'Select merchant',
    deviceSelected: 'Select device',
    serialSelected: '',
    isLoading: false,
    settlementWaitng: null,
    isSuccess: false,
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

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
            isLoading: false,
            activeStep: 1
        });
    }

    selectMerchant = (merchant) => {
        this.setState({
            merchantSelected: merchant,
            deviceList: [],
            deviceSelected: 'Select device',
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
        if (merchantSelected === "Select merchant") {
            alert('Pleaee select merchant');
            return;
        }
        if (deviceSelected === "Select device") {
            alert('Pleaee select device');
            return;
        }
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

    /***************** CLOSE SETTLEMENT *****************/
    submitCloseSettlement = async () => {
        try {
            this.setState({ isLoading: true });
            const { merchantSelected, settlementWaitng, deviceSelected } = this.state;
            const { user } = this.props;
            const url = `settlement/`;
            const body = {
                merchantId: merchantSelected.merchantid,
                TerminalId: deviceSelected.terminalId,
                paymentByHarmony: settlementWaitng.paymentByHarmony,
                paymentByCreditCard: settlementWaitng.paymentByCreditCard,
                paymentByCash: settlementWaitng.paymentByCash,
                otherPayment: settlementWaitng.otherPayment,
                total: settlementWaitng.total,
                note: settlementWaitng.note,
                checkout: settlementWaitng.checkout,
                discount: settlementWaitng.discount,
                paymentByCashStatistic: settlementWaitng.paymentByCashStatistic,
                otherPaymentStatistic: settlementWaitng.otherPaymentStatistic,
                isConnectPax: settlementWaitng.isConnectPax
            }
            const { data } = await axios.post(
                `${URL}/${url}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );

            if (data && parseInt(data.codeNumber) === 200) {
                this.setState({
                    isLoading: false,
                    isSuccess: true
                });
            }


        } catch (err) {
            alert(err);
            this.setState({ isLoading: false })
        }
    }

    onClickOKSuccess = () => {
        this.resetState();
        this.getMerchantListBasic();
    }

    resetState = () => {
        this.setState(initialState)
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
            settlementWaitng,
            isSuccess,
        } = this.state;

        return (
            <>
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
                            steps={[{ label: 'Merchant & Device' }, { label: 'Submit' }]}
                            activeStep={activeStep}
                            connectorStateColors={true}
                            connectorStyleConfig={{
                                activeColor: '#1366AE',
                                size: 2,
                            }}
                            styleConfig={{
                                activeBgColor: '#1366AE',
                                activeTextColor: 'white',
                                inactiveBgColor: '#DDDDDD',
                                completedBgColor: '#1366AE',
                                fontWeight: '600'
                            }}
                        />

                        {
                            parseInt(activeStep) === 0 &&
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
                            parseInt(activeStep) === 1 &&
                            <SettlementWaiting
                                submitCloseSettlement={this.submitCloseSettlement}
                                back={this.backToMerchantDevice}
                                settlementWaitng={settlementWaitng}
                            />
                        }
                    </div>
                    {
                        isLoading && <div className="container-loading-settlement">
                            <div className="loader-settlement">
                                <FadeLoader
                                    color={'white'}
                                    loading={isLoading}
                                    size={10}
                                    css={{
                                        display: 'block',
                                    }} />
                            </div>
                        </div>
                    }
                </div>
                <PopupSuccess
                    isPopup={isSuccess}
                    actionOK={this.onClickOKSuccess}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.verifyUser.user,
});
const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, null)(Index));
