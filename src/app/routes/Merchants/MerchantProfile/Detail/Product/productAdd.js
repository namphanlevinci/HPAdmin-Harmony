import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import URL, { upfileUrl } from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Formik } from "formik";

import ServiceImg from "./hpadmin2.png";
import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
import "../Service/service.style.scss";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      categoryId: 0,
      categoryName: "",
      description: "",
      discount: 0,
      fileId: 0,
      name: "",
      openTime: 0,
      position: 0,
      price: 0,
      secondTime: 0,
      serviceId: 0,
      duration: 0,
      isDisabled: 0,
      imageUrl: "",
      extras: [],
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

  render() {
    const { category } = this.state;
    const mapCategory = category
      .filter(e => e.categoryType !== "Service")
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
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={ServiceImg}
          style={{ width: "250px", height: "250px" }}
          alt="service"
        />
      );
    }

    return (
      <div className="react-transition swipe-up service-container">
        <h2 style={{ color: "#0764b0", marginBottom: "40px" }}>Add Product</h2>
        <NotificationContainer />

        <Formik
          initialValues={{
            categoryId: "",
            description: "",
            price: "",
            tax: 0,
            discount: 0,
            fileId: 0,
            name: "",
            isDisabled: 0,
            quantity: "",
            maxThreshold: "",
            minThreshold: "",
            sku: ""
          }}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.sku) {
              errors.sku = "Please enter SKU number";
            }
            if (!values.categoryId) {
              errors.categoryId = "Please choose a category";
            }
            if (!values.quantity) {
              errors.quantity = "Please enter quantity";
            }
            if (!values.maxThreshold) {
              errors.maxThreshold = "Please enter max threshold";
            }
            if (!values.minThreshold) {
              errors.minThreshold = "Please enter min threshold";
            }
            if (!values.price) {
              errors.price = "Please enter price";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
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
              sku
            } = values;
            axios
              .get(URL + "/product/checksku?sku=" + sku, {
                headers: {
                  Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
                }
              })
              .then(res => {
                if (Number(res.data.codeNumber) === 404) {
                  setFieldError("sku", "SKU NUMBER ALREADY EXITS");
                  setSubmitting(false);
                } else {
                  axios
                    .post(
                      URL + "/product",
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
                        sku
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
                        }
                      }
                    )
                    .then(res => {
                      let message = res.data.message;
                      if (Number(res.data.codeNumber) === 200) {
                        NotificationManager.success(message, null, 800);
                        setTimeout(() => {
                          this.props.history.push(
                            "/app/merchants/profile/product"
                          );
                        }, 800);
                      } else {
                        NotificationManager.error(message, null, 800);
                      }
                    });
                }
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="container Service">
                <div className="row">
                  <div className="col-md-5">
                    <label style={{ marginBottom: "20px" }}>Image</label>
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
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-4">
                        <label>Category*</label>
                        <br />
                        <select
                          name="categoryId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.categoryId}
                          className={
                            errors.categoryId && touched.categoryId
                              ? "text-input error"
                              : "text-input"
                          }
                        >
                          <option value="">Select</option>
                          {mapCategory}
                        </select>
                        {errors.categoryId && touched.categoryId && (
                          <div className="input-feedback">
                            {errors.categoryId}
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        <label>Product Name*</label>
                        <br />
                        <input
                          name="name"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          className={
                            errors.name && touched.name
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.name && touched.name && (
                          <div className="input-feedback">{errors.name}</div>
                        )}
                      </div>
                      <div className="col-4">
                        <label>SKU Number*</label>
                        <br />
                        <input
                          name="sku"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.sku}
                          className={
                            errors.sku && touched.sku
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.sku && touched.sku && (
                          <div className="input-feedback">{errors.sku}</div>
                        )}
                      </div>
                      <div className="col-4">
                        <label>Items in Stock*</label>
                        <br />
                        <input
                          name="quantity"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}
                          className={
                            errors.quantity && touched.quantity
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.quantity && touched.quantity && (
                          <div className="input-feedback">
                            {errors.quantity}
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        <label>Min Threshold*</label>
                        <br />
                        <input
                          name="minThreshold"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.minThreshold}
                          className={
                            errors.minThreshold && touched.minThreshold
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.minThreshold && touched.minThreshold && (
                          <div className="input-feedback">
                            {errors.minThreshold}
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        <label>Max Threshold*</label>
                        <br />
                        <input
                          name="maxThreshold"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.maxThreshold}
                          className={
                            errors.maxThreshold && touched.maxThreshold
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.maxThreshold && touched.maxThreshold && (
                          <div className="input-feedback">
                            {errors.maxThreshold}
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <label>Price*</label>
                        <br />
                        <input
                          name="price"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                          className={
                            errors.price && touched.price
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.price && touched.price && (
                          <div className="input-feedback">{errors.price}</div>
                        )}
                      </div>
                      <div className="col-6">
                        <label>Status</label>
                        <br />
                        <select
                          onChange={e =>
                            this.setState({ isDisabled: e.target.value })
                          }
                        >
                          <option value="0" checked>
                            Active
                          </option>
                          <option value="1">Disable</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <label>Description</label>
                        <br />
                        <textarea
                          style={{
                            width: "100%",
                            height: "60px",
                            padding: "5px"
                          }}
                          name="description"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="btn btn-green"
                  style={{ backgroundColor: "#0074d9", color: "white" }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  ADD
                </Button>
                <Button className="btn btn-red" onClick={this.goBack}>
                  BACK
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  SERVICE: state.serviceProps
});
export default connect(mapStateToProps)(AddProduct);
