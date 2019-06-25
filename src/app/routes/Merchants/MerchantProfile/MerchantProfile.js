import React, { Component } from 'react';
import { connect } from 'react-redux'
import "bootstrap/js/src/collapse.js";
import { withRouter } from 'react-router-dom';
import "./MerchantProfile.css"


class merchantProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const Merchant = this.props.MerchantProfile
        const MerchantStaff = this.props.MerchantProfile.staffs.map((e) => {
          return (
            <div className="MerStaffList" key={e.staffId}>
                <h2>Info</h2>
                <h3>Name: {e.firstName + ' ' + e.lastName}</h3>
                <h3>ID: {e.staffId}</h3>
                <h3>Display Name: {e.displayName}</h3>
                <h3>Email: {e.email}</h3>
                <h3>Phone: {e.phone}</h3>
                <h3>Driver License: {e.driverLicense}</h3>
                <h3>SSN: {e.ssn}</h3>
                <h3>Role: {e.roles.name}</h3>
                <h2>Salaries</h2>
                <h3>- Per Hours: ${e.salaries.perHour.value}</h3>
                <h3>- Commission: {e.salaries.commission.value}</h3>
                <h3>- Tips(%) : {e.tipFees.percent.value}</h3>
                <h2>Work Schedule</h2>
                <h3>- Monday: From {e.workingTimes.Monday.timeStart} To {e.workingTimes.Monday.timeEnd}</h3>
                <h3>- Tuesday: From {e.workingTimes.Tuesday.timeStart} To {e.workingTimes.Tuesday.timeEnd}</h3>
                <h3>- Wednesday: From {e.workingTimes.Wednesday.timeStart} To {e.workingTimes.Wednesday.timeEnd}</h3>
                <h3>- Thursday: From {e.workingTimes.Thursday.timeStart} To {e.workingTimes.Thursday.timeEnd}</h3>
                <h3>- Friday: From {e.workingTimes.Friday.timeStart} To {e.workingTimes.Friday.timeEnd}</h3>
                <h3>- Sarturday: From {e.workingTimes.Sarturday.timeStart} To {e.workingTimes.Sarturday.timeEnd}</h3>
                <h3>- Sunday: From {e.workingTimes.Sunday.timeStart} To {e.workingTimes.Sunday.timeEnd}</h3>
            </div>
          )
        })
        return ( 
            <div className="container MerList MerProfile">
                <div className="row">
                    <div className="col-md-4">
                        <h3> Account Number: {Merchant.accountNumber}</h3>
                        <h3> Address: {Merchant.address}</h3>
                        <h3> Business Name: {Merchant.businessName}</h3>
                        <h3> City: {Merchant.city}</h3>
                        <h3> Email: {Merchant.email}</h3>
                        <h3> Phone: {Merchant.phone}</h3>
                        <h3> Tax ID: {Merchant.taxId}</h3>
                    </div>
                    <div className="col-md-8">
                    <p>
          <a className="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Staff</a>
          <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Principals</button>
          </p>
          <div className="row">
            <div className="col">
              <div className="collapse multi-collapse" id="multiCollapseExample1">
                <div className="card card-body">
                    {this.props.MerchantProfile.staffs.length === 0 ? "This Merchant Doesn't Have Any Staff Members" : MerchantStaff}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="collapse multi-collapse" id="multiCollapseExample2">
              <div className="card card-body">
                      {Merchant.principals != null ? 
                      <div>
                      <h3>Name: {Merchant.principals.firstName + Merchant.principals.lastName}</h3>
                      <h3>Birthday: {Merchant.principals.birthDate}</h3>
                      <h3>Address: {Merchant.principals.address}</h3>
                      <h3>City: {Merchant.principals.city}</h3>
                      <h3>Driver Number:{Merchant.principals.driverNumber}</h3>
                      <h3>Cellphone Number: {Merchant.principals.mobilePhone}</h3>
                      <h3>Home Number: {Merchant.principals.homePhone}</h3>
                      <h3>Title: {Merchant.principals.title}</h3>
                      <h3>SSN: {Merchant.principals.ssn}</h3>
                      </div> : "Something something try again later!"}
                      </div>
              </div>
            </div>
            </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants
})

export default withRouter(connect(mapStateToProps)(merchantProfile));