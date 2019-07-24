import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import '../MerchantProfile.css'
import '../../MerchantsRequest/MerchantReqProfile.css'
import '../../MerchantsRequest/MerchantsRequest.css'
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Button from '@material-ui/core/Button';

class General extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            edit: false,
            businessName: '',
            email: '',
            cellphone: '',
            address: '',
            city: '',
            stateId: '',
         }
    }
    _turnOff = () => {
        const data = this.props.MerchantProfile 
        this.setState({
            edit: false,
            businessName: data.businessName,
            email: data.email,
            cellphone: data.cellPhone,
            address: data.address,
            city: data.city,
            stateId: data.stateId
        })
    }
    _update = () => {
        const ID = this.props.MerchantProfile.merchantId
        const { businessName, email, cellphone, address, city, stateId } = this.state
        axios.put('https://api2.levincidemo.com/api/merchant/' + ID, { businessName, email, cellphone, address, city, stateId }, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
            .then((res) => {
                if(res.data.message === 'Success') {
                    NotificationManager.success(res.data.message)
                    setTimeout(() => {
                        this.setState({ edit: false });
                      }, 2000);
                }
                else {
                    NotificationManager.error('Something went wrong, please try again.')
                }
            })
    }
    _handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                [name]: value
            })
    }
    _toggleEdit = () => {
        this.setState({ edit: true })
    }
    componentDidMount() {
        const data = this.props.MerchantProfile 
        this.setState({
            businessName: data.businessName,
            email: data.email,
            cellphone: data.cellPhone,
            address: data.address,
            city: data.city,
            stateId: data.stateId,
        })
    }
    render() { 
        const e = this.props.MerchantProfile
        const renderGeneral = e.general !== undefined ? 
        <div>
            {this.state.edit !== false ? <div className="POPUP">
                                <div className="POPUP-INNER2">
                                    <h2 style={{color: '#3f51b5'}}>EDIT</h2>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><label>Legal Business Name:</label></td>
                                                    <td><input name="businessName" value={this.state.businessName} onChange={this._handleChange}></input></td> 
                                                </tr>
                                                <tr>
                                                    <td><label>Email:</label></td>
                                                    <td><input name="email" value={this.state.email} onChange={this._handleChange}></input></td> 
                                                </tr>
                                                <tr>
                                                    <td><label>Phone:</label></td>
                                                    <td><input name="cellphone" type="number" value={this.state.cellphone} onChange={this._handleChange}></input></td> 
                                                </tr>
                                                <tr>
                                                    <td><label>Address:</label></td>
                                                    <td><input name="address" value={this.state.address} onChange={this._handleChange}></input></td> 
                                                </tr>
                                                <tr>
                                                    <td><label>City:</label></td>
                                                    <td><input name="city" value={this.state.city} onChange={this._handleChange}></input></td> 
                                                </tr>
                                                <tr>
                                                    <td><label>State:</label></td>
                                                    <td><input name="stateId" type="number" value={this.state.stateId} onChange={this._handleChange}></input></td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr />
                                    <Button className="btn btn-red" onClick={this._turnOff}>BACK</Button>
                                    <Button className="btn btn-green" onClick={this._update}>UPDATE</Button>
                                </div>
                            </div> : null }
        <h2>General Information</h2>
        <div className="container">
        <div className="row justify-content-between">
            <div className="col-md-4">
                <h4>Legal Business Name*</h4>
                <p>{this.state.businessName}</p>
            </div>
            <div className="col-md-4">
                <h4>Doing Business As (DBA)*</h4>
                <p>{e.general !== null ? e.general.doBusinessName : null}</p>
            </div>
            <div className="col-md-4">
                <h4>Federal Tax ID*</h4>
                <p>{e.taxId}</p>
            </div>
            <div className="col-md-4">
                <h4>DBA Business Address*</h4>
                <p>{this.state.address + ' ' + this.state.city + ' ' + this.state.stateId}</p>
            </div>
            <div className="col-md-4">
                <h4>Phone*</h4>
                <p>{this.state.cellphone}</p>
            </div>
            <div className="col-md-4">
                <h4>Business Phone Number*</h4>
                <p>{this.state.phone}</p>
            </div>
            <div className="col-md-4">
                <h4>Contact Email Address*</h4>
                <p>{this.state.email}</p>
            </div>
            </div>
    <h2>Representative Information</h2>
        <div className="row">
            <div className="col-md-4">
                    <h4>Contact Name*</h4>
                    <p>{e.principals !== null ? e.principals.firstName + ' ' + e.principals.lastName : null}</p>
                </div>
                <div className="col-md-4">
                    <h4>Title/Position*</h4>
                    <p>{e.principals !== null ? e.principals.title : null}</p>
                </div>
                <div className="col-md-4">
                    <h4>Contact Phone Number*</h4>
                    <p>{e.principals !== null ? e.principals.mobilePhone : null}</p>
            </div>
        </div>
            <div className="SettingsContent GeneralContent">
                <Button className="btn btn-green" onClick={this._toggleEdit}>EDIT</Button>
            </div>
        </div>
        </div> : <Redirect to="/app/merchants/accepted-list" />
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

export default (connect(mapStateToProps)(General));