import React, { Component } from 'react';
import { connect } from 'react-redux'
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "./MerchantReqProfile.css"
import "./MerchantsRequest.css"
import { Checkbox } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { MERCHANT_APPROVAL, MERCHANT_REJECT} from '../../../../actions/merchants/actions';
import {
    getAll_Merchants
  } from "../../../../actions/merchants/actions";
import {
    NotificationContainer,
    NotificationManager
  } from "react-notifications";
//POPUP
import Popup from "reactjs-popup";

class MerchantReqProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpenAccept: false,
            isOpenReject: false,
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

        handleOpenAccept = () => {
            this.setState({ isOpenAccept: true });
        }
    
        handleCloseAccept = () => {
            this.setState({ isOpenAccept: false });
        }
        handleOpenReject = () => {
            this.setState({ isOpenReject: true });
        }
    
        handleCloseReject = () => {
            this.setState({ isOpenReject: false });
        }
      componentWillReceiveProps(nextProps) {
          if (nextProps.ApprovalStatus !== this.props.ApprovalStatus) {
            this.props.getAll_Merchants()
            if (nextProps.ApprovalStatus.message  === "Merchant code is exist!") {
                NotificationManager.error("MERCHANT CODE IS ALREADY EXIST!")
            } else {
                this.setState({showPopupAccept: false})
                NotificationManager.success('SUCCESS');
                setTimeout(() => {
                    this.props.history.push('/app/merchants/pending-request')
                }, 1000)
            }
          }
          if (nextProps.RejectStatus !== this.props.RejectStatus) {
            this.props.getAll_Merchants()
            this.setState({showPopupReject: false})
            NotificationManager.success('SUCCESS');
            setTimeout(() => {
                this.props.history.push('/app/merchants/pending-request')
            }, 1000)
          }
      }
    render() { 
        const e = this.props.PendingProfile
        // console.log('EEEEEEEEEEEEEEEEEE', e)
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
                    <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.requestDetail"/>}/>
                    <div className="PendingLBody">
                        <div className="PDL-Btn col-md-12">
                            <h3>{'HP-' + e.merchantId}</h3>
                            <span>
                                    {/* REJECT BTN */}
                                    <Popup
                                        trigger={<Button className="btn btn-red">REJECT</Button>}
                                        modal
                                        on='click'
                                        open={this.state.isOpenReject}
                                        onOpen={this.handleOpenReject}
                                        closeOnDocumentClick
                                    >
                                        <span> <Formik
                                        initialValues={{ rejectReason: ''}}
                                        validate={values => {
                                            let errors = {};
                                            if (!values.rejectReason) {
                                            errors.rejectReason = 'Required';
                                            }
                                            return errors;
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            const reason = values.rejectReason
                                            const ID = this.props.PendingProfile.merchantId
                                            const data = { reason, ID}
                                            this.props.sendReject(data)
                                        }}
                                        >
                                        {({ values, _handleChange, isSubmitting }) => (
                                            <div className="rejectInput">
                                            <h2 className="title">REASONS FOR REJECTION</h2>
                                            <Form>
                                            <Field type="textarea" name="rejectReason" component="textarea" placeholder="Please enter your reason."/>
                                            <ErrorMessage name="rejectReason" component="div" />
                                            <div>
                                                <Button type="submit" className="btn btn-red" onClick={this.handleCloseReject}>BACK</Button>
                                                <Button type="submit" className="btn btn-green">COMFIRM</Button>
                                            </div>
                                            </Form>
                                            </div>
                                        )}
                                        </Formik></span>
                                    </Popup>
                                    {/* ACCEPT BTN */}
                                    <Popup
                                        trigger={<Button className="btn btn-green"> ACCEPT </Button>}
                                        modal
                                        on='click'
                                        open={this.state.isOpenAccept}
                                        onOpen={this.handleOpenAccept}
                                        closeOnDocumentClick
                                    >
                                        <span> <h2 className="title">ARE YOU SURE YOU WANT TO ACCEPT THIS MERCHANT?</h2><Formik
                                        initialValues={{ merchantID: '', merchantToken: '', fee: '' }}
                                        validate={values => {
                                            let errors = {};
                                            if (!values.merchantID) {
                                            errors.merchantID = 'Required';
                                            } else if (!values.merchantToken) {
                                            errors.merchantToken = 'Required';
                                            } else if (!values.fee) {
                                                errors.fee = 'Required';
                                            }
                                            return errors;
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            const ID = this.props.PendingProfile.merchantId
                                                const merchantCode = values.merchantID
                                                const merchantToken = values.merchantToken
                                                const transactionsFee = values.fee
                                                const data = { transactionsFee, merchantToken, merchantCode, ID}
                                                this.props.sendApproval(data)
                                        }}
                                        >
                                        {({ lol }) => (
                                            <Form style={{textAlign: 'center'}}>
                                                    <div>
                                                        <label>MERCHANT CODE:</label>
                                                        <Field type="text" name="merchantID" />
                                                        <ErrorMessage name="merchantID" component="div" />
                                                    </div>
                                                    <div>
                                                        <label>MERCHANT TOKEN:</label>
                                                        <Field type="text" name="merchantToken" />
                                                        <ErrorMessage name="merchantToken" component="div" />
                                                    </div>
                                                    <div>
                                                        <label>TRANSACTION FEE:</label>
                                                        <Field type="text" name="fee" />
                                                        <ErrorMessage name="fee" component="div" />
                                                    </div>
                                                <br/>
                                                <div style={{textAlign: 'center', paddingTop: '10px'}}>
                                                    <Button type='submit' className="btn btn-red" onClick={this.handleCloseAccept}>NO</Button>
                                                    <Button type='submit' className="btn btn-green">YES</Button>
                                                </div>
                                            </Form>
                                        )}
                                        </Formik></span>
                                </Popup>
                            </span>
                        </div>
                        <hr/>
                        <div className="content react-transition swipe-right">
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
                                            <p>{e.businessBank !== null ? e.businessBank.routingNumber : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Checking Account Number (DDA)*</h4>
                                            <p>{e.businessBank !== null ? e.businessBank.accountNumber : null}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>Void Check*</h4>
                                            {e.businessBank !== null ? <img style={{width: '250px', height: '200px'}} src={`${e.businessBank.imageUrl}`} alt="void check" /> : null}
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
                                            {e.principals !== null ? <img style={{width: '250px', height: '200px'}}  src={`${e.principals.imageUrl}`} alt="void check" /> : null}
                                        </div>
                                    </div>
                            </div>   
                        </div>
                        <NotificationContainer/>
                    </div>
            </div> : <Redirect to="/app/merchants/pending-request" />
        return ( 
           renderPendingProfile
         );
    }
}

const mapStateToProps = (state) => ({
    PendingProfile: state.ViewMerchant_Request,
    InfoUser_Login: state.User,
    ApprovalStatus: state.Approval,
    RejectStatus: state.Reject
})
const mapDispatchToProps = dispatch => {
    return {
        sendApproval: payload => {
            dispatch(MERCHANT_APPROVAL(payload))
        },
        getAll_Merchants: payload => {
            dispatch(getAll_Merchants())
        },
        sendReject: payload => {
            dispatch(MERCHANT_REJECT(payload))
        }

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MerchantReqProfile));