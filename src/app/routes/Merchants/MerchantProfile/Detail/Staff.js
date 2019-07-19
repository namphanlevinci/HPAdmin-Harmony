import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../MerchantProfile.css'
import '../../MerchantsRequest/MerchantReqProfile.css'
import '../../MerchantsRequest/MerchantsRequest.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="content GeneralContent">
                    <h1>STAFF</h1>
                    <NotificationContainer />
            </div>
         );
    }
}



const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants,
    InfoUser_Login: state.User,
})
export default (connect(mapStateToProps)(Staff));