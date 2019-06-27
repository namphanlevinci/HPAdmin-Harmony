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
class merchantProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const e = this.props.MerchantProfile
        console.log("YEET", e)
        const renderMerchantProfile = e.merchantId !== undefined ? 
        <div className="container-fluid PendingList">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="Merchant Profile"/>}/>
        <div className="PendingLBody">
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
                      </div> : <h4>&nbsp;- NO PRINCIPAL INFORMATION</h4>
                      }
                      <h2>Staff Information</h2>
                      {e.staffs.length > 1 ? <div></div> : <h4>&nbsp; - NO STAFF INFORMATION</h4>}


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
    MerchantProfile: state.ViewProfile_Merchants
})

export default withRouter(connect(mapStateToProps)(merchantProfile));