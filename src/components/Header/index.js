import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import {
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
  INSIDE_THE_HEADER,
} from "../../constants/ActionTypes";
import { switchLanguage, toggleCollapsedNav } from "../../actions/Setting";
import { getMerchantByID } from "../../actions/merchantActions";
import { getUserByID } from "../../actions/userActions";

import firebase from "../../firebase";

import AppNotification from "../AppNotification/index";
import CardHeader from "../../components/dashboard/Common/CardHeader/index";
import IntlMessages from "../../util/IntlMessages";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "../../components/TopNav/Menu";
import UserInfoPopup from "../../components/UserInfo/UserInfoPopup";
import axios from "axios";
import Logo from "../../assets/images/harmonylogo.png";

import { config } from "../../url/url";
const URL = config.url.URL;

class Header extends React.Component {
  async componentDidMount() {
    const User = localStorage.getItem("user");
    this.setState({ User: JSON.parse(User) });

    setTimeout(() => {
      this.loadNotify();
    }, 1500);

    const messaging = firebase.messaging();

    messaging.onMessage((payload) => {
      this.loadNotify();
      this.setState({ appNotificationIcon: false });
    });
  }

  loadNotify = (next) => {
    const loadPage = next ? next : 1;
    try {
      let { token } = this.state.User;
      axios
        .get(`${URL}/notification?page=${loadPage}&row=10`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data.data;
          if (data?.length !== 0 && data !== undefined) {
            this.setState({
              Notify: [...this.state.Notify, ...data],
            });
          } else {
            this.setState({ hasMore: false });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  gotoList = async (e) => {
    if (e.type === "payment") {
      const path = "/app/merchants/pending/profile";
      this.props.getMerchantByID(e.senderId, path);
      this.handleDelete(e);
      this.setState({ appNotification: false });
    } else {
      const path = "/app/consumers/profile/general";
      this.props.getUserByID(e.senderId, path);
      this.setState({ appNotification: false });
      this.handleDelete(e);
    }
  };

  handleDelete = (e) => {
    let { token } = this.state.User;

    this.setState({
      Notify: this.state.Notify.filter(
        (el) => el.waNotificationId !== e.waNotificationId
      ),
    });
    const ID = e.waNotificationId;
    axios
      .delete(`${URL}/notification/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification,
      appNotificationIcon: true,
    });
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification,
    });
  };
  onLangSwitcherSelect = (event) => {
    this.setState({
      langSwitcher: !this.state.langSwitcher,
      anchorEl: event.currentTarget,
    });
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox,
    });
  };
  onAppsSelect = () => {
    this.setState({
      apps: !this.state.apps,
    });
  };
  onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo,
    });
  };
  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false,
      apps: false,
    });
  };
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: "",
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false,
      appNotificationIcon: false,
      User: [],
      hasMore: true,
      Notify: [],
      loadMore: false,
    };
  }

  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value,
    });
  }

  Apps = () => {
    return (
      <ul className="jr-list jr-list-half">
        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/calendar/basic">
            <i className="zmdi zmdi-calendar zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.calendar.basic" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/to-do">
            <i className="zmdi zmdi-check-square zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.toDo" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/mail">
            <i className="zmdi zmdi-email zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.mail" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/chat">
            <i className="zmdi zmdi-comment zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.chat" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/contact">
            <i className="zmdi zmdi-account-box zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.contact" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/">
            <i className="zmdi zmdi-plus-circle-o zmdi-hc-fw" />
            <span className="jr-list-text">Add New</span>
          </Link>
        </li>
      </ul>
    );
  };

  render() {
    const { drawerType, navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-block d-xl-none"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "d-block"
      : "d-none";
    const Notify =
      this.state.appNotificationIcon === false && this.state.Notify.length !== 0
        ? "zmdi zmdi-notifications-none icon-alert animated infinite wobble"
        : "zmdi zmdi-notifications-none";
    return (
      <AppBar
        className={`app-main-header ${
          navigationStyle === HORIZONTAL_NAVIGATION &&
          horizontalNavPosition === BELOW_THE_HEADER
            ? "app-main-header-top"
            : ""
        }`}
      >
        <Toolbar className="app-toolbar" disableGutters={false}>
          {navigationStyle === HORIZONTAL_NAVIGATION ? (
            <div
              className="d-block d-md-none pointer mr-3"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="jr-menu-icon">
                <span className="menu-icon" />
              </span>
            </div>
          ) : (
            <IconButton
              className={`jr-menu-icon mr-3 ${drawerStyle}`}
              aria-label="Menu"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="menu-icon" />
            </IconButton>
          )}
          <Link
            className="app-logo mr-2 d-none d-sm-block"
            to="/app/merchants/list"
          >
            <img src={Logo} alt="Harmony" title="Harmony" />
          </Link>

          {/* <SearchBox styleName="d-none d-lg-block" placeholder=""
                     onChange={this.updateSearchText.bind(this)}
                     value={this.state.searchText}/> */}
          {navigationStyle === HORIZONTAL_NAVIGATION &&
            horizontalNavPosition === INSIDE_THE_HEADER && <Menu />}

          <ul className="header-notifications list-inline ml-auto">
            {/* <li className="list-inline-item">
              <Dropdown
                className="quick-menu app-notification"
                isOpen={this.state.apps}
                toggle={this.onAppsSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <span className="app-notification-menu">
                    <i className="zmdi zmdi-apps zmdi-hc-fw zmdi-hc-lg"/>
                    <span>Apps</span>
                  </span>
                </DropdownToggle>

                <DropdownMenu>
                  {this.Apps()}
                </DropdownMenu>
              </Dropdown>
            </li> */}
            {/* <li className="d-inline-block d-lg-none list-inline-item">
              <Dropdown
                className="quick-menu nav-searchbox"
                isOpen={this.state.searchBox}
                toggle={this.onSearchBoxSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <IconButton className="icon-btn">
                    <i className="zmdi zmdi-search zmdi-hc-fw"/>
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right className="p-0">
                  <SearchBox styleName="search-dropdown" placeholder=""
                             onChange={this.updateSearchText.bind(this)}
                             value={this.state.searchText}/>
                </DropdownMenu>
              </Dropdown>
            </li> */}
            {/* <li className="list-inline-item">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.langSwitcher}
                toggle={this.onLangSwitcherSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <IconButton className="icon-btn">
                    <i className={`flag flag-24 flag-${locale.icon}`}/>
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right className="w-50">
                  <LanguageSwitcher switchLanguage={this.props.switchLanguage}
                                    handleRequestClose={this.handleRequestClose}/>
                </DropdownMenu>
              </Dropdown>


            </li> */}
            <li className="list-inline-item app-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.appNotification}
                toggle={this.onAppNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn">
                    <i className={Notify} />
                    {/* <i className="zmdi zmdi-notifications-none icon-alert animated infinite wobble"/> */}
                  </IconButton>
                </DropdownToggle>
                <DropdownMenu right>
                  <CardHeader
                    styleName="align-items-center"
                    heading={<IntlMessages id="appNotification.title" />}
                  />
                  <AppNotification
                    Notify={this.state.Notify}
                    handleDelete={this.handleDelete}
                    gotoList={this.gotoList}
                    loadNotify={this.loadNotify}
                    hasMore={this.state.hasMore}
                  />
                </DropdownMenu>
              </Dropdown>
            </li>
            {/* <li className="list-inline-item mail-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.mailNotification}
                toggle={this.onMailNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">

                  <IconButton className="icon-btn">
                    <i className="zmdi zmdi-comment-alt-text zmdi-hc-fw"/>
                  </IconButton>
                </DropdownToggle>


                <DropdownMenu right>
                  <CardHeader styleName="align-items-center"
                              heading={<IntlMessages id="mailNotification.title"/>}/>
                  <MailNotification/>
                </DropdownMenu>
              </Dropdown>
            </li> */}

            {navigationStyle === HORIZONTAL_NAVIGATION && (
              <li className="list-inline-item user-nav">
                <Dropdown
                  className="quick-menu"
                  isOpen={this.state.userInfo}
                  toggle={this.onUserInfoSelect.bind(this)}
                >
                  <DropdownToggle
                    className="d-inline-block"
                    tag="span"
                    data-toggle="dropdown"
                  >
                    <IconButton className="icon-btn size-30">
                      <Avatar
                        alt="..."
                        src={"https://via.placeholder.com/150x150"}
                        className="size-30"
                      />
                    </IconButton>
                  </DropdownToggle>

                  <DropdownMenu right>
                    <UserInfoPopup />
                  </DropdownMenu>
                </Dropdown>
              </li>
            )}
          </ul>

          <div className="ellipse-shape"></div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition,
    User,
  } = settings;
  return { drawerType, locale, navigationStyle, horizontalNavPosition, User };
};

const mapDispatchToProps = (dispatch) => ({
  toggleCollapsedNav: (payload) => {
    dispatch(toggleCollapsedNav(payload));
  },
  switchLanguage: (payload) => {
    dispatch(switchLanguage(payload));
  },
  getMerchantByID: (merchantID, path) => {
    dispatch(getMerchantByID(merchantID, path));
  },
  getUserByID: (Id, path) => {
    dispatch(getUserByID(Id, path));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
