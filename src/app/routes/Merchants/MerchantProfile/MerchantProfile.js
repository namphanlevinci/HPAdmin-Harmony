import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, NavLink, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import General from "./Detail/General";
import EditGeneral from "./Detail/EditGeneral";
// import Business from "./Detail/Business";
import Bank from "./Detail/Bank";
import EditBank from "./Detail/EditBank";
import PricipalList from "./Detail/Principal/principal-list";
import PrincipalInfo from "./Detail/Principal/Principal2";
import EditPrincipal from "./Detail/Principal/EditPrincipal";
import Settings from "./Detail/Settings";
import EditSettings from "./Detail/EditSettings";
import MerchantActi from "./Detail/Activity";
// Service
import Service from "./Detail/Service/Service";
import EditService from "./Detail/Service/EditService";
// import AddService from "./Detail/Service/addService";
// Category
import EditCategory from "./Detail/Category/edit-category";
import Category from "./Detail/Category/Category";
// Product
import Product from "./Detail/Product/Product";
import ProductDetail from "./Detail/Product/productDetail";
import ProductEdit from "./Detail/Product/productEdit";
import ProductAdd from "./Detail/Product/productAdd";
// Staff
import Staff from "./Detail/Staff/Staff";
import AddStaff from "./Detail/Staff/add-staff";
// import StaffGeneral from "./Detail/Staff/staff-detail/staff-info";
// Extra Tab
import ExtraTab from "./Detail/Extra/extra";
// REPORT SETTLEMENT
import ExportSettlement from "./Detail/ExportSettlement/export-settlement";

import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
import "./MerchantProfile.css";
import "bootstrap/js/src/collapse.js";

class merchantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goBack = () => {
    this.props.history.push("/app/merchants/list");
  };
  render() {
    const e = this.props.MerchantProfile;

    return (
      <div>
        <div className="container-fluid content-list">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantprofile" />}
          />
          <div className="content-body page-heading">
            <div className="header col-md-12">
              <h3>ID: {e.merchantId}</h3>
              <span style={{ display: "flex" }}>
                <span style={{ marginRight: "20px" }}>
                  <ExportSettlement
                    MerchantId={e?.merchantId}
                    Token={this.props.userLogin?.token}
                  />
                </span>
                <Button
                  style={{ color: "#4251af", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this._goBack}
                >
                  BACK
                </Button>
              </span>
            </div>
            <hr />
            <div className="content">
              <div className="container-fluid" style={{ padding: "10px" }}>
                <div className="">
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
                        <NavLink to="/app/merchants/profile/pincipal">
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
                          path="/app/merchants/profile/pincipal/info"
                          component={PrincipalInfo}
                        />
                        <Route
                          path="/app/merchants/profile/pincipal/edit"
                          component={EditPrincipal}
                        />
                        <Route
                          path="/app/merchants/profile/pincipal"
                          component={PricipalList}
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
                          path="/app/merchants/profile/product/add"
                          component={ProductAdd}
                        />
                        <Route
                          path="/app/merchants/profile/product/edit"
                          component={ProductEdit}
                        />
                        <Route
                          path="/app/merchants/profile/product/detail"
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
                          path="/app/merchants/profile/staff/add"
                          component={AddStaff}
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
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});

export default withRouter(connect(mapStateToProps)(merchantProfile));
