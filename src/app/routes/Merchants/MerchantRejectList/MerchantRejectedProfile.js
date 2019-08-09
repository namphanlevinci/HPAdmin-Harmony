import React, { Component } from 'react';
import { connect } from 'react-redux'
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "../MerchantsRequest/MerchantReqProfile.css"
import "../MerchantsRequest/MerchantsRequest.css"
import { Checkbox } from '@material-ui/core';
import moment from 'moment';
import Button from '@material-ui/core/Button';

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
    _handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                [name]: value
            })
    }
    _goBack = () => {
        this.props.history.push('/app/merchants/rejected-request')
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
        const e = this.props.RejectedProfile
        //!! render questions
        const renderQuestion = e.business !== undefined ? e.business.map((e) => {
            return (
                <div className="col-md-6" key={e.businessId}>
                <h4>{e.question}</h4>
                    <Checkbox checked={e.answer === false}/>No <Checkbox checked={e.answer === true}/> Yes
                <h5>Answer: {e.answerReply} </h5>
            </div>
            ) }) : <h4>&nbsp;- NO BUSINESS INFORMATION</h4>
        //!! render rejected list
        const renderPendingProfile = e.merchantId !== undefined ? 
            <div className="container-fluid PendingList react-transition swipe-right">
                    <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.requestDetail"/>}/>
                    <div className="PendingLBody">
                        <div className="PDL-Btn col-md-12">
                            <h3>ID: {e.merchantId}</h3>
                            <span>
                                <Button style={{color: '#3f51b5', backgroundColor: 'white'}} className="btn btn-green" onClick={this._goBack}>BACK</Button>
                            </span>
                        </div>
                        <hr/>
                            <div className="container requestStatus">
                                <div className="title" style={{color: 'white'}}>REJECTED</div>
                                <h4>By {e.adminUser.first_name + ' ' + e.adminUser.last_name}</h4>
                                <h4>Date/Time: {moment(e.adminUser.created_date).format('HH:mm A - DD/MM/YYYY')}</h4>
                                <h4 style={{fontWeight: 600}}>Reason:</h4>
                                <p>{e.reason}</p>
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
                                        <p>{e.general !== null ? e.general.doBusinessName : null}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>Federal Tax ID*</h4>
                                        <p>{e.taxId}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>DBA Business Address*</h4>
                                        <p>{e.general !== null ? e.general.address : null}</p>
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
                            <h2>Business Information</h2>
                                <div className="row">
                                    {renderQuestion}
                                </div>
                                <h2>Bank Information</h2>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h4>Bank Name*</h4>
                                            <p>{e.businessBank !== null ? e.businessBank.name : null }</p>
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
                                            {e.businessBank !== null ? <img style={{width: '300px'}} src={`${e.businessBank.imageUrl}`} alt="void check" /> : null}
                                        </div>
                                    </div>
                                <h2>Principal Information</h2>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h4>Name*</h4>
                                            <p>{e.principals !== null ? e.principals.firstName + ' ' + e.principals.lastName : null }</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Title/Position*</h4>
                                            <p>{e.principals !== null ? e.principals.title : null }</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Ownership(%)*</h4>
                                            <p>{e.principals !== null ? e.principals.ownerShip : null }%</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Home Phone*</h4>
                                            <p>{e.principals !== null ? e.principals.homePhone : null }</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Mobile Phone*</h4>
                                            <p>{e.principals !== null ? e.principals.mobilePhone : null }</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Address*</h4>
                                            <p>{e.principals !== null ? e.principals.address : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Years at This Address*</h4>
                                            <p>{e.principals !== null ? e.principals.yearAddress : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Social Security Number (SSN)*</h4>
                                            <p>{e.principals !== null ? e.principals.ssn : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Date of Birth (mm/dd/yy)*</h4>
                                            <p>{e.principals !== null ? moment(e.principals.birthDate).format('MM/DD/YYYY') : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Email Address*</h4>
                                            <p>{e.general !== null ? e.general.emailContact : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Driver License Number*</h4>
                                            <p>{e.principals !== null ? e.principals.driverNumber : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>State Issued*</h4>
                                            <p>{e.principals !== null ? e.principals.stateId : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Driver License Picture</h4>
                                            {e.principals !== null ? <img style={{width: '300px'}} src={`${e.principals.imageUrl}`} alt="void check"/> : null }
                                        </div>
                                    </div>
                            </div>   
                        </div>
                    </div>
            </div> : <Redirect to="/app/merchants/rejected-request" />
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