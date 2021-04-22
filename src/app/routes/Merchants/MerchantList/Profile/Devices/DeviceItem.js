import React, { Component } from 'react'
import iconGreyDown from "../../../../../../assets/images/down-grey.png";
import TerminalList from "./TerminalList";
import OutsideClickHandler from 'react-outside-click-handler';
import { isEmpty } from 'lodash';
import "./style.scss";

export default class DeviceItem extends Component {

    onSelectTerminal = (value) => {
        this.props.selectTerminal(value)
    }

    onOpenPopupTerminal = () => {
        this.props.openPopupTerminal();
    }

    onClosePopupTerminal = () => {
        this.props.closePopupTerminal();
    }

    render() {
        const { indexPopup, index, deviceName, terminalName } = this.props;
        return (
            <div className="itemContainer">
                <div className="itemContainer-left">
                    <div className="itemContainer-title">Device</div>
                    <div className="itemContainer-name device-name">
                        {deviceName}
                    </div>
                </div>
                <div
                    onClick={this.onOpenPopupTerminal}
                    className="itemContainer-right"
                >
                    <div className="itemContainer-title">Terminal</div>
                    <div className={isEmpty(terminalName) ? "itemContainer-right-select-error" : "itemContainer-right-select"}>
                        <div className="itemContainer-right-name">
                            {isEmpty(terminalName) ? "Please select terminal" : terminalName}
                        </div>
                        <img
                            src={iconGreyDown}
                            className="icon-grey-down"
                        />
                    </div>
                    {
                        parseInt(indexPopup) == parseInt(index) &&
                        <OutsideClickHandler
                            onOutsideClick={this.onClosePopupTerminal}
                        >
                            <TerminalList
                                onSelectTerminal={this.onSelectTerminal}
                                selectedValue={terminalName}
                            />
                        </OutsideClickHandler>
                    }
                </div>
            </div>
        )
    }
}