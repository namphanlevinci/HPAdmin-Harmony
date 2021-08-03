import React, { Component } from 'react';
import { formatMoney, FormatPrice } from "./helper";
import "./style.scss";

export default class Detail extends Component {
    render() {
        const {
            services = [],
            products = [],
            extras = [],
            giftCards = [],
            subTotal,
            tipAmount,
            discount,
            tax,
            total,
        } = this.props;

        return (
            <div className="invoice-block">
                <h4>Basket</h4>
                <div className="invoice-block-group">
                    <div
                        style={{ borderBottom: '1px solid #eeeeee' , paddingBottom : 10 , marginBottom : 5 }}
                        className="invoice-block-group-rowDetail"
                    >
                        <div style={{ fontWeight: '500', width: '40%' }}>
                            Description
                        </div>
                        <div style={{ fontWeight: '500', width: '20%' }}>
                            Price
                        </div>
                        <div style={{ fontWeight: '500', width: '20%' }}>
                            Qty
                        </div>
                        <div style={{ fontWeight: 'bold', width: '20%', textAlign: 'right' }}>
                            Total
                        </div>
                    </div>

                    {
                        services.map(s => (
                            <div key={s.bookingServiceId + 'service'} className="invoice-block-group-rowDetail">
                                <div style={{ fontWeight: '500', width: '40%' }}>
                                    {s.serviceName}
                                </div>
                                <div style={{ fontWeight: '500', width: '20%' }}>
                                    {`$ ${s.price}`}
                                </div>
                                <div style={{ fontWeight: '500', width: '20%' }}>
                                    1
                                </div>
                                <div style={{ fontWeight: '500', width: '20%', textAlign: 'right' }}>
                                    {`$ ${s.price}`}
                                </div>
                            </div>
                        ))
                    }
                    {
                        extras.map(s => (
                            <div key={s.bookingExtraId + 'extra'} className="invoice-block-group-rowDetail">
                                <div style={{ fontWeight: '500', width: '40%' }}>
                                    {s.extraName}
                                </div>
                                <div style={{ fontWeight: '500', width: '20%' }}>
                                    {`$ ${s.price}`}
                                </div>
                                <div style={{ fontWeight: '500', width: '20%' }}>
                                    1
                                </div>
                                <div style={{ fontWeight: '500', width: '20%', textAlign: 'right' }}>
                                    {`$ ${s.price}`}
                                </div>
                            </div>
                        ))
                    }
                    {
                        products.map(s => {
                            let tempPrice = FormatPrice(s.price);
                            let total = parseInt(s.quantity) * tempPrice;
                            total = formatMoney(total)
                            return (
                                <div key={s.bookingProductId + 'product'} className="invoice-block-group-rowDetail">
                                    <div style={{ fontWeight: '500', width: '40%' }}>
                                        {s.productName}
                                    </div>
                                    <div style={{ fontWeight: '500', width: '20%' }}>
                                        {`$ ${s.price}`}
                                    </div>
                                    <div style={{ fontWeight: '500', width: '20%' }}>
                                        {s.quantity}
                                    </div>
                                    <div style={{ fontWeight: '500', width: '20%', textAlign: 'right' }}>
                                        {`$ ${total}`}
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        giftCards.map(s => {
                            let tempPrice = FormatPrice(s.price);
                            let total = parseInt(s.quantity) * tempPrice;
                            total = formatMoney(total)

                            const name = s.name ? s.name : s.giftCardName ? s.giftCardName : "";
                            return (
                                <div key={s.bookingProductId + 'product'} className="invoice-block-group-rowDetail">
                                    <div style={{ fontWeight: '500', width: '40%' }}>
                                        {name}
                                    </div>
                                    <div style={{ fontWeight: '500', width: '20%' }}>
                                        {`$ ${s.price}`}
                                    </div>
                                    <div style={{ fontWeight: '500', width: '20%' }}>
                                        {s.quantity}
                                    </div>
                                    <div style={{ fontWeight: '500', width: '20%', textAlign: 'right' }}>
                                        {`$ ${total}`}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="invoice_line" />

                    <TotalBlock
                        subTotal={subTotal}
                        tipAmount={tipAmount}
                        discount={discount}
                        tax={tax}
                        total={total}
                    />
                </div>
            </div>
        )
    }
}


const TotalBlock = ({
    subTotal,
    tipAmount,
    discount,
    tax,
    total,
}) => {
    return (
        <React.Fragment>
            <div className="invoice_row_total">
                <div>Subtotal: </div>
                <div>$ {subTotal}</div>
            </div>
            <div className="invoice_row_total">
                <div>Tip: </div>
                <div>$ {tipAmount}</div>
            </div>
            <div className="invoice_row_total">
                <div>Discount: </div>
                <div>$ {discount}</div>
            </div>
            <div className="invoice_row_total">
                <div>Tax: </div>
                <div>$ {tax}</div>
            </div>
            <div className="invoice_row_total">
                <div style={{ fontWeight: '500' }}>Total: </div>
                <div>$ {total}</div>
            </div>
        </React.Fragment>
    )
}