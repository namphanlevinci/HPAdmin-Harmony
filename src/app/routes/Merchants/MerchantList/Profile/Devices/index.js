import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { getDevices, selectTerminal, updateDevices } from '../../../../../../actions/Setting';
import { FAILURE_NOTIFICATION } from '../../../../../../constants/notificationConstants';
import FadeLoader from "react-spinners/FadeLoader";
import DeviceItem from "./DeviceItem";
import { isEmpty } from 'lodash';
import "./style.scss";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indexPopup: "",
        }
    }

    componentWillMount() {
        const { MerchantProfile: { merchantId } } = this.props;
        this.props.getDevices(merchantId);
    }

    selectTerminal = async (terminal, index) => {
        await this.props.selectTerminal({ terminal, index });
        await this.closePopupTerminal();
    }

    openPopupTerminal = (indexPopup) => {
        this.setState({ indexPopup })
    }

    closePopupTerminal = () => {
        this.setState({ indexPopup: "" })
    }

    save = () => {
        const isCheck = this.checkSaveCondition();
        const { deviceList } = this.props;
        const { MerchantProfile: { merchantId } } = this.props;
        if (isCheck == 1) {
            this.props.updateDevices({ merchantId, deviceList });
        }
    }

    checkSaveCondition = () => {
        const { deviceList } = this.props;
        for (let i = 0; i < deviceList.length; i++) {
            if (isEmpty(deviceList[i].terminalId)) {
                this.props.failureNotification(
                    `Please select terminal for device ${deviceList[i].deviceId}`
                );
                return 0;
            }
        }
        return 1;
    }

    render() {
        const { deviceList, loading } = this.props;
        if (deviceList.length === 0) {
            return (
                <div className="NoDevices">
                    There is no devices.
                </div>
            );
        }
        return (
            <div className="merchant-device-container">
                <div className="merchant-device-title">Devices</div>
                {
                    deviceList.map((obj, key) => (
                        <DeviceItem
                            key={key}
                            selectTerminal={(terminal) => this.selectTerminal(terminal, key)}
                            indexPopup={this.state.indexPopup}
                            index={key}
                            deviceName={obj.deviceId}
                            terminalName={obj.terminalId}
                            openPopupTerminal={() => this.openPopupTerminal(key)}
                            closePopupTerminal={this.closePopupTerminal}
                        />
                    ))
                }
                <Button
                    className="btn btn-green btn-save-device"
                    onClick={this.save}
                >
                    save
                </Button>
                {
                    loading &&
                    <div className="container-loading-devices">
                        <FadeLoader color={'#1366AE'} loading={loading} size={20} css={{
                            display: 'block',
                            borderColor: 'red',
                            marginBottom: 100,
                        }} />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    MerchantProfile: state.merchant.merchant,
    deviceList: state.device.deviceList,
    loading: state.device.loading,
});
const mapDispatchToProps = (dispatch) => ({
    getDevices: (merchantId) => dispatch(getDevices(merchantId)),
    updateDevices: (deviceList) => dispatch(updateDevices(deviceList)),
    selectTerminal: (payload) => dispatch(selectTerminal(payload)),
    failureNotification: (payload) => dispatch({ type: FAILURE_NOTIFICATION, payload }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
