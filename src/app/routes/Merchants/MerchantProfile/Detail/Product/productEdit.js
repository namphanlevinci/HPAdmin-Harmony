import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import URL, { upfileUrl } from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import ServiceImg from "./hpadmin2.png";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
import "../Service/service.style.scss";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      categoryId: "",
      description: "",
      price: "",
      tax: 0,
      discount: 0,
      fileId: "",
      name: "",
      isDisabled: "",
      quantity: "",
      maxThreshold: "",
      minThreshold: "",
      SKU: "",
      imageUrl: "",
      productId: "",
      //~ preview image
      imagePreviewUrl: ""
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
    const product = this.props.SERVICE;
    if (product !== null) {
      this.setState({
        categoryId: product.categoryId,
        description: product.description,
        price: product.price,
        tax: product.tax,
        discount: product.discount,
        fileId: product.fileId,
        name: product.name,
        isDisabled: product.isDisabled,
        quantity: product.quantity,
        maxThreshold: product.maxThreshold,
        minThreshold: product.minThreshold,
        sku: product.sku,
        imageUrl: product.imageUrl,
        productId: product.productId
      });
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  _handleImageChange = e => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
    // handle upload image
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    axios
      .post(upfileUrl, formData, config)
      .then(res => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch(err => {
        console.log(err);
      });
  };
  goBack = () => {
    this.props.history.push("/app/merchants/profile/product");
  };

  updateProduct = () => {
    const {
      categoryId,
      description,
      price,
      tax,
      discount,
      fileId,
      name,
      isDisabled,
      quantity,
      maxThreshold,
      minThreshold,
      sku,
      imageUrl,
      productId
    } = this.state;
    const merchantId = this.props.MerchantProfile.merchantId;

    axios
      .put(
        URL + "/product/" + productId,
        {
          categoryId,
          description,
          price,
          tax,
          discount,
          fileId,
          name,
          isDisabled,
          quantity,
          maxThreshold,
          minThreshold,
          sku,
          imageUrl,
          merchantId
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
          }
        }
      )
      .then(res => {
        let message = res.data.message;
        if (res.data.codeNumber === 200) {
          NotificationManager.success(message, null, 800);
          setTimeout(() => {
            this.props.history.push("/app/merchants/profile/product");
          }, 800);
        } else {
          NotificationManager.error(message, null, 800);
        }
      });
  };

  render() {
    const product = this.props.SERVICE;
    const { category } = this.state;
    const mapCategory = category
      .filter(e => e.categoryType !== "Product")
      .map(e => (
        <option value={e.categoryId} key={e.categoryId}>
          {e.name}
        </option>
      ));

    //~ preview image
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "250px", height: "250px" }}
          alt="void"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={this.state.imageUrl === "" ? ServiceImg : this.state.imageUrl}
          style={{ width: "250px", height: "250px" }}
          alt="void"
        />
      );
    }

    return (
      <div className="react-transition swipe-up service-container">
        <h2 style={{ color: "#0764b0" }}>Edit Product</h2>
        <NotificationContainer />
        <div className="container Service">
          <div className="row">
            <div className="col-5">
              <label>Image*</label>
              <br />
              {$imagePreview}
              <input
                name="price"
                type="file"
                onChange={this._handleImageChange}
                style={{
                  width: "auto",
                  borderBottom: "none",
                  paddingTop: "20px"
                }}
              />
            </div>
            <div className="col-7">
              <div className="row">
                <div className="col-4">
                  <label>Product</label>
                  <br />
                  <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label>SKU Number</label>
                  <br />
                  <input
                    name="sku"
                    type="text"
                    value={this.state.sku}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label>Category</label>
                  <br />
                  <select
                    onChange={e =>
                      this.setState({ categoryId: e.target.value })
                    }
                  >
                    <option value={product.categoryId}>
                      {product.categoryName}
                    </option>
                    {mapCategory}
                  </select>
                </div>
                <div className="col-4">
                  <label>Items In Stock*</label>
                  <br />
                  <input
                    name="quantity"
                    type="number"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label>Low Threshold</label>
                  <br />
                  <input
                    name="minThreshold"
                    type="number"
                    value={this.state.minThreshold}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label>Max Threshold</label>
                  <br />
                  <input
                    name="maxThreshold"
                    type="number"
                    value={this.state.maxThreshold}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label>Price ($)</label>
                  <br />
                  <input
                    name="price"
                    type="number"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label>Status</label>
                  <br />
                  <select
                    onChange={e =>
                      this.setState({ isDisabled: e.target.value })
                    }
                  >
                    <option value="0" selected={this.state.isDisabled === 0}>
                      Active
                    </option>
                    <option value="1" selected={this.state.isDisabled === 1}>
                      Disable
                    </option>
                  </select>
                </div>
                <div className="col-12">
                  <label>Description</label>
                  <br />
                  <textarea
                    style={{ width: "100%", height: "60px", padding: "5px" }}
                    onChange={this.handleChange}
                    name="description"
                    value={this.state.description}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            className="btn btn-green"
            style={{ backgroundColor: "#0074d9", color: "white" }}
            onClick={this.updateProduct}
          >
            SAVE
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
export default connect(mapStateToProps)(EditProduct);
