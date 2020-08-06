import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import { store } from "react-notifications-component";

import Button from "@material-ui/core/Button";
import Select from "react-select";
import ServiceImg from "./hpadmin2.png";
import axios from "axios";
import CurrencyInput from "react-currency-masked-input";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
import "../Service/service.style.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

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
      imagePreviewUrl: "",
      loading: false,
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
        productId: product.productId,
        loading: true,
      });
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleImage = (e) => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    // handle upload image
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFile, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
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
      productId,
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
          merchantId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.userLogin.token}`,
          },
        }
      )
      .then((res) => {
        let message = res.data.message;
        if (res.data.codeNumber === 200) {
          store.addNotification({
            title: "SUCCESS!",
            message: `${message}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });
          setTimeout(() => {
            this.props.history.push("/app/merchants/profile/product");
          }, 800);
        } else {
          store.addNotification({
            title: "ERROR!",
            message: `${message}`,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });
        }
      });
  };

  render() {
    const product = this.props.SERVICE;
    const { category } = this.state;
    const mapCategory = category
      .filter((e) => e.categoryType !== "Service")
      .map((e) => (
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
    const serviceStatus = [
      { value: "0", label: "Active" },
      { value: "1", label: "Inactive" },
    ];

    return (
      <div className="react-transition swipe-up service-container">
        <h2 style={{ color: "#4251af" }}>Edit Product</h2>
        <div className="container Service" style={{ paddingLeft: "0px" }}>
          <div className="row">
            <div className="col-4">
              <label>Image*</label>
              <br />
              {$imagePreview}
              <div style={{ width: "85%" }}>
                <input
                  name="price"
                  type="file"
                  className="custom-input"
                  onChange={this.handleImage}
                  style={{
                    marginTop: "20px",
                  }}
                />
              </div>
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col-4">
                  <label>Product*</label>
                  <br />
                  <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label>SKU Number*</label>
                  <br />
                  <input
                    name="sku"
                    type="text"
                    value={this.state.sku}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label>Category*</label>
                  <br />

                  {this.state.loading && (
                    <Select
                      // styles={colourStyles}
                      options={this.state.category
                        .filter((e) => e.categoryType === "Product")
                        .map((e) => {
                          return {
                            id: e.categoryId,
                            value: e.categoryId,
                            label: e.name,
                          };
                        })}
                      defaultValue={{
                        value: this.state.categoryId,
                        label: product.categoryName,
                      }}
                      onChange={(selectedOption) => {
                        this.setState({ categoryId: selectedOption.value });
                      }}
                      placeholder="- Select -"
                      loadingMessage={() => "Fetching Service"}
                      noOptionsMessage={() => "Service appears here!"}
                    />
                  )}
                </div>
                <div className="col-4">
                  <label>Items In Stock*</label>
                  <div className="input-box">
                    <input
                      name="quantity"
                      type="number"
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    />
                    <span className="unit">Item</span>
                  </div>
                </div>
                <div className="col-4">
                  <label>Low Threshold*</label>
                  <div className="input-box">
                    <input
                      name="minThreshold"
                      type="number"
                      value={this.state.minThreshold}
                      onChange={this.handleChange}
                    />
                    <span className="unit">Item</span>
                  </div>
                </div>
                <div className="col-4">
                  <label>High Threshold *</label>
                  <div className="input-box">
                    <input
                      name="maxThreshold"
                      type="number"
                      value={this.state.maxThreshold}
                      onChange={this.handleChange}
                    />
                    <span className="unit">Item</span>
                  </div>
                </div>
                <div className="col-4">
                  <label>Price* </label>
                  <br />
                  <div className="input-box">
                    <CurrencyInput
                      name="price"
                      value={this.state.price}
                      onChange={(e, masked) => this.setState({ price: masked })}
                    />
                    <span className="unit">$</span>
                  </div>
                </div>
                <div className="col-4">
                  <label>Status*</label>
                  <br />

                  {this.state.loading && (
                    <Select
                      options={serviceStatus}
                      defaultValue={{
                        value: this.state.isDisabled,
                        label:
                          this.state.isDisabled === 0 ? "Active" : "Inactive",
                      }}
                      onChange={(e) => {
                        this.setState({ isDisabled: e.value });
                      }}
                    />
                  )}
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

          <div style={{ marginTop: "15px" }}>
            <Button
              className="btn btn-green"
              style={{ backgroundColor: "#4251af", color: "white" }}
              onClick={this.updateProduct}
            >
              SAVE
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
export default connect(mapStateToProps)(EditProduct);

// const colourStyles = {
//   control: (styles) => ({
//     ...styles,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     borderRadius: 0,
//   }),
//   input: (styles) => ({
//     ...styles,
//     borderWidth: 0,
//     fontSize: 16,
//     paddingLeft: 0,
//   }),
//   placeholder: (styles) => ({ ...styles }),
//   // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
// };
