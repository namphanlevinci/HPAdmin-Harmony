import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Consumer.css"
import '../../../Merchants/MerchantProfile/MerchantProfile.css'
import '../../../Merchants/MerchantsRequest/MerchantReqProfile.css'
import '../../../Merchants/MerchantsRequest/MerchantsRequest.css'
import {NotificationContainer} from 'react-notifications';
import Button from '@material-ui/core/Button';
import DayPicker, { DateUtils } from 'react-day-picker';
import "react-day-picker/lib/style.css";
import axios from 'axios'
import moment from 'moment';
import "../../../Accounts/Logs/Logs.css"
class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         }
    }

    componentDidMount() {
        const ID = this.props.MerchantProfile.userId
        axios.get('https://api2.levincidemo.com/api/paymenttransaction/' + ID, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            this.setState({ data: res.data.data })
        }).catch((error) => {
            console.log(error)
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

    getInitialState = () => {
        return {
          from: undefined,
          to: undefined,
        };
      }
      handleResetClick = () => {
        this.setState(this.getInitialState());
      }
      handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
      }
    render() { 
        const { from , to} = this.state;
        const modifiers = { start: from, end: to}
        const valuez = { start: this.state.from, end: this.state.to}
        let renderTable = this.state.data
        if (this.state.from) {
            renderTable = renderTable.filter((datez) => {
                let date = moment(datez.createdDate).subtract(10, 'days').calendar();
                let from = moment(valuez.start).subtract(10, 'days').calendar();
                let to = moment(valuez.end).subtract(10, 'days').calendar();
                
                const date2 = new Date(date)
                const from2 = new Date(from)
                const to2 = new Date(to)
                return (date2 >= from2 && date2 <= to2)
            })
        }
        const renderContent = renderTable.map(e => {
            return (
                <tr key={e.userId}>
                    <td>{moment(e.createDate).format('MM/DD/YYYY')}</td>
                    <td>{e.paymentTransactionId}</td>
                    <td>{e.paymentData.transaction_type}</td>
                    <td>{e.paymentData.method}</td>
                    <td>{e.paymentData.token.token_data.type}</td>
                    <td>{'$' + e.paymentData.amount}</td>
                    <td>{e.paymentData.validation_status}</td>
                </tr>
            )
        })
        const renderTransaction = 
        <div>
        <div className="container">
        <h2>Transactions Management</h2>
        <div className="row">
                    <h3>
                        <Button style={{padding: '10px 20px', color: '#3f51b5', backgroundColor: '#fff', fontWeight: '600'}} variant="contained" color="primary" data-toggle="collapse" data-target="#demo">FILTER</Button>
                            <div id="demo" className="collapse">
                             <Button className="resetBtn" onClick={this.handleResetClick}>Reset</Button>
                            <span><DayPicker
                                className="Selectable"
                                numberOfMonths={1}
                                selectedDays={[from, { from, to }]}
                                value={valuez}
                                modifiers={modifiers}
                                onDayClick={this.handleDayClick}
                                /></span>
                            </div>
                         </h3>
        </div>
            <div className="TransactionTable">
            <h2>Summary Data</h2>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Date/time</th>
                                    <th>Transaction ID</th>
                                    <th>Activity</th>
                                    <th>Payment method</th>
                                    <th>Card type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {renderContent}
                            </tbody>
                        </table>
            </div>
        
        </div>
        </div>
        return ( 
            <div className="content GeneralContent">
                    {renderTransaction}
                    <NotificationContainer />
            </div>
         );
    }
}

const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants,
    InfoUser_Login: state.User,
})

export default (connect(mapStateToProps)(Transactions));