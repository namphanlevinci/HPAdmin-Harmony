import React, { Component } from 'react';
import { connect } from 'react-redux'
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect } from 'react-router-dom';
import "./MerchantProfile.css"
import { Checkbox } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "../MerchantsRequest/MerchantReqProfile.css"
import "../MerchantsRequest/MerchantsRequest.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios'
class merchantProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            edit: false,
            businessName: '',
            email: '',
            cellphone: '',
            address: '',
            city: '',
            stateId: ''
         }
         this._handleChange = this._handleChange.bind(this)
    }
    componentDidMount() {
        const data = this.props.MerchantProfile 
        this.setState({
            businessName: data.businessName,
            email: data.email,
            cellphone: data.cellPhone,
            address: data.address,
            city: data.city,
            stateId: data.stateId
        })
    }
    _handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                [name]: value
            })
    }
    _toggleEdit = () => {
        this.setState({ edit: this.edit = !this.edit })
    }
    _update = () => {
        const ID = this.props.MerchantProfile.merchantId
        const { businessName, email, cellphone, address, city, stateId } = this.state
        axios.put('http://api2.levincidemo.com/api/merchant/' + ID, { businessName, email, cellphone, address, city, stateId }, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
            .then((res) => {
                if(res.data.message === 'Success') {
                    // console.log(res)
                    NotificationManager.success(res.data.message)
                    setTimeout(() => {
                        this.setState({ edit: false });
                      }, 3000);
                }
                else {
                    NotificationManager.error('Something went wrong, please try again.')
                }
            })
    }
    render() { 
        const e = this.props.MerchantProfile
        console.log(e)
        const renderStaff = e.staffs !==  undefined ? e.staffs.map((e) => {
            const ID = e.staffId
            return (
                <div key={e.staffId} className="StaffContent">
                        <button type="button" class="StaffBtn btn btn-primary" data-toggle="collapse" data-target={'#demo' + ID}>Staff {' ' + e.firstName + ' ' + e.lastName}</button>
                        <div id={'demo' + ID} class="collapse">
                            <div className='container'>
                                <h2>Staff (ID: {e.staffId})</h2>
                                <div className="row justify-content-between">
                                <div className="col-md-3">
                                        <img className="avatar" src={require("./avatar.png")} alt="avatar"/>
                                        <h4>Full Name*</h4>
                                            <p>{e.firstName + ' ' + e.lastName}</p>
                                        <h4>Email*</h4>
                                            <p>{e.email}</p>
                                        <h4>Phone*</h4>
                                            <p>Phone: {e.phone}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <h4>Display Name</h4>
                                            <p>{e.displayName}</p>
                                        <h4>City</h4>
                                            <p>{e.city}</p>
                                        <h4>Pin</h4>
                                            <p>{e.pin}</p>
                                        <h4>Driverlicense</h4>
                                            <p>Null</p>
                                    </div>
                                    <div className="col-md-3">
                                        <h4>State</h4>
                                            <p>{e.stateId}</p>
                                        <h4>Role*</h4>
                                            <p>{e.roles.name}</p>
                                        <h4>Code</h4>
                                            <p>Null</p>
                                    </div>
                                    <div className="col-md-3">
                                    <h2>Salaries</h2>
                                        <h4>Commission(%)</h4>
                                            <p>{e.salaries.commission.value}%</p>
                                        <h4>per Hour($)</h4>
                                            <p>${e.salaries.perHour.value}</p>
                                        <h4>Tip Fee</h4>
                                            <p>Null</p>
                                    </div>
                                </div>
                                <h2>Work Schedule</h2>
                                <div className="row align-items-center">
                                    <div className="col-md-12">
                                        <table style={{width: '100%'}}>
                                            <thead>
                                                <tr>
                                                    <th>Monday</th>
                                                    <th>Tuesday</th>
                                                    <th>Wednesday</th>
                                                    <th>Thursday</th>
                                                    <th>Friday</th>
                                                    <th>Saturday</th>
                                                    <th>Sunday</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{width: '12%'}}>From: {e.workingTimes.Monday.timeStart} <br/>To: {e.workingTimes.Monday.timeEnd}</td>
                                                    <td style={{width: '12%'}}>From: {e.workingTimes.Tuesday.timeStart}<br/>T To: {e.workingTimes.Tuesday.timeEnd}</td>
                                                    <td style={{width: '12%'}}>From: {e.workingTimes.Wednesday.timeStart}<br/>T To: {e.workingTimes.Wednesday.timeEnd}</td>
                                                    <td style={{width: '12%'}}>From: {e.workingTimes.Thursday.timeStart}<br/>T To: {e.workingTimes.Thursday.timeEnd}</td>
                                                    <td style={{width: '12%'}}>From: {e.workingTimes.Friday.timeStart}<br/>T To: {e.workingTimes.Friday.timeEnd}</td>
                                                    <td style={{width: '12%'}}>From: {e.workingTimes.Sarturday.timeStart} <br/>TTo: {e.workingTimes.Sarturday.timeEnd}</td>
                                                    <td style={{width: '12%'}}>From: {e.workingTimes.Sunday.timeStart} <br/>TTo: {e.workingTimes.Sunday.timeEnd}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>    
            )
        }) : <h4>&nbsp;- NO PRINCIPAL INFORMATION</h4>
        const renderMerchantProfile = e.merchantId !== undefined ? 
        <div className="container-fluid PendingList">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="Merchant Profile"/>}/>
        <div className="PendingLBody">
            <div className="PDL-Btn col-md-12">
                <h3>ID: {e.merchantId}</h3>
                            <span>
                                <button className="btn btn-green" onClick={this._toggleEdit}>EDIT</button>
                            </span>
                            {this.state.edit !== false ? <div className="POPUP">
                                <div className="POPUP-INNER2" style={{paddingTop: '30px'}}>
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
                                    <button href="#" className="btn btn-red" onClick={this._toggleEdit}>BACK</button>
                                    <button className="btn btn-green" onClick={this._update}>UPDATE</button>
                                </div>
                            </div> : null }
            </div>
            <hr/>
            <NotificationContainer/>
            <div className="content">
                <div className="container">
                <h2>General Information</h2>
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                            <h4>Legal Business Name*</h4>
                            <p>{e.businessName}</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Doing Business As (DBA)*</h4>
                            <p>{e.general.doBusinessName}</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Federal Tax ID*</h4>
                            <p>{e.taxId}</p>
                        </div>
                        <div className="col-md-4">
                            <h4>DBA Business Address*</h4>
                            <p>{e.address + ' ' + e.city + ' ' + e.stateId}</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Phone*</h4>
                            <p>{e.phone}</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Business Phone Number*</h4>
                            <p>{e.phone}</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Contact Email Address*</h4>
                            <p>{e.email}</p>
                        </div>
                        </div>
                <h2>Representative Information</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <h4>Contact Name*</h4>
                            <p>{e.general.firstName + ' ' + e.general.lastName}</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Title/Position*</h4>
                            <p>{e.general.title}</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Contact Phone Number*</h4>
                            <p>{e.general.phoneContact}</p>
                        </div>
                    </div>
                <h2>Business Information</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Have You Ever Accepted Credit/Debit Cards Before?</h4>
                                <Checkbox checked/>No <Checkbox/> Yes
                                <h5>Processor: ?</h5>
                        </div>
                        <div className="col-md-6">
                            <h4>Has a Processor Ever Terminated Your Merchant Account?</h4>
                                <Checkbox />No <Checkbox checked/> Yes
                                <h5>Processor: ?</h5>
                        </div>
                        <div className="col-md-6">
                            <h4>Has Merchant or any associated principal and/or owners disclosed below filed bankruptcy 
                                or been subject to any involuntary bankruptcy?
                            </h4>
                                <Checkbox />No <Checkbox checked/> Yes
                                <h5>Date: ?</h5>
                        </div>
                        <div className="col-md-6">
                            <h4>Has a Merchant been previously identified by Visa/Mastercard Risk Programs?</h4>
                                <Checkbox checked/>No <Checkbox/> Yes
                                <h5>When And Why: ?</h5>
                        </div>
                        <div className="col-md-6">
                            <h4>Will Product(s) or Service(s) Be Sold Outside of the U.S?</h4>
                                <Checkbox checked/>No <Checkbox/> Yes
                        </div>
                    </div>
                    <h2>Bank Information</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <h4>Bank Name*</h4>
                                <p>{e.businessBank.name}</p>
                            </div>
                            <div className="col-md-4">
                                <h4>ABA Routing Number*</h4>
                                <p>{e.businessBank.routingNumber}</p>
                            </div>
                            <div className="col-md-4">
                                <h4>Checking Account Number (DDA)*</h4>
                                <p>{e.businessBank.accountNumber}</p>
                            </div>
                            <div className="col-md-4">
                                <h4>Void Check*</h4>
                                <img src={require("../../../../assets/images/voidcheck.png")} alt="void check"/>
                            </div>
                        </div>
                    <h2>Principal Information</h2>
                      {e.principals !== null ? 
                          <div className="row">
                          <div className="col-md-4">
                              <h4>Name*</h4>
                              <p>{e.principals.firstName + ' ' + e.principals.lastName}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Title/Position*</h4>
                              <p>{e.principals.title}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Ownership(%)*</h4>
                              <p>{e.principals.ownerShip}%</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Home Phone*</h4>
                              <p>{e.principals.homePhone}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Mobile Phone*</h4>
                              <p>{e.principals.mobilePhone}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Address*</h4>
                              <p>{e.principals.address}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Years at This Address*</h4>
                              <p>{e.principals.yearAddress}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Social Security Number (SSN)*</h4>
                              <p>{e.principals.ssn}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Date of Birth (mm/dd/yy)*</h4>
                              <p>{e.principals.birthDate}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Email Address*</h4>
                              <p></p>
                          </div>
                          <div className="col-md-4">
                              <h4>Driver License Number*</h4>
                              <p>{e.principals.driverNumber}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>State Issued*</h4>
                              <p>{e.principals.stateId}</p>
                          </div>
                          <div className="col-md-4">
                              <h4>Driver License Picture</h4>
                              <img src={require("../../../../assets/images/driverlicense.jpg")} alt="void check"/>
                          </div>
                      </div> : <h4>&nbsp;- NO PRINCIPAL INFORMATION</h4>
                      }
                      <h2>Staff Information</h2>
                    {e.staffs.length > 1 ? renderStaff : <h4>&nbsp;- NO STAFF INFORMATION</h4>}


                </div>   
            </div>
        </div>
</div> : <Redirect to="/app/merchants/list" />
        return ( 
            renderMerchantProfile
        )
}
}
const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants,
    InfoUser_Login: state.User,
})

export default withRouter(connect(mapStateToProps)(merchantProfile));