import React, { Component } from 'react';
import moment from "moment";
import "./style.scss";

export default class Detail extends Component {
    render() {
        const {
            code,
            createdDate,
            firstName,
            lastName,
            phone,
            paymentMethod,
            status,
            total,
            createdBy,
            modifiedBy
        } = this.props;
        return (
            <div className="invoice-block">
                <h4>Invoice Details</h4>
                <div className="invoice-block-group">
                    <div className="invoice-block-group-rowDetail">
                        <div>Invoice ID</div>
                        <div>#{code}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Date</div>
                        <div>{moment(createdDate).format('MM/DD/YYYY')}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Time</div>
                        <div>{moment(createdDate).format('hh:mm A')}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Customer</div>
                        <div>{`${firstName} ${lastName}`}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Phone</div>
                        <div>{phone}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Status</div>
                        <div>{status}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Payment method</div>
                        <div>{paymentMethod}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Total amount</div>
                        <div>{`$ ${total}`}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Created by</div>
                        <div>{createdBy}</div>
                    </div>
                    <div className="invoice-block-group-rowDetail">
                        <div>Modified by</div>
                        <div>{modifiedBy}</div>
                    </div>
                </div>
            </div>
        )
    }
}
