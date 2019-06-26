import React, { Component } from 'react';
import "./MerchantsRequest.css"
import { getAll_Merchant_Requests } from '../../../../actions/merchant-requests/actions'
import {connect} from 'react-redux';
import axios from "axios"

class MerchantsRequest extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    componentWillMount() {
        this.props.getAll_Merchant_Requests();
      }
    _approve = async (e) => {
        const ID = e.merchantId
      await  axios.put('http://api2.levincidemo.com/api/merchant/approve/' + ID, null, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            // console.log(res)
        }).catch((err) => {
            console.log(err)
        })
      await  this.props.getAll_Merchant_Requests();
    }
    _reject = async (e) => {
        const ID = e.merchantId
       await  axios.put('http://api2.levincidemo.com/api/merchant/reject/' + ID, null, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            // console.log(res)
        }).catch((err) => {
            console.log(err)
        })
       await this.props.getAll_Merchant_Requests();
    }
    render() { 
        const ReqList = this.props.MerchantRequests_List
        const renderReqList = ReqList.map((e) => {
            return (
                <div key={e.merchantId} className="ReqContainer">
                    <p>MERCHANT ID: {e.merchantId}</p>
                    <h4><span>Business Name: {e.businessName}</span>
                    <a href='#' className="btn btn-green" onClick={() => this._approve(e)}>ACCEPT</a>
                    <a href='#' className="btn btn-red" onClick={() => this._reject(e)}>REJECT</a></h4>
                </div>
            )
        })
        return ( 
            <div className="container MReq">
                {renderReqList}
            </div>
         );
    }
}
 



const mapStateToProps = (state) => ({
    InfoUser_Login: state.User,
    MerchantRequests_List : state.MerchantRequests_List
  });
  const mapDispatchToProps = (dispatch) => ({
    getAll_Merchant_Requests: () => {
      dispatch(getAll_Merchant_Requests())
    }
  });
  export default connect(mapStateToProps,mapDispatchToProps)(MerchantsRequest);