import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Consumer.css"
import '../../../Merchants/MerchantProfile/MerchantProfile.css'
import '../../../Merchants/MerchantsRequest/MerchantReqProfile.css'
import '../../../Merchants/MerchantsRequest/MerchantsRequest.css'
import {NotificationContainer} from 'react-notifications';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Acti extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() { 
        const renderGeneral = 
        <div>
        <div className="container">
        <h2>Activities Logs</h2>
        <div className="row">
            <div className="col-md-3">
                <form noValidate>
                    <TextField
                        id="date"
                        label="From"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </form>
                </div>
                <div className="col-md-3">
                    <form noValidate>
                    <TextField
                        id="date"
                        label="To"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </form>
                </div>
                <div className="col-md-12">
                    <Button style={{width: '100px', color: 'white', backgroundColor: '#3f51b5', marginTop: '20px'}}>SEARCH</Button>
                </div>
        </div>
            <div className="TransactionTable">
            <h2>Summary Data</h2>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th style={{width: '20%'}}>Date/time</th>
                                    <th>Activity</th>
                                </tr>
                            </thead>
                        </table>
            </div>
        
        </div>
        </div>
        return ( 
            <div className="content GeneralContent">
                    {renderGeneral}
                    <NotificationContainer />
            </div>
         );
    }
}

const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants,
    InfoUser_Login: state.User,
})

export default (connect(mapStateToProps)(Acti));