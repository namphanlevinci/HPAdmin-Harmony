import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, NavLink, Switch } from "react-router-dom";
import { deleteMerchantById } from "../../../../actions/merchantActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
} from "@material-ui/core";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import General from "./Profile/General/General";
import EditGeneral from "./Profile/General/EditGeneral";
// import Business from "./Profile/Business";
import Bank from "./Profile/Bank/Bank";
import EditBank from "./Profile/Bank/EditBank";
import PrincipalList from "./Profile/Principal/PrincipalList";
import PrincipalProfile from "./Profile/Principal/PrincipalProfile";
import EditPrincipal from "./Profile/Principal/EditPrincipal";
import Settings from "./Profile/Settings/Settings";
import EditSettings from "./Profile/Settings/EditSettings";
import MerchantActi from "./Profile/Activity";
// Service
import Service from "./Profile/Service/Service";
import EditService from "./Profile/Service/EditService";
// Category
import EditCategory from "./Profile/Category/EditCategory";
import Category from "./Profile/Category/Category";
// Product
import Product from "./Profile/Product/Product";
import ProductDetail from "./Profile/Product/ProductDetail";
import ProductEdit from "./Profile/Product/ProductEdit";
// Staff
import Staff from "./Profile/Staff/Staff";
import AddStaff2 from "./Profile/Staff/AddStaff/index.js";
// Extra Tab
import ExtraTab from "./Profile/Extra/Extra.js";
// REPORT SETTLEMENT
import ExportSettlement from "./Profile/ExportSettlement/export-settlement";
import CheckPermissions from "../../../../util/checkPermission";
import PrivateRoute from "../../../PrivateRoute";
// Gift Card
import GiftCard from "./Profile/GiftCard/GiftCard";
import AddGiftCard from "./Profile/GiftCard/AddGiftCard";
import GiftCardInfo from "./Profile/GiftCard/GiftCardInfo";

import "../PendingList/MerchantReqProfile.css";
import "./MerchantProfile.css";
import "bootstrap/js/src/collapse.js";

class merchantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
    };
  }

  goBack = () => {
    this.props.history.push("/app/merchants/list");
  };

  handleDeleteMerchant = () => {
    const ID = this.props.MerchantProfile.merchantId;
    const path = "/app/merchants/list";
    this.props.deleteMerchantById(ID, path);
    this.setState({ openDelete: false });
  };

  render() {
    const e = this.props.MerchantProfile;

    return (
      <div>
        <div className="container-fluid content-list">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantProfile" />}
            disableBreadcrumb={true}
          />
          <div className="content-body page-heading">
            <Grid container>
              <Grid item xs={2}>
                <h3>ID: {e?.merchantId}</h3>
              </Grid>
              <Grid item xs={10}>
                <span style={{ display: "flex", justifyContent: "flex-end" }}>
                  {CheckPermissions("delete-merchant") && (
                    <Button
                      style={{ color: "#0764B0", backgroundColor: "white" }}
                      className="btn btn-green"
                      onClick={() => this.setState({ openDelete: true })}
                    >
                      DELETE
                    </Button>
                  )}
                  {CheckPermissions("export-settlement") && (
                    <span style={{ marginRight: "20px" }}>
                      <ExportSettlement
                        MerchantId={e?.merchantId}
                        Token={this.props.userLogin}
                      />
                    </span>
                  )}

                  <Button
                    style={{ color: "#0764B0", backgroundColor: "white" }}
                    className="btn btn-green"
                    onClick={this.goBack}
                  >
                    BACK
                  </Button>
                </span>
              </Grid>
            </Grid>
            <hr />
            <div className="content">
              <div className="container-fluid" style={{ padding: "10px" }}>
                <div className="">
                  <Dialog open={this.state.openDelete}>
                    <DialogTitle id="alert-dialog-title">
                      {"Delete Merchant?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This Merchant will be remove from the app. You can not
                        restore this Merchant, Are you sure you want to do
                        this?.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => this.setState({ openDelete: false })}
                        color="primary"
                      >
                        Disagree
                      </Button>
                      <Button
                        onClick={this.handleDeleteMerchant}
                        color="primary"
                        autoFocus
                      >
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <div className="profile-nav content-body">
                    <ul className="detail-tab">
                      <li>
                        <NavLink to="/app/merchants/profile/general">
                          General
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/bank">Bank</NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/principal">
                          Principal
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/staff">
                          Staff
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/category">
                          Category
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/service">
                          Service
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/product">
                          Product
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/extra">
                          Extra
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/gift-card">
                          Gift Card
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/settings">
                          Settings
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/profile/activities">
                          Activities
                        </NavLink>
                      </li>
                    </ul>
                    <div className="detail-content">
                      <Switch>
                        <Route
                          path="/app/merchants/profile/general/edit"
                          component={EditGeneral}
                        />
                        <Route
                          path="/app/merchants/profile/general"
                          component={General}
                        />
                        <Route
                          path="/app/merchants/profile/bank/edit"
                          component={EditBank}
                        />
                        <Route
                          path="/app/merchants/profile/bank"
                          component={Bank}
                        />
                        <Route
                          path="/app/merchants/profile/principal/info"
                          component={PrincipalProfile}
                        />
                        <Route
                          path="/app/merchants/profile/principal/edit"
                          component={EditPrincipal}
                        />
                        <Route
                          path="/app/merchants/profile/principal"
                          component={PrincipalList}
                        />
                        <Route
                          path="/app/merchants/profile/category/edit"
                          component={EditCategory}
                        />
                        <Route
                          path="/app/merchants/profile/category"
                          component={Category}
                        />
                        <Route
                          path="/app/merchants/profile/service/edit"
                          component={EditService}
                        />
                        <Route
                          path="/app/merchants/profile/service"
                          component={Service}
                        />
                        <Route
                          path="/app/merchants/profile/product/edit"
                          component={ProductEdit}
                        />
                        <Route
                          path="/app/merchants/profile/product/profile"
                          component={ProductDetail}
                        />
                        <Route
                          path="/app/merchants/profile/product"
                          component={Product}
                        />
                        <Route
                          path="/app/merchants/profile/extra"
                          component={ExtraTab}
                        />
                        <Route
                          exact
                          path="/app/merchants/profile/gift-card/add"
                          component={AddGiftCard}
                        />
                        <Route
                          exact
                          path="/app/merchants/profile/gift-card/:id"
                          component={GiftCardInfo}
                        />
                        <Route
                          path="/app/merchants/profile/gift-card"
                          component={GiftCard}
                        />

                        <PrivateRoute
                          permissionID={15}
                          path="/app/merchants/profile/staff/add"
                          component={AddStaff2}
                        />
                        <Route
                          path="/app/merchants/profile/staff"
                          component={Staff}
                        />
                        <Route
                          path="/app/merchants/profile/activities"
                          component={MerchantActi}
                        />
                        <Route
                          path="/app/merchants/profile/settings/edit"
                          component={EditSettings}
                        />
                        <Route
                          path="/app/merchants/profile/settings"
                          component={Settings}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  userLogin: state.verifyUser.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  deleteMerchantById: (ID, path) => {
    dispatch(deleteMerchantById(ID, path));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(merchantProfile)
);
