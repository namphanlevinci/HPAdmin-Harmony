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
import { Formik, Form, Field, ErrorMessage } from 'formik';

class MerchantReqProfile extends Component {
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
        const e = this.props.PendingProfile
        //render question
        const renderQuestion = e.business !== undefined ? e.business.map((e) => {
            return (
                <div className="col-md-6" key={e.businessId}>
                <h4>{e.question}</h4>
                    <Checkbox checked={e.answer === false}/>No <Checkbox checked={e.answer === true}/> Yes
                <h5>Answer: {e.answerReply} </h5>
            </div>
            ) }) : <h4>&nbsp;- NO BUSINESS INFORMATION</h4>
        //render profile
        const renderPendingProfile = e.merchantId !== undefined ? 
            <div className="container-fluid PendingList">
                    <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.pendingList"/>}/>
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
                                    <Formik
                                        initialValues={{ merchantID: '', merchantToken: '' }}
                                        validate={values => {
                                            let errors = {};
                                            if (!values.merchantID) {
                                            errors.merchantID = 'Required';
                                            } else if (!values.merchantToken) {
                                            errors.merchantToken = 'Required Too';
                                            }
                                            return errors;
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setTimeout(() => {
                                                
                                                this.props.history.push('/app/merchants/accepted-list')
                                                const ID = this.props.PendingProfile.merchantId
                                                const merchantCode = values.merchantID
                                                const merchantToken = values.merchantToken
                                                axios.put('https://api2.levincidemo.com/api/merchant/approve/' + ID, {merchantCode,  merchantToken}, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
                                                .then((res) => {
                                                    // console.log(res)
                                                }).catch((err) => {
                                                    console.log(err)
                                                })
                                                setSubmitting(false);
                                                }, 400);
                                        }}
                                        >
                                        {({ lol }) => (
                                            <Form style={{textAlign: 'center'}}>
                                            <label>MERCHANT ID:</label>
                                            <Field type="text" name="merchantID" />
                                            <ErrorMessage name="merchantID" component="div" />
                                            <label>MERCHANT TOKEN:</label>
                                            <Field type="text" name="merchantToken" />
                                            <ErrorMessage name="merchantToken" component="div" />
                                            <div style={{textAlign: 'center', paddingTop: '10px'}}>
                                            <button type='submit' className="btn btn-red" onClick={this._togglePopupAccept}>NO</button>
                                            <button type='submit' className="btn btn-green">YES</button>
                                            </div>
                                            </Form>
                                        )}
                                        </Formik>
                                </div>
                            </div> : null }
                            {/* POP UP REJECT */}
                            {this.state.showPopupReject !== false ? <div className="POPUP">
                                <div className="POPUP-INNER" style={{paddingTop: '30px'}}>
                                <Formik
                                        initialValues={{ rejectReason: ''}}
                                        validate={values => {
                                            let errors = {};
                                            if (!values.rejectReason) {
                                            errors.rejectReason = 'Required';
                                            }
                                            return errors;
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setTimeout(() => {
                                            setSubmitting(false);
                                            const reason = values.rejectReason
                                            this.props.history.push('/app/merchants/requests')
                                            const ID = this.props.PendingProfile.merchantId
                                            axios.put('https://api2.levincidemo.com/api/merchant/reject/' + ID,  {reason} , { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
                                            .then((res) => {
                                                // console.log(res)
                                            }).catch((err) => {
                                                console.log(err)
                                            })
                                            }, 200);
                                        }}
                                        >
                                        {({ values, _handleChange, isSubmitting }) => (
                                            <div>
                                            <h2>WHY?</h2>
                                            <Form>
                                            <Field type="textarea" name="rejectReason" component="textarea"  style={{width: '350px', height: '100px'}} placeholder="Please enter your reason."/>
                                            <ErrorMessage name="rejectReason" component="div" />
                                            <div>
                                                <button type="submit" className="btn btn-red" onClick={this._togglePopupReject}>BACK</button>
                                                <button type="submit" className="btn btn-green">COMFIRM</button>
                                            </div>
                                            </Form>
                                            </div>
                                        )}
                                        </Formik>
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
                                            <p>{e.businessBank !== null ? e.businessBank.name : null}</p>
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
                                            <p>{e.principals !== null ? e.principals.firstName + ' ' + e.principals.lastName : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Title/Position*</h4>
                                            <p>{e.principals !== null ? e.principals.title : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Ownership(%)*</h4>
                                            <p>{e.principals !== null ? e.principals.ownerShip : null}%</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Home Phone*</h4>
                                            <p>{e.principals !== null ? e.principals.homePhone : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Mobile Phone*</h4>
                                            <p>{e.principals !== null ? e.principals.mobilePhone : null}</p>
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
                                            <p>{e.principals !== null ? e.principals.ssn : null }</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Date of Birth (mm/dd/yy)*</h4>
                                            <p>{e.principals !== null ? e.principals.birthDate : null}</p>
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