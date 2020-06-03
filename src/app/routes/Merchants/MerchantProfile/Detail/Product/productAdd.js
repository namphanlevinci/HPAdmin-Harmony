import React, { Component } from "react";
import { connect } from "react-redux";
import URL, { upFileUrl } from "../../../../../../url/url";
import { store } from "react-notifications-component";
import { Formik } from "formik";

import Button from "@material-ui/core/Button";
import ServiceImg from "./hpadmin2.png";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
import "../Service/service.style.scss";

import { AiOutlineClose } from "react-icons/ai";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  }),
  input: (styles) => ({
    ...styles,
    borderWidth: 0,
    fontSize: 16,
    paddingLeft: 0,
  }),
  placeholder: (styles) => ({ ...styles }),
  // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
};

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
      isPopupProduct: false,
      //~ preview image
      imagePreviewUrl: "",
    };
  }

  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {
        this.setState({ category: res.data.data });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  _handleImageChange = (e) => {
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
      .post(upFileUrl, formData, config)
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

  render() {
    const { category } = this.state;
    // console.log("CATEGORY", category);
    // const mapCategory = category
    //   .filter((e) => e.categoryType !== "Service")
    //   .map((e) => (
    //     <option value={e.categoryId} key={e.categoryId}>
    //       {e.name}
    //     </option>
    //   ));

    const mapCategory2 = category
      .filter((e) => e.categoryType !== "Service")
      .map((e) => {
        return {
          value: e.categoryId,
          label: e.name,
        };
      });

    //~ preview image
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "120px", height: "120px", marginRight: 20 }}
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={ServiceImg}
          style={{ width: "120px", height: "120px", marginRight: 20 }}
          alt="service"
        />
      );
    }

    return (
      <div className="react-transition swipe-up service-container">
        <h2
          style={{
            color: "#4054B2",
            marginBottom: "50px",
            marginTop: 15,
            textAlign: "center",
            letterSpacing: 0.6,
          }}
        >
          New product
        </h2>
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
            sku: "",
          }}
          validate={(values) => {
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
              name,
              isDisabled,
              quantity,
              maxThreshold,
              minThreshold,
              sku,
            } = values;
            let fileId = this.state.fileId;
            axios
              .get(URL + "/product/checksku?sku=" + sku, {
                headers: {
                  Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
                },
              })
              .then((res) => {
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
                        sku,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
                        },
                      }
                    )
                    .then((res) => {
                      let message = res.data.message;
                      if (Number(res.data.codeNumber) === 200) {
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
                        this.props.closePopup();
                        setTimeout(() => {
                          this.props.getProduct();
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
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="container Service">
                <div
                  onClick={() => this.props.closePopup()}
                  style={{ position: "absolute", right: 30, top: 10 }}
                >
                  <AiOutlineClose
                    style={{ fontWeight: "bold", width: 30, height: 30 }}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="row">
                      <div className="col-6">
                        <label style={{ color: "#4054B2" }}>Category*</label>
                        <br />

                        <Select
                          styles={colourStyles}
                          options={mapCategory2}
                          onChange={(selectedOption) => {
                            setFieldValue("categoryId", selectedOption.value);
                          }}
                        />
                        {errors.categoryId && touched.categoryId && (
                          <div className="input-feedback">
                            {errors.categoryId}
                          </div>
                        )}
                      </div>
                      <div className="col-12" style={{ marginTop: 20 }}>
                        <br />
                        <input
                          name="name"
                          type="text"
                          placeholder="Product name*"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          style={{
                            borderBottomColor: "#dddddd",
                            borderBottomWidth: 1,
                          }}
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

                      <div className="col-12" style={{ marginTop: 20 }}>
                        <label style={{ color: "#4054B2" }}>Description</label>
                        <br />
                        <textarea
                          style={styles.textarea}
                          name="description"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                      </div>

                      <div className="col-md-9" style={{ marginTop: 20 }}>
                        <label
                          style={{ marginBottom: "20px", color: "#4054B2" }}
                        >
                          Image
                        </label>
                        <br />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {$imagePreview}
                          <input
                            name="price"
                            type="file"
                            onChange={this._handleImageChange}
                            style={{
                              width: "auto",
                              borderBottom: "none",
                              paddingTop: "20px",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-6" style={{ marginTop: 40 }}>
                        <input
                          name="sku"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.sku}
                          placeholder="SKU Number*"
                          style={{
                            borderBottomColor: "#dddddd",
                            borderBottomWidth: 1,
                            marginTop: 10,
                          }}
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
                      <div className="col-6" style={{ marginTop: 40 }}></div>
                      <div className="col-6" style={{ marginTop: 40 }}>
                        <label style={{ color: "#4054B2" }}>
                          Items in Stock*
                        </label>
                        <br />
                        <div class="input-box">
                          <input
                            name="quantity"
                            type="number"
                            // placeholder="Items in Stock*"
                            style={{
                              borderBottomColor: "#dddddd",
                              borderBottomWidth: 1,
                              width: "50%",
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.quantity}
                            className={
                              errors.quantity && touched.quantity
                                ? "text-input error"
                                : "text-input"
                            }
                          />
                          <span className="unit">Item</span>
                        </div>

                        {errors.quantity && touched.quantity && (
                          <div className="input-feedback">
                            {errors.quantity}
                          </div>
                        )}
                      </div>
                      <div className="col-6" style={{ marginTop: 40 }}></div>
                      <div className="col-6" style={{ marginTop: 40 }}>
                        <label style={{ color: "#4054B2" }}>
                          Low Threshold*
                        </label>
                        <br />
                        <div className="input-box">
                          <input
                            name="minThreshold"
                            type="number"
                            style={{
                              borderBottomColor: "#dddddd",
                              borderBottomWidth: 1,
                            }}
                            // placeholder="Item"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.minThreshold}
                            className={
                              errors.minThreshold && touched.minThreshold
                                ? "text-input error"
                                : "text-input"
                            }
                          />
                          <span className="unit">Item</span>
                        </div>
                        {errors.minThreshold && touched.minThreshold && (
                          <div className="input-feedback">
                            {errors.minThreshold}
                          </div>
                        )}
                      </div>
                      <div className="col-6" style={{ marginTop: 40 }}>
                        <label style={{ color: "#4054B2" }}>
                          Max Threshold*
                        </label>
                        <br />
                        <div className="input-box">
                          <input
                            name="maxThreshold"
                            type="number"
                            style={{
                              borderBottomColor: "#dddddd",
                              borderBottomWidth: 1,
                            }}
                            // placeholder="Item"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.maxThreshold}
                            className={
                              errors.maxThreshold && touched.maxThreshold
                                ? "text-input error"
                                : "text-input"
                            }
                          />
                          <span className="unit">Item</span>
                        </div>
                        {errors.maxThreshold && touched.maxThreshold && (
                          <div className="input-feedback">
                            {errors.maxThreshold}
                          </div>
                        )}
                      </div>
                      <div className="col-6" style={{ marginTop: 40 }}>
                        <label style={{ color: "#4054B2" }}>Price*</label>
                        <br />
                        <div class="input-box">
                          <input
                            name="price"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            style={{
                              marginTop: 5,
                              borderBottomWidth: 1,
                              borderBottomColor: "#dddddd",
                            }}
                            className={
                              errors.price && touched.price
                                ? "text-input error"
                                : "text-input"
                            }
                          />
                          <span className="unit">$</span>
                        </div>
                        {errors.price && touched.price && (
                          <div className="input-feedback">{errors.price}</div>
                        )}
                      </div>
                      <div className="col-6" style={{ marginTop: 40 }}>
                        <label style={{ color: "#4054B2" }}>Status</label>
                        <br />

                        <Select
                          styles={colourStyles}
                          options={[
                            { value: "0", label: "Active" },
                            { value: "1", label: "Disable" },
                          ]}
                          onChange={(selectedOption) => {
                            setFieldValue("isDisabled", selectedOption.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="btn btn-green"
                  style={{ backgroundColor: "#4251af", color: "white" }}
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginTop: 40,
                    backgroundColor: "#4054B2",
                    color: "white",
                  }}
                >
                  Save
                </Button>
                <Button
                  style={{ marginTop: 40 }}
                  className="btn btn-red"
                  onClick={() => this.props.closePopup()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  SERVICE: state.serviceProps,
});
export default connect(mapStateToProps)(AddProduct);

const styles = {
  textarea: {
    width: "100%",
    height: "70px",
    borderWidth: 1.2,
    borderColor: "#dddddd",
    borderStyle: "solid",
    borderRadius: 5,
    padding: "10px",
    marginTop: 8,
  },
  inputPrice: {
    width: "100px !important",
    borderBottom: "none",
    fontWeight: 400,
    margin: "80px 0px",
    paddingLeft: "20px",
  },
};
