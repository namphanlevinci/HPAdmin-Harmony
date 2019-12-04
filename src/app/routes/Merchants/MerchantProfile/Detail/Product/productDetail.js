import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import URL from "../../../../../../url/url";
import Button from "@material-ui/core/Button";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";

class productDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
  }
  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
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
    //~ preview image
    return (
      <div className="react-transition swipe-up">
        <h2 style={{ color: "#0764b0" }}>Product Detail</h2>
        <div className="container Service">
          <div className="row">
            <div className="col-md-5">
              <label>Image</label>
              <br />
              <img
                src={product.imageUrl}
                style={{ width: "350px", height: "350px" }}
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
                  <label>Need To Order</label>
                  <br />
                  <p>{product.needToorDer}</p>
                </div>
                <div className="col-4">
                  <label>Low Threshold</label>
                  <br />
                  <p>{product.minThreshold}</p>
                </div>
                <div className="coL-4">
                  <label>Max Threshold</label>
                  <br />
                  <p>{product.maxThreshold}</p>
                </div>
                <div className="col-4">
                  <label>Price ($)</label>
                  <br />
                  <p>{product.price}</p>
                </div>
                <div className="col-4">
                  <label>Status</label>
                  <br />
                  <p>{product.isDisabled !== 1 ? "Active" : "Disabled"}</p>
                </div>
                <div className="col-12">
                  <label>Description</label>
                  <br />
                  <textarea
                    disabled
                    style={{ width: "100%", height: "60px", padding: "5px" }}
                  >
                    {product.description}
                  </textarea>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="btn btn-green"
            style={{ backgroundColor: "#0074d9", color: "white" }}
            onClick={this.gotoEdit}
          >
            EDIT
          </Button>
          <Button className="btn btn-red" onClick={this.goBack}>
            BACK
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  SERVICE: state.serviceProps
});
export default connect(mapStateToProps)(productDetail);
