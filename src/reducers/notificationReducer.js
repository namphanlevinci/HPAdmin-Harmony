import React from "react";
import {
  SUCCESS_NOTIFICATION,
  WARNING_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../constants/notificationConstants";
import { store } from "react-notifications-component";

const initialState = [];

const NotificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUCCESS_NOTIFICATION:
      store.addNotification({
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        width: 275,
        dismiss: {
          duration: 5000,
        },
        content: (
          <div className={`notification-custom-success`}>
            <div className="notification-custom-icon">
              <i className="fa fa-check-circle" />
            </div>
            <div className="notification-custom-content">
              <p className="notification-message">{payload}</p>
            </div>
          </div>
        ),
      });
      state = payload;
      return { ...state };
    case FAILURE_NOTIFICATION:
      store.addNotification({
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        width: 275,
        dismiss: {
          duration: 5000,
        },
        content: (
          <div className={`notification-custom-danger`}>
            <div className="notification-custom-icon">
              <i className="fa fa-exclamation-circle" />
            </div>
            <div className="notification-custom-content">
              <p className="notification-message">{payload}</p>
            </div>
          </div>
        ),
      });
      state = payload;
      return { ...state };

    case WARNING_NOTIFICATION:
      store.addNotification({
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        width: 275,
        dismiss: {
          duration: 5000,
        },
        content: (
          <div className={`notification-custom-warning`}>
            <div className="notification-custom-icon">
              <i className="fa fa-exclamation-triangle" />
            </div>
            <div className="notification-custom-content">
              <p className="notification-message">{payload}</p>
            </div>
          </div>
        ),
      });
      state = payload;
      return { ...state };

    default:
      return state;
  }
};
export default NotificationReducer;
