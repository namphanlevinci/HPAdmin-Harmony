import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import SidenavContent from "./SidenavContent";
import UserInfo from "../../components/UserInfo";
import Fade from "@material-ui/core/Fade";

import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from "../../constants/ActionTypes";
import { toggleCollapsedNav, updateWindowWidth } from "../../actions/Setting";
import CircularProgress from "@material-ui/core/CircularProgress";

class SideNav extends React.PureComponent {
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.props.updateWindowWidth(window.innerWidth);
    });
  }

  render() {
    const {
      navCollapsed,
      drawerType,
      width,
      navigationStyle,
      loading,
    } = this.props;

    let drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-xl-flex"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? ""
      : "d-flex";
    let type = "permanent";
    if (
      drawerType.includes(COLLAPSED_DRAWER) ||
      (drawerType.includes(FIXED_DRAWER) && width < 1200)
    ) {
      type = "temporary";
    }

    if (navigationStyle === HORIZONTAL_NAVIGATION) {
      drawerStyle = "";
      type = "temporary";
    }
    return (
      <div className={`app-sidebar d-none ${drawerStyle}`}>
        <Drawer
          className="app-sidebar-content"
          variant={type}
          open={type.includes("temporary") ? navCollapsed : true}
          onClose={this.onToggleCollapsedNav}
          classes={{
            paper: "side-nav",
          }}
        >
          <UserInfo />
          {loading ? (
            <div style={styles.loading}>
              <Fade in={true}>
                <CircularProgress size={42} />
              </Fade>
            </div>
          ) : (
            <Fade in={true}>
              <SidenavContent />
            </Fade>
          )}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, userPermissions }) => {
  const { navCollapsed, drawerType, width, navigationStyle } = settings;
  const loading = userPermissions.loading;
  return {
    navCollapsed,
    drawerType,
    width,
    navigationStyle,
    loading,
  };
};

export default withRouter(
  connect(mapStateToProps, { toggleCollapsedNav, updateWindowWidth })(SideNav)
);

const styles = {
  loading: {
    display: "flex",
    justifyContent: "center",
    minHeight: "500px",
    alignItems: "center",
  },
};
