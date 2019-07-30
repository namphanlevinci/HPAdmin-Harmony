import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import CustomScrollbars from "util/CustomScrollbars";
import { connect } from "react-redux";

class SidenavContent extends Component {
  componentDidMount() {
    const { history } = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`; // get current path

    const menuLi = document.getElementsByClassName("menu");
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, "li");
          if (
            menuLi[j] !== this &&
            (parentLi === null || !parentLi.classList.contains("open"))
          ) {
            menuLi[j].classList.remove("open");
          }
        }
        this.classList.toggle("open");
      };
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const pathname = `${history.location.pathname}`; // get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      [
        "matches",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector"
      ].some(function(fn) {
        if (typeof document.body[fn] == "function") {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {}

    return null;
  }

  render() {
    const UserAdmin = this.props.InfoUser_Login.User.userAdmin.waRoleId;
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">
          <li className="nav-header">
            <IntlMessages id="sidebar.main" />
          </li>
          {/* DASHBOARD */}
          <li className="menu no-arrow">
            <NavLink to="/app/dashboard">
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard.dashboard" />
              </span>
            </NavLink>
          </li>
          {/*REQUEST MANAGEMENT */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-account-add zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard.requestManagement" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink
                  className="prepend-icon"
                  to="/app/merchants/pending-request"
                >
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.pendingRequest" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="prepend-icon"
                  to="/app/merchants/approved-request"
                >
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.approvedRequest" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="prepend-icon"
                  to="/app/merchants/rejected-request"
                >
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.rejectedRequest" />
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* MERCHANT  */}
          <li className="menu no-arrow">
            <NavLink to="/app/merchants/list">
              <i className="zmdi zmdi-account zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard.merchant" />
              </span>
            </NavLink>
          </li>
          {/* CONSUMERS */}
          <li className="menu no-arrow">
            <NavLink to="/app/consumers/list">
              <i className="zmdi zmdi-accounts-alt  zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard.consumers" />
              </span>
            </NavLink>
          </li>
          {/* ACCOUNTS */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-account-box zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard.accounts" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink
                  className="prepend-icon"
                  to="/app/accounts/admin-users"
                >
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.adminUsers" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounts/roles">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.roles" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounts/logs">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.Logs" />
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* REPORTS */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-file-text zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard.reports" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/4042">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.generalreport" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="prepend-icon"
                  to="/app/reports/transactions"
                >
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.transactionreport" />
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* BUSINESS */}

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-card zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard.Business" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/business/questions">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.Questions" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/business/users">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.Users" />
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* SETTING */}
          {UserAdmin === 1 ? (
            <li className="menu collapse-box">
              <Button>
                <i className="zmdi zmdi-settings zmdi-hc-fw" />
                <span className="nav-text">
                  <IntlMessages id="sidebar.dashboard.settings" />
                </span>
              </Button>
              <ul className="sub-menu">
                <li>
                  <NavLink
                    className="prepend-icon"
                    to="/app/adsettings/general"
                  >
                    <span className="nav-text">
                      <IntlMessages id="sidebar.dashboard.General" />
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="prepend-icon" to="/app/adsettings/smtp">
                    <span className="nav-text">
                      <IntlMessages id="sidebar.dashboard.smtp" />
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="prepend-icon"
                    to="/app/adsettings/template"
                  >
                    <span className="nav-text">
                      <IntlMessages id="sidebar.dashboard.Template" />
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="prepend-icon" to="/app/adsettings/twilio">
                    <span className="nav-text">
                      <IntlMessages id="sidebar.dashboard.Twilio" />
                    </span>
                  </NavLink>
                </li>
              </ul>
            </li>
          ) : null}
        </ul>
      </CustomScrollbars>
    );
  }
}
const mapStateToProps = state => ({
  PendingProfile: state.ViewMerchant_Request,
  InfoUser_Login: state.User
});
export default withRouter(connect(mapStateToProps)(SidenavContent));
