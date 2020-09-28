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
            <div className="col-6" style={{ paddingLeft: "0px" }}>
              <label>Category*</label>
              <p>{product.categoryName}</p>
              <label>Product*</label>
              <p>{product.name}</p>
              <label>Description</label>
              <p>{product.description}</p>

              <label style={{ marginBottom: "20px" }}>Image</label>
              <br />
              <img
                src={product.imageUrl === "" ? ServiceImg : product.imageUrl}
                style={{ width: "250px", height: "250px" }}
                alt="void"
              />
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <label>SKU Number*</label>
                  <br />
                  <p>{product.sku}</p>
                </div>

                <div className="col-6">
                  <label>Items In Stock*</label>
                  <div className="input-box">
                    <p style={styles.p}>{product.quantity} </p>
                    <span className="unit" style={styles.unit}>
                      Item
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <label>Low Threshold*</label>
                  <div className="input-box">
                    <p style={styles.p}>{product.minThreshold}</p>
                    <span className="unit" style={styles.unit}>
                      Item
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <label>High Threshold*</label>
                  <div className="input-box">
                    <p style={styles.p}>{product.maxThreshold}</p>
                    <span className="unit" style={styles.unit}>
                      Item
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <label>Need To Order</label>
                  <br />
                  <p>{product.needToorDer}</p>
                </div>
                <div className="col-6">
                  <label>Price* ($)</label>
                  <br />
                  <p>$ {product.price}</p>
                </div>
                <div className="col-4">
                  <label>Status*</label>
                  <br />
                  <p>{product.isDisabled !== 1 ? "Active" : "Inactive"}</p>
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
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
  SERVICE: state.serviceProps,
});
export default connect(mapStateToProps)(productDetail);

const styles = {
  unit: {
    top: "5px",
  },
  p: {
    paddingTop: "4px",
    marginLeft: "15px",
  },
};
