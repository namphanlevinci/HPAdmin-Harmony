import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../MerchantProfile.css'
import '../../MerchantsRequest/MerchantReqProfile.css'
import '../../MerchantsRequest/MerchantsRequest.css'
import "./Detail.css"
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            transactionsFee: '',
            merchantCode: '',
            merchantToken: '',
            limit: '10000'
         }
    }
    _handleChange = (event) =>  {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                [name]: value
            })
    }
    componentDidMount() {
        const data = this.props.MerchantProfile 
        this.setState({
            merchantCode: data.merchantCode,
            merchantToken: data.merchantToken,
            transactionsFee: data.transactionsFee
        })
    }
    _updateSettings = () => {
        const ID = this.props.MerchantProfile.merchantId
        const  {  merchantCode, merchantToken, transactionsFee} = this.state
        axios.put('https://api2.levincidemo.com/api/merchant/updatesetting/' + ID, { merchantCode, merchantToken, transactionsfee : transactionsFee   }, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            if(res.data.message === 'Success') {
                NotificationManager.success(res.data.message)
                setTimeout(() => {
                    this.setState({ settings: false });
                  }, 2000);
            }
            else {
                NotificationManager.error('Something went wrong, please try again.')
            }
        })
    }
    render() { 
        return ( 
            <div className="container">
                <NotificationContainer/>
                <h2>Settings</h2>
                <div className="container">
                    <div className="SettingsContent">
                    <div>
                        <h3>The charged percent fee of credit card transactions</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Transactions Fee (%):</label></td>
                                    <td><input name="transactionsFee" value={this.state.transactionsFee} onChange={this._handleChange}></input></td> 
                                </tr>
                                <tr>
                                    <td><label>Merchant ID:</label></td>
                                    <td><input name="merchantCode" value={this.state.merchantCode} onChange={this._handleChange}></input></td> 
                                </tr>
                                <tr>
                                    <td><label>Merchant Token:</label></td>
                                    <td><input name="merchantToken" value={this.state.merchantToken} onChange={this._handleChange}></input></td> 
                                </tr>
                            </tbody>
                        </table>
                    </div>
                        <div>
                            <button className="btn btn-green" onClick={this._updateSettings}>UPDATE</button>
                        </div>        
                    </div>
                    <h3>Daily transactions limit (unit $)</h3>
                        <label>The HarmonyPay system will alert any user and pervent any use involved monetary transfer or transfers that are:</label>
                        <label>a) More than $10,000 in total from either cash-in or cash-out.</label><br/>
                        <label>b) Is conducted by the same person.</label><br/>
                        <label>c) Is conducted on the same business day.</label><br/>
                        <div className="input-group">
                            <input type="text" className="col-4 form-control" name="limit" value={this.state.limit} onChange={this._handleChange}/>
                            <span className="input-group-btn">
                            <button className="btn btn-green">UPDATE</button>
                            </span>
                        </div>
                </div>          
                </div>
         );
    }
}

const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants,
    InfoUser_Login: state.User,
})

export default (connect(mapStateToProps)(Settings));