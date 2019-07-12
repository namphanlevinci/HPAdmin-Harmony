import React, { Component } from 'react';
import { connect } from 'react-redux'
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "../MerchantsRequest/MerchantReqProfile.css"
import "../MerchantsRequest/MerchantsRequest.css"
import { Checkbox } from '@material-ui/core';
import axios from "axios";
class MerchantRejectedProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showPopupAccept: false,
            showPopupReject: false,
            merchantID: '',
            merchantToken: '',
            rejectReason: ''
         }
    }
    _handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                [name]: value
            })
    }
    // _approve = async () => {
    //     const ID = this.props.PendingProfile.merchantId
    //     const merchantCode = this.state.merchantID
    //     const merchantToken = this.state.merchantToken
    //   await  axios.put('https://api2.levincidemo.com/api/merchant/approve/' + ID, {merchantCode,  merchantToken}, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
    //     .then((res) => {
    //         // console.log(res)
    //         this.props.history.push('/app/merchants/requests')
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }
    // _reject = async () => {
    //     const ID = this.props.PendingProfile.merchantId
    //     const reason = this.state.rejectReason
    //     await  axios.put('https://api2.levincidemo.com/api/merchant/reject/' + ID,  {reason} , { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
    //     .then((res) => {
    //         // console.log(res)
    //         this.props.history.push('/app/merchants/requests')
    //     }).catch((err) => {
    //         console.log(err)
    //     })
        
    // }
    _handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                [name]: value
            })
    }
    _togglePopupAccept = () => {
        this.setState({
            showPopupAccept: !this.state.showPopupAccept
        });
      }
      _togglePopupReject = () => {
        this.setState({
            showPopupReject: !this.state.showPopupReject
        });
      }
    render() { 
        // console.log("HAHA", this.props.PendingProfile)
        const e = this.props.RejectedProfile
        // console.log("DATA", this.props.RejectedProfile)
        const renderPendingProfile = e.merchantId !== undefined ? 
            <div className="container-fluid PendingList">
                    <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.pendingList"/>}/>
                    <div className="PendingLBody">
                        <div className="PDL-Btn col-md-12">
                            <h3>ID: {e.merchantId}</h3>
                            <h3>Rejected Reason: {e.reason}</h3>
                            {/* <span> */}
                                {/* <button href="#" className="btn btn-red" onClick={this._togglePopupReject}>REJECT</button>
                                <button className="btn btn-green" onClick={this._togglePopupAccept}>ACCEPT</button> */}
                            {/* </span> */}
                            
                            {/* POP UP ACCEPT */}
                            {/* {this.state.showPopupAccept !== false ? <div className="POPUP">
                                <div className="POPUP-INNER">
                                    <h2>ARE YOU SURE YOU WANT TO ACCEPT THIS MERCHANT?</h2>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><label>MERCHANT ID:</label></td>
                                                    <td><input name="merchantID" value={this.state.merchantID} onChange={this._handleChange}></input></td> 
                                                </tr>
                                                <tr>
                                                    <td><label>MERCHANT TOKEN:</label></td>
                                                    <td><input name="merchantToken" value={this.state.merchantToken} onChange={this._handleChange}></input></td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br/>
                                    <button className="btn btn-red" onClick={this._togglePopupAccept}>NO</button>
                                    <button className="btn btn-green" onClick={() => this._approve()}>YES</button>
                                </div>
                            </div> : null } */}
                            {/* POP UP REJECT */}
                            {/* {this.state.showPopupReject !== false ? <div className="POPUP">
                                <div className="POPUP-INNER" style={{paddingTop: '30px'}}>
                                    <h2>WHY?</h2>
                                    <form>
                                        <input name="rejectReason" value={this.state.rejectReason} onChange={this._handleChange}  style={{width: '350px', height: '100px'}} placeholder="Please enter your reason." required />
                                    </form>
                                    <button href="#" className="btn btn-red" onClick={this._togglePopupReject}>BACK</button>
                                    <button className="btn btn-green" onClick={() => this._reject()}>COMFIRM</button>
                                </div>
                            </div> : null } */}
                        </div>
                        <hr/>
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
                                        <p></p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Federal Tax ID*</h4>
                                        <p>{e.taxId}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>DBA Business Address*</h4>
                                        <p></p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Zip Code*</h4>
                                        <p>{e.zip}</p>
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
                                        <p></p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Title/Position*</h4>
                                        <p></p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Contact Phone Number*</h4>
                                        <p></p>
                                    </div>
                                </div>
                            <h2>Business Information</h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>Have You Ever Accepted Credit/Debit Cards Before?</h4>
                                            <Checkbox />No <Checkbox/> Yes
                                            <h5>Processor: ?</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Has a Processor Ever Terminated Your Merchant Account?</h4>
                                            <Checkbox />No <Checkbox/> Yes
                                            <h5>Processor: ?</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Has Merchant or any associated principal and/or owners disclosed below filed bankruptcy 
                                            or been subject to any involuntary bankruptcy?
                                        </h4>
                                            <Checkbox />No <Checkbox/> Yes
                                            <h5>Date: ?</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Has a Merchant been previously identified by Visa/Mastercard Risk Programs?</h4>
                                            <Checkbox />No <Checkbox/> Yes
                                            <h5>When And Why: ?</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Will Product(s) or Service(s) Be Sold Outside of the U.S?</h4>
                                            <Checkbox />No <Checkbox/> Yes
                                    </div>
                                </div>
                                <h2>Bank Information</h2>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h4>Bank Name*</h4>
                                            <p>{e.bankName}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>ABA Routing Number*</h4>
                                            <p>{e.routingNumber}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Checking Account Number (DDA)*</h4>
                                            <p>{e.accountNumber}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Void Check*</h4>
                                            <img src={require("../../../../assets/images/voidcheck.png")} alt="void check"/>
                                        </div>
                                    </div>
                                <h2>Principal Information</h2>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h4>Name*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Title/Position*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Ownership(%)*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Home Phone*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Mobile Phone*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Address*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Years at This Address*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Social Security Number (SSN)*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Date of Birth (mm/dd/yy)*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Email Address*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Driver License Number*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>State Issued*</h4>
                                            <p></p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Driver License Picture</h4>
                                            <img src={require("../../../../assets/images/driverlicense.jpg")} alt="void check"/>
                                        </div>
                                    </div>
                            </div>   
                        </div>
                    </div>
            </div> : <Redirect to="/app/merchants/rejected-list" />
        return ( 
           renderPendingProfile
         );
    }
}

const mapStateToProps = (state) => ({
    RejectedProfile: state.ViewProfile_Rejected,
    InfoUser_Login: state.User,
})

export default withRouter(connect(mapStateToProps)(MerchantRejectedProfile));