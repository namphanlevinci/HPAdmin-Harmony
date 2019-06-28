import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, 'li');
          if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
            menuLi[j].classList.remove('open')
          }
        }
        this.classList.toggle('open');
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {

    const {history} = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] == 'function') {
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
    } catch (e) {

    }

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">
          <li className="nav-header">
            <IntlMessages id="sidebar.main"/>
          </li>
                    {/* MERCHANT */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
              <span className="nav-text">
                <IntlMessages id="Merchant"/>
              </span>
            </Button>
            <ul className="sub-menu">
            <li>
                <NavLink className="prepend-icon" to="/app/merchants/requests">
                  <span className="nav-text"><IntlMessages id="Merchants Request"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/merchants/list">
                  <span className="nav-text"><IntlMessages id="Merchants List"/></span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* ACCOUNTS */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
              <span className="nav-text">
                <IntlMessages id="Accounts"/>
              </span>
            </Button>
            <ul className="sub-menu">
            <li>
                <NavLink className="prepend-icon" to="/app/accounts/users">
                  <span className="nav-text"><IntlMessages id="Users"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounts/roles">
                  <span className="nav-text"><IntlMessages id="Roles"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounts/logs">
                  <span className="nav-text"><IntlMessages id="Audit logs"/></span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* SETTING */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
              <span className="nav-text">
                <IntlMessages id="Settings"/>
              </span>
            </Button>
            <ul className="sub-menu">
            <li>
                <NavLink className="prepend-icon" to="/app/adsettings/smtp">
                  <span className="nav-text"><IntlMessages id="SMTP"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/adsettings/template">
                  <span className="nav-text"><IntlMessages id="Template"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/adsettings/twilio">
                  <span className="nav-text"><IntlMessages id="Twilio"/></span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
