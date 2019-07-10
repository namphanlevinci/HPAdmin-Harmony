import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import {connect} from 'react-redux';
import "../Setting.css"
import Axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class Twilio extends Component {
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
            userSmtp: ''
         }
    }
    async componentDidMount() {
        await Axios.get('https://api2.levincidemo.com/api/adminsetting', { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            const twilio = res.data.data.twilio
            const smtp = res.data.data.smtp
          this.setState({ accountSid : twilio.accountSid, auToken: twilio.auToken, phoneSender: twilio.phoneSender,
                            email : smtp.email, host : smtp.host, port : smtp.port, password: smtp.password, userSmtp: smtp.userSmtp
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
    _updateTwilio = (e) => {
        e.preventDefault()
        const { accountSid, auToken, phoneSender, email, host, password, userSmtp} = this.state
        let twilio = {'accountSid' : accountSid, 'auToken': auToken, 'phoneSender' : phoneSender};
        let smtp = { email, host, password, userSmtp}
        Axios.post('https://api2.levincidemo.com/api/adminsetting', { twilio, smtp },{ headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} } )
        .then((res) => {
            NotificationManager.success(res.data.message)
        }).catch((error) => {
            console.log('ERROR', error)
            NotificationManager.error(error.data.message)
        })
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="Twilio"/>}/>
                    <form className="form-style-7">
                        <h1>CHANGE TWILIO ACCOUNT</h1>
                            <ul>
                            <li>
                                <label htmlFor="PHONE">PHONE</label>
                                <input type="text" name="phoneSender" maxLength="100"
                                 value={this.state.phoneSender} onChange={this._handleChange}/>
                            </li>
                            <li>
                                <label htmlFor="ACCOUNTID">ACCOUNT TOKEN</label>
                                <input type="text" name="auToken" maxLength="100" 
                                value={this.state.auToken} onChange={this._handleChange}/>
                            </li>
                            <li>
                                <label htmlFor="TOKEN">ACCOUNT SID</label>
                                <input type="text" name="accountSid" maxLength="100"
                                 value={this.state.accountSid} onChange={this._handleChange}/>
                            </li>
                            <li>
                                {/* <button className="btn btn-green">EDIT </button>
                                <button className="btn btn-green">BACK</button> */}
                                <button className="btn btn-green" onClick={this._updateTwilio}>UPDATE</button>
                            </li>
                            </ul>
                    </form>
                    <NotificationContainer/>
                </div>
         );
    }
}
 

const mapStateToProps = (state) => ({
    InfoUser_Login: state.User,
  });

export default connect(mapStateToProps)(Twilio);