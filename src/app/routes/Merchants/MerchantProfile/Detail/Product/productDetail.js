import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import { Button, Grid } from "@material-ui/core";
import ServiceImg from "./hpadmin2.png";

import axios from "axios";

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

    return (
      <div className="react-transition swipe-up service-container">
        <h2 style={{ color: "#4251af", paddingBottom: "30px" }}>
          Product Detail
        </h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label>Category*</label>
            <p>{product.categoryName}</p>
          </Grid>
          <Grid item xs={3}>
            <label>SKU Number*</label>
            <br />
            <p>{product.sku}</p>
          </Grid>
          <Grid item xs={3}>
            <label>Items In Stock*</label>
            <div className="input-box">
              <p style={styles.p}>{product.quantity} </p>
              <span className="unit" style={styles.unit}>
                Item
              </span>
            </div>
          </Grid>

          <Grid item xs={6}>
            <label>Product Name*</label>
            <p>{product.name}</p>
          </Grid>
          <Grid item xs={3}>
            <label>Low Threshold*</label>
            <div className="input-box">
              <p style={styles.p}>{product.minThreshold}</p>
              <span className="unit" style={styles.unit}>
                Item
              </span>
            </div>
          </Grid>

          <Grid item xs={3}>
            <label>High Threshold*</label>
            <div className="input-box">
              <p style={styles.p}>{product.maxThreshold}</p>
              <span className="unit" style={styles.unit}>
                Item
              </span>
            </div>
          </Grid>

          <Grid item xs={6}>
            <label>Description</label>
            <p>{product.description}</p>
          </Grid>

          <Grid item xs={3}>
            <label>Price* ($)</label>
            <br />
            <p>$ {product.price}</p>
          </Grid>
          <Grid item xs={3}>
            <label>Status*</label>
            <br />
            <p>{product.isDisabled !== 1 ? "Active" : "Inactive"}</p>
          </Grid>

          <Grid item xs={4}>
            <label style={{ marginBottom: "20px" }}>Image</label>
            <br />
            <img
              src={product.imageUrl === "" ? ServiceImg : product.imageUrl}
              style={{ width: "100%", height: "auto" }}
              alt="void"
            />
          </Grid>
          {/* <Grid item xs={6}>
            <label>Need To Order</label>
            <br />
            <p>{product.needToorDer}</p>
          </Grid> */}

          <Grid item xs={12}>
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
          </Grid>
        </Grid>
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
