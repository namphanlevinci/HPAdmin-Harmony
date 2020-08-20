import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { ProtectedRoute } from "./ProtectedRoute";

import MomentUtils from "@date-io/moment";
import defaultTheme from "./themes/defaultTheme";
import AppLocale from "../lngProvider";
import MainApp from "../app/index";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Verify_User from "./Verify_User";
import RTL from "../util/RTL";
import ReactNotification from "react-notifications-component";
// transitions
import "./react-transitions.css";
import "react-notifications-component/dist/theme.css";
import "../assets/vendors/style";

class App extends Component {
  componentDidMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }

  render() {
    const { match, location, locale, isDirectionRTL } = this.props;
    if (location.pathname === "/") {
      return <Redirect to={"/signin"} />;
    }
    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
      applyTheme.direction = "ltr";
    }
    const currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <RTL>
              <div className="app-main transition-container">
                <ReactNotification />
                <Switch>
                  <ProtectedRoute
                    path={`${match.url}app`}
                    component={MainApp}
                  />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/verify" component={Verify_User} />
                </Switch>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { sideNavColor, locale, isDirectionRTL, User } = settings;
  return { sideNavColor, locale, isDirectionRTL, User };
};

export default connect(mapStateToProps)(App);
