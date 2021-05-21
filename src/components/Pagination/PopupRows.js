import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import "./style.scss";

const data = [
    5,
    10,
    25,
    50,
    100,
]

export default class PopupRows extends Component {

    selectRows = (e, row) => {
        e.stopPropagation();
        this.props.selectRows(row);
    }

    render() {
        return (
            <OutsideClickHandler onOutsideClick={() => this.props.closePopupRows()}>
                <div className="popup_rows">
                    {
                        data.map((row, index) => (
                            <div
                                onClick={(e) => this.selectRows(e, row)}
                                className="popup_rows_per" key={'row' + index.toString()}>
                                {row} rows
                            </div>
                        ))
                    }
                </div>
            </OutsideClickHandler>
        )
    }
}
