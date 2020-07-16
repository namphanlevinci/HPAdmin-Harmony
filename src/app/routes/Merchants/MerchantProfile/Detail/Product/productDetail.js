import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import ServiceImg from "./hpadmin2.png";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
import "../Service/service.style.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

class productDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }
  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        this.setState({ category: res.data.data });
      });
  }

  goBack = () => {
    this.props.history.push("/app/merchants/profile/product");
  };

  gotoEdit = () => {
    this.props.history.push("/app/merchants/profile/product/edit");
  };
  render() {
    const product = this.props.SERVICE;
    // console.log("PRODUCT", product);
    //~ preview image
    return (
      <div className="react-transition swipe-up service-container">
        <h2 style={{ color: "#4251af" }}>Product Detail</h2>
        <div className="container Service">
          <div className="row">
            <div className="col-md-5">
              <label style={{ marginBottom: "20px" }}>Image</label>
              <br />
              <img
                src={product.imageUrl === "" ? ServiceImg : product.imageUrl}
                style={{ width: "250px", height: "250px" }}
                alt="void"
              />
            </div>
            <div className="col-md-7">
              <div className="row">
                <div className="col-4">
                  <label>Product</label>
                  <br />
                  <p>{product.name}</p>
                </div>
                <div className="col-4">
                  <label>SKU Number</label>
                  <br />
                  <p>{product.sku}</p>
                </div>
                <div className="col-4">
                  <label>Category</label>
                  <br />
                  <p>{product.categoryName}</p>
                </div>
                <div className="col-4">
                  <label>Items In Stock</label>
                  <br />
                  <p>{product.quantity}</p>
                </div>
                <div className="col-4">
                  <label>Need To Order</label>
                  <br />
                  <p>{product.needToorDer}</p>
                </div>
                <div className="col-4">
                  <label>Low Threshold</label>
                  <br />
                  <p>{product.minThreshold}</p>
                </div>
                <div className="col-4">
                  <label>Max Threshold</label>
                  <br />
                  <p>{product.maxThreshold}</p>
                </div>
                <div className="col-4">
                  <label>Price ($)</label>
                  <br />
                  <p>$ {product.price}</p>
                </div>
                <div className="col-4">
                  <label>Status</label>
                  <br />
                  <p>{product.isDisabled !== 1 ? "Active" : "Inactive"}</p>
                </div>
                <div className="col-12">
                  <label>Description</label>
                  <br />
                  <textarea
                    disabled
                    defaultValue={product.description}
                    style={{ width: "100%", height: "60px", padding: "5px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <Button
              className="btn btn-green"
              style={{
                backgroundColor: "#4251af",
                color: "white",
              }}
              onClick={this.gotoEdit}
            >
              EDIT
            </Button>
            <Button className="btn btn-red" onClick={this.goBack}>
              BACK
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
  SERVICE: state.serviceProps,
});
export default connect(mapStateToProps)(productDetail);
