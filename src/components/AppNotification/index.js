import React, { Component } from 'react';
import { connect } from 'react-redux'
import NotificationItem from './NotificationItem';
import CustomScrollbars from 'util/CustomScrollbars';
import { getAll_Notifications } from "../../actions/notifications/actions"


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
  render() { 
      let Notidata =  this.props.Noti_List
    return ( 
          <CustomScrollbars className="messages-list scrollbar" style={{height: 280}}>
            <ul className="list-unstyled">
              {Notidata.map((e) => <NotificationItem key={e.notificationId} notification={e}/>)}
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
export default (connect(mapStateToProps, mapDispatchToProps)(AppNotification));
