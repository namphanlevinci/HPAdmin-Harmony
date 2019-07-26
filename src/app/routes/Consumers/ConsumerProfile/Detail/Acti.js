import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Consumer.css"
import '../../../Merchants/MerchantProfile/MerchantProfile.css'
import '../../../Merchants/MerchantsRequest/MerchantReqProfile.css'
import '../../../Merchants/MerchantsRequest/MerchantsRequest.css'
import Button from '@material-ui/core/Button';
import DayPicker, { DateUtils } from 'react-day-picker';
import "react-day-picker/lib/style.css";
import moment from 'moment';
import axios from 'axios'
class Acti extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            from: undefined,
            to: undefined,
        }
    }

    componentDidMount() {
        const ID = this.props.MerchantProfile.userId
        axios.get('https://api2.levincidemo.com/api/useractivity/' + ID, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then(res => {
            this.setState({ data: res.data.data })
        }).catch(error => {
            console.log(error)
        })
    }
      handleResetClick = () => {
        this.setState(this.setState({ from: undefined, to: undefined}));
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
            renderTable = renderTable.filter((e) => {
                let datex = moment(e.createDate).format();
                let from = moment(valuez.start).format();
                let to = moment(valuez.end).format();

                const date = moment(datex).isBetween(from, to) || moment(datex).isSame(from, to)
                return date
            })
        }
        let renderContent = renderTable.map(e => {
            return (
                <tr key={e.userActivityId}>
                    <td>{moment(e.createDate).format('DD/MM/YYYY')}</td>
                    <td>{e.action}</td>
                </tr>
            )
        })
        return ( 
            <div className="content GeneralContent">
                <div>
                    <div className="container">
                    <h2>Activities Logs</h2>
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
                            <th style={{width: '20%'}}>Date/time</th>
                            <th>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                            {renderContent}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        </div>
         );
    }
}

const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants,
    InfoUser_Login: state.User,
})

export default (connect(mapStateToProps)(Acti));