import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../MerchantProfile.css'
import '../../MerchantsRequest/MerchantReqProfile.css'
import '../../MerchantsRequest/MerchantsRequest.css'
import moment from 'moment';
class Principal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const e = this.props.MerchantProfile
        const renderPrincipal = e.principals !== null ? 
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
                <p>{moment(e.principals.birthDate).format('MM/DD/YYYY')}</p>
            </div>
            <div className="col-md-4">
                <h4>Email Address*</h4>
                <p>{e.general !== null ? e.general.emailContact : null}</p>
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
                {/* <img src={require("../../../../../assets/images/driverlicense.jpg")} alt="void check"/> */}
                <img className="bankVoid" src={`${e.principals.imageUrl}`} alt="driver license" />
            </div>
        </div> : <h4>&nbsp;- NO PRINCIPAL INFORMATION</h4>
        return ( 
            <div>
                <h2>Principal Information</h2>
                {renderPrincipal}
            </div>
         );
    }
}

const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants,
    InfoUser_Login: state.User,
})

export default (connect(mapStateToProps)(Principal));
