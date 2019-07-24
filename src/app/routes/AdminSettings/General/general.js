import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import {connect} from 'react-redux';
import "../Setting.css"
import Axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class General extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            accountSid: '',
            auToken: '',
            phoneSender: '',
            email: '',
            host: '',
            port: '',
            password: '',
            userSmtp: '',
            transactionFee: '',
            creditFree: ''
         }
    }
    async componentDidMount() {
        await Axios.get('https://api2.levincidemo.com/api/adminsetting', { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            const general = res.data.data.general
            const twilio = res.data.data.twilio
            const smtp = res.data.data.smtp
          this.setState({ accountSid : twilio.accountSid, auToken: twilio.auToken, phoneSender: twilio.phoneSender,
                            email : smtp.email, host : smtp.host, port : smtp.port, password: smtp.password, userSmtp: smtp.userSmtp,
                            transactionFee: general.transactionFee, creditFree: general.creditFree,
                        })
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
    _updateFee = (e) => {
        e.preventDefault()
        const { accountSid, auToken, phoneSender, email, host, password, userSmtp, transactionFee, creditFree} = this.state
        let twilio = {'accountSid' : accountSid, 'auToken': auToken, 'phoneSender' : phoneSender};
        let smtp = { email, host, password, userSmtp}
        let general = { transactionFee, creditFree }
        Axios.post('https://api2.levincidemo.com/api/adminsetting', { twilio, smtp, general},{ headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} } )
        .then((res) => {
            NotificationManager.success(res.data.message)
            // console.log('UPDATE', res)
        }).catch((error) => {
            console.log('ERROR', error)
            NotificationManager.error(error.data.message)
        })
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.General"/>}/>
                <div className="row">
                    <div className="col-md-6">
                        <form className="form-style-7">
                            <h1>TRANSACTIONS FEE</h1>
                                <ul>
                                <li>
                                    <label htmlFor="PHONE">Fee (%)</label>
                                    <input type="text" name="transactionFee" maxLength="100"
                                    value={this.state.transactionFee} onChange={this._handleChange}  style={{textAlign: 'center'}} />
                                </li>
                                <li>
                                    <button className="btn btn-green" onClick={this._updateFee}>UPDATE</button>
                                </li>
                                </ul>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <form className="form-style-7">
                            <h1>CREDIT FEE</h1>
                                <ul>
                                <li>
                                    <label htmlFor="PHONE">CREDIT FEE (%)</label>
                                    <input type="text" name="creditFree" maxLength="100"
                                    value={this.state.creditFree} onChange={this._handleChange}  style={{textAlign: 'center'}} />
                                </li>
                                <li>
                                    <button className="btn btn-green" onClick={this._updateFee}>UPDATE</button>
                                </li>
                                </ul>
                        </form>
                    </div>
                </div>
                   
                  
                    <NotificationContainer/>
                </div>
         );
    }
}
 

const mapStateToProps = (state) => ({
    InfoUser_Login: state.User,
  });

export default connect(mapStateToProps)(General);