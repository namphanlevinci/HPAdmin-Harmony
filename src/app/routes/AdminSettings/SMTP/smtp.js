import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import {connect} from 'react-redux';
import "../Setting.css"
import Axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class SMTP extends Component {
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
        await Axios.get('http://api2.levincidemo.com/api/adminsetting', { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
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
    _updateSMTP = (e) => {
        e.preventDefault()
        const { accountSid, auToken, phoneSender, email, host, password, userSmtp, port} = this.state
        let twilio = {'accountSid' : accountSid, 'auToken': auToken, 'phoneSender' : phoneSender};
        let smtp = { email, host, password, userSmtp, port}
        Axios.post('http://api2.levincidemo.com/api/adminsetting', { twilio, smtp },{ headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} } )
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
                <ContainerHeader match={this.props.match} title={<IntlMessages id="SMTP"/>}/>
                        <form className="form-style-7">
                        <h1>CHANGE MAIL SERVER</h1>
                            <ul>
                            <li>
                                <label for="HOST">HOST</label>
                                <input type="text" name="host" maxlength="100" value={this.state.host} onChange={this._handleChange} />
                            </li>
                            <li>
                                <label for="USERNAME">USERNAME</label>
                                <input type="text" name="userSmtp" maxlength="100" value={this.state.userSmtp} onChange={this._handleChange} />
                            </li>
                            <li>
                                <label for="PASSWORD">PASSWORD</label>
                                <input type="password" name="password" maxlength="100" value={this.state.password}  onChange={this._handleChange} />
                            </li>
                            <li>
                                <label for="EMAIL">EMAIL</label>
                                <input type="email" name="email" maxlength="100" value={this.state.email}  onChange={this._handleChange} />
                            </li>
                            <li>
                                <label for="PORT">PORT</label>
                                <input type="text" name="port" maxlength="100" value={this.state.port}  onChange={this._handleChange} />
                            </li>
                            <li>
                                {/* <input style={{cursor: "pointer"}} type="submit" value="UPDATE" onChange={this._handleChange} /> */}
                                <button className="btn btn-green" onClick={this._updateSMTP}>UPDATE</button>
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

export default connect(mapStateToProps)(SMTP);