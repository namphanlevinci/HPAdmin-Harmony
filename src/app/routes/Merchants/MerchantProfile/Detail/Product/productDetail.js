import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import { Button, Grid, CardMedia } from "@material-ui/core";
import {
  CustomTitle,
  CustomTextLabel,
  CustomText,
} from "../../../../../../util/CustomText";

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
        <CustomTitle value="Product Detail" />
        <Grid container spacing={3}>
          <Grid item xs={4} md={6}>
            <CustomTextLabel value="Category*" />
            <CustomText value={product.categoryName} />
          </Grid>
          <Grid item xs={4} md={3}>
            <CustomTextLabel value="SKU Number*" />
            <CustomText value={product.sku} />
          </Grid>
          <Grid item xs={4} md={3}>
            <CustomTextLabel value="Items In Stock*" />
            <CustomText value={`Item  ${product.quantity}`} />
          </Grid>

          <Grid item xs={4} md={6}>
            <CustomTextLabel value="Product Name*" />
            <CustomText value={product.name} />
          </Grid>
          <Grid item xs={4} md={3}>
            <CustomTextLabel value="Low Threshold*" />
            <CustomText value={`Item ${product.minThreshold}`} />
          </Grid>

          <Grid item xs={4} md={3}>
            <CustomTextLabel value="High Threshold*" />
            <CustomText value={`Item ${product.maxThreshold}`} />
          </Grid>

          <Grid item xs={4} md={6}>
            <CustomTextLabel value="Description" />
            <CustomText value={product.description} />
          </Grid>

          <Grid item xs={4} md={3}>
            <CustomTextLabel value="Price* ($)" />
            <CustomText value={`$ ${product.price}`} />
          </Grid>
          <Grid item xs={4} md={3}>
            <CustomTextLabel value="Status*" />
            <CustomText
              value={product.isDisabled !== 1 ? "Active" : "Inactive"}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            <CustomTextLabel value="Image" />
            <CardMedia
              component="img"
              src={product.imageUrl === "" ? ServiceImg : product.imageUrl}
              style={{ width: "100%", height: "auto" }}
              alt="void"
            />
          </Grid>
          {/* <Grid item md={6}>
            <label>Need To Order</label>
            <br />
            <p>{product.needToorDer}</p>
          </Grid> */}

          <Grid item xs={12} md={12}>
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
