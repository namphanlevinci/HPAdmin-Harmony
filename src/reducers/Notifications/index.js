import React from "react";
import * as types from "../../actions/notifications/types";
import { store } from "react-notifications-component";

const initialState = [];

const NotificationReducer = (state = initialState, { type, payload }) => {
  console.log("payload", payload);
  switch (type) {
    case types.SUCCESS_NOTIFICATION:
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
    case types.FAILURE_NOTIFICATION:
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

    case types.WARNING_NOTIFICATION:
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
