import React, { Component } from 'react';
import { connect } from 'react-redux'
// import NotificationItem from './NotificationItem';
import CustomScrollbars from 'util/CustomScrollbars';
import { getAll_Notifications } from "../../actions/notifications/actions"
import {  withRouter} from 'react-router-dom';
//
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import axios from "axios"
import avatar from './avatar.png'
import moment from 'moment';
import "./Noti.css"
class AppNotification  extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      noti : []
     }
  }
  componentWillMount() {
    this.props.getAll_Notifications();
  }
  _gotoList = (e) => {
    this.props.history.push('/app/merchants/requests');
    this._handleDelete(e)
  }
  _handleDelete = (e) => {
    axios.delete('https://api2.levincidemo.com/api/notification/' + e, { headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
    .then((res) => {
      // console.log(res)
      this.props.getAll_Notifications();
    }).catch((error) => {
      console.log(error)
    })
  }
  render() { 
      let Notidata =  this.props.Noti_List
      const renderNoti = Notidata.map((e) => {
        const {icon, title, receiveDate, notificationId} = e;
        const time = moment(receiveDate).format('MMMM Do YYYY, h:mm:ss a')
        return (
          <li className="media" key={e.notificationId} >
          <Avatar
            alt={avatar}
            src={avatar}
            className=" mr-2"
          />
          <div onClick={() => this._gotoList(notificationId)} className="media-body align-self-center">
            <p className="sub-heading mb-0">{title}</p>
            <Button size="small" className="jr-btn jr-btn-xs mb-0"><i
              className={`zmdi ${icon} zmdi-hc-fw`}/></Button> <span className="meta-date">
                <small>{time}</small>            </span>
          </div>
          <Avatar className="notiDele"><i onClick={() => this._handleDelete(notificationId)} className="fa fa-trash"></i></Avatar>
          </li>
        )
      })
    return ( 
          <CustomScrollbars className="messages-list scrollbar" style={{height: 280}}>
            <ul className="list-unstyled">
              {renderNoti}
            </ul>
        </CustomScrollbars> );
  }
}


const mapStateToProps = (state) => ({
  InfoUser_Login: state.User,
  Noti_List: state.getNoti
});
const mapDispatchToProps = (dispatch) => ({
  getAll_Notifications: () => {
    dispatch(getAll_Notifications())
  }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppNotification));
