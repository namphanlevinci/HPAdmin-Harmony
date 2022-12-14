import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from "../constants/ActionTypes";
import { isIOS, isMobile } from "react-device-detect";
import { userLogout } from "../actions/userActions";

// import { AnimatedRoute } from "react-router-transition";

import asyncComponent from "../util/asyncComponent";
import TopNav from "../components/TopNav";
import Header from "../components/Header/index";
import Sidebar from "../containers/SideNav/index";
import IdleTimer from "react-idle-timer";
import Footer from "../components/Footer";
// import Merchants from "./routes/Merchants/Merchants";
import Accounts from "./routes/Accounts/Accounts";
import Settings from "./routes/AdminSettings/Settings";
import Business from "./routes/Business/Business";
// import Dashboard from "./routes/dashboard/dashboard";
import DashboardChart from "./routes/DashboardChart";
import Consumers from "./routes/Consumers/index";
import Reports from "./routes/Reports/Reports";
import GiftCard from "./routes/GiftCard/index";
import MarketPlace from "./routes/MarketPlace";
import Ticket from "./routes/Ticket";
import ColumnView from "./routes/Ticket/ColumnView";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAction = (e) => {
    // console.log("user did something", e);
  };

  onActive = (e) => {
    // console.log("user is active", e);
    // console.log("time remaining", this.idleTimer.getRemainingTime());
  };

  onIdle = (e) => {
    // REMOVE USER AFTER 30' IDLE
    console.log("BYE");
    this.props.userLogout();
    // console.log("last active", this.idleTimer.getLastActiveTime());
  };
  render() {
    const {
      match,
      drawerType,
      navigationStyle,
      horizontalNavPosition,
    } = this.props;

    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "fixed-drawer"
      : drawerType.includes(COLLAPSED_DRAWER)
        ? "collapsible-drawer"
        : "mini-drawer";

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar />
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION
                ? "app-header-horizontal"
                : ""
              }`}
          >
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === ABOVE_THE_HEADER && (
                <TopNav styleName="app-top-header" />
              )}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>
          <main className="app-main-content-wrapper">
          <div className="app-main-content">
              <Switch>
                <Route
                  path={`${match.url}/merchants`}
                  component={asyncComponent(() =>
                    import("./routes/Merchants/Merchants")
                  )}
                />
                <Route path={`${match.url}/adsettings`} component={Settings} />
                <Route path={`${match.url}/accounts`} component={Accounts} />
                <Route
                  path={`${match.url}/profile`}
                  component={asyncComponent(() =>
                    import("../components/profile/profile")
                  )}
                />
                <Route
                  path={`${match.url}/settings`}
                  component={asyncComponent(() =>
                    import("../components/Settings/settings")
                  )}
                />
                <Route path={`${match.url}/business`} component={Business} />
                <Route path={`${match.url}/dashboard`} component={DashboardChart} />
                <Route path={`${match.url}/consumers`} component={Consumers} />
                <Route path={`${match.url}/reports`} component={Reports} />
                <Route path={`${match.url}/giftcard`} component={GiftCard} />
                <Route
                  path={`${match.url}/market-place`}
                  component={MarketPlace}
                />
                <Route
                  path={`${match.url}/pricing`}
                  component={asyncComponent(() =>
                    import("./routes/PricingPlan/index")
                  )}
                />
                <Route
                  path={`${match.url}/ticket`}
                  component={Ticket}
                />

                <Route
                  path={`${match.url}/ticketColumn`}
                  component={ColumnView}
                />

                <Route
                  path={`${match.url}/403`}
                  component={asyncComponent(() =>
                    import("../components/Error403/index.js")
                  )}
                />

                <Route
                  component={asyncComponent(() =>
                    import("../components/Error404/index.js")
                  )}
                />
              </Switch>
            </div>
            <div>
              <IdleTimer
                ref={(ref) => {
                  this.idleTimer = ref;
                }}
                element={document}
                onActive={this.onActive}
                onIdle={this.onIdle}
                onAction={this.onAction}
                debounce={250}
                timeout={1800000}
              />
              {/* your app here */}
              <Footer />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition };
};

const mapDispatchToProps = (dispatch) => ({
  userLogout: (payload) => {
    dispatch(userLogout(payload));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
