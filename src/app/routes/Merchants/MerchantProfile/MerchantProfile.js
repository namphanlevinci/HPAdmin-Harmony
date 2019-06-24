import React, { Component } from 'react';
import { connect } from 'react-redux'


class merchantProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const Merchant = this.props.MerchantProfile
        console.log(Merchant)
        return ( 
            <div className="container MerList">
                <div>
                    <h1> Account Number: {Merchant.accountNumber}</h1>
                    <h1> Address: {Merchant.address}</h1>
                    <h1> Business Name: {Merchant.businessName}</h1>
                    <h1> City: {Merchant.city}</h1>
                    <h1> Email: {Merchant.email}</h1>
                    <h1> Phone: {Merchant.phone}</h1>
                    <h1> Tax ID: {Merchant.taxId}</h1>
                </div>
            </div>
         );
    }
}
 
const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants
})

export default (connect(mapStateToProps)(merchantProfile));