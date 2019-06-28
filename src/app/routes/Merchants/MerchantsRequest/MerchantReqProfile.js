import React, { Component } from 'react';
import { connect } from 'react-redux'
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "./MerchantReqProfile.css"
import "./MerchantsRequest.css"
import { Checkbox } from '@material-ui/core';
import axios from "axios";
class MerchantReqProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showPopupAccept: false,
            showPopupReject: false
         }
    }

    _approve = async () => {
        const ID = this.props.PendingProfile.merchantId
      await  axios.put('http://api2.levincidemo.com/api/merchant/approve/' + ID, null, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            // console.log(res)
            this.props.history.push('/app/merchants/requests')
        }).catch((err) => {
            console.log(err)
        })
    }
    _reject = async () => {
        const ID = this.props.PendingProfile.merchantId
       await  axios.put('http://api2.levincidemo.com/api/merchant/reject/' + ID, null, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            // console.log(res)
            this.props.history.push('/app/merchants/requests')
        }).catch((err) => {
            console.log(err)
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
        console.log("HAHA", this.props.PendingProfile)
        const e = this.props.PendingProfile
        const renderPendingProfile = e.merchantId !== undefined ? 
            <div className="container-fluid PendingList">
                    <ContainerHeader match={this.props.match} title={<IntlMessages id="Request Details"/>}/>
                    <div className="PendingLBody">
                        <div className="PDL-Btn col-md-12">
                            <h3>HP000001</h3>
                            <span>
                                <button href="#" className="btn btn-red" onClick={this._togglePopupReject}>REJECT</button>
                                <button className="btn btn-green" onClick={this._togglePopupAccept}>ACCEPT</button>
                            </span>
                            
                            {/* POP UP ACCEPT */}
                            {this.state.showPopupAccept !== false ? <div className="POPUP">
                                <div className="POPUP-INNER">
                                    <h2>ARE YOU SURE YOU WANT TO ACCEPT THIS MERCHANT?</h2>
                                    <button href="#" className="btn btn-red" onClick={this._togglePopupAccept}>NO</button>
                                    <button className="btn btn-green" onClick={() => this._approve()}>YES</button>
                                </div>
                            </div> : null }
                            {/* POP UP REJECT */}
                            {this.state.showPopupReject !== false ? <div className="POPUP">
                                <div className="POPUP-INNER" style={{paddingTop: '30px'}}>
                                    <h2>WHY?</h2>
                                    <form>
                                        <textarea  style={{width: '350px', height: '100px'}} placeholder="Please enter your reason."></textarea>
                                    </form>
                                    <button href="#" className="btn btn-red" onClick={this._togglePopupReject}>BACK</button>
                                    <button className="btn btn-green" onClick={() => this._reject()}>COMFIRM</button>
                                </div>
                            </div> : null }
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
                                        <p>Legal Business Name*</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Federal Tax ID*</h4>
                                        <p>{e.taxId}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>DBA Business Address*</h4>
                                        <p>DBA Business Address</p>
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
                                        <p>James M.Smit</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Title/Position*</h4>
                                        <p>Manager</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Contact Phone Number*</h4>
                                        <p>892-123-2921</p>
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
                                            <p>Western Union MTCN</p>
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
                                            <p>David James</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Title/Position*</h4>
                                            <p>Manager</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Ownership(%)*</h4>
                                            <p>51%</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Home Phone*</h4>
                                            <p>None</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Mobile Phone*</h4>
                                            <p>847-212-1221</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Address*</h4>
                                            <p>453 NYC, LL 201221</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Years at This Address*</h4>
                                            <p>5</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Social Security Number (SSN)*</h4>
                                            <p>231-33-1232</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Date of Birth (mm/dd/yy)*</h4>
                                            <p>December 6, 1949</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Email Address*</h4>
                                            <p>Jameswag@gmail.com</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Driver License Number*</h4>
                                            <p>B9282022</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>State Issued*</h4>
                                            <p>California (CA)</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Driver License Picture</h4>
                                            <img src={require("../../../../assets/images/driverlicense.jpg")} alt="void check"/>
                                        </div>
                                    </div>
                            </div>   
                        </div>
                    </div>
            </div> : <Redirect to="/app/merchants/requests" />
        return ( 
           renderPendingProfile
         );
    }
}

const mapStateToProps = (state) => ({
    PendingProfile: state.ViewMerchant_Request,
    InfoUser_Login: state.User,
})

export default withRouter(connect(mapStateToProps)(MerchantReqProfile));