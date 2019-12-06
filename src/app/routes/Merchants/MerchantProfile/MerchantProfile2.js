import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect, Route, NavLink, Switch } from "react-router-dom";
import "./MerchantProfile.css";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
import Button from "@material-ui/core/Button";
import General from "./Detail/General";
import EditGeneral from "./Detail/EditGeneral";
// import Business from "./Detail/Business";
import Bank from "./Detail/Bank";
import EditBank from "./Detail/EditBank";
import Principal from "./Detail/Principal2";
import EditPrincipal from "./Detail/EditPrincipal";
import Settings from "./Detail/Settings";
import EditSettings from "./Detail/EditSettings";
import MerchantActi from "./Detail/Activity";
// Service
import Service from "./Detail/Service/Service";
import EditService from "./Detail/Service/EditService";
import AddService from "./Detail/Service/addService";
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
class merchantProfile2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goBack = () => {
    this.props.history.push("/app/merchants/list");
  };
  render() {
    const e = this.props.MerchantProfile;
    const renderMerchantProfile =
      e.merchantId !== undefined ? (
        <div className="container-fluid PendingList">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantprofile" />}
          />
          <div className="PendingLBody">
            <div className="PDL-Btn col-md-12">
              <h3>ID: {e.merchantId}</h3>
              <span>
                <Button
                  style={{ color: "#0764b0", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this._goBack}
                >
                  BACK
                </Button>
              </span>
            </div>
            <hr />
            <div className="content">
              <div className="container-fuild" style={{ padding: "10px" }}>
                <div className="">
                  <div className="profile-nav PendingLBody">
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
                          path="/app/merchants/profile/pincipal/edit"
                          component={EditPrincipal}
                        />
                        <Route
                          path="/app/merchants/profile/pincipal"
                          component={Principal}
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
                          path="/app/merchants/profile/service/add"
                          component={AddService}
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
      ) : (
        <Redirect to="/app/merchants/list" />
      );
    return <div>{renderMerchantProfile}</div>;
  }
}
const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default withRouter(connect(mapStateToProps)(merchantProfile2));
