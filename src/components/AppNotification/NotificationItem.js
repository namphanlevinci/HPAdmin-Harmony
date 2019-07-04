import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
// import Moment from 'react-moment';
import avatar from './avatar.png'
import moment from 'moment';
const NotificationItem = ({notification}) => {
  const {icon, title, receiveDate} = notification;
  const time = moment(receiveDate).format('MMMM Do YYYY, h:mm:ss a')
  return (
    <li className="media">
      <Avatar
        alt={avatar}
        src={avatar}
        className=" mr-2"
      />
      <div className="media-body align-self-center">
        <p className="sub-heading mb-0">{title}</p>
        <Button size="small" className="jr-btn jr-btn-xs mb-0"><i
          className={`zmdi ${icon} zmdi-hc-fw`}/></Button> <span className="meta-date">
            <small>{time}</small></span>
      </div>
    </li>
  );
};

export default NotificationItem;
