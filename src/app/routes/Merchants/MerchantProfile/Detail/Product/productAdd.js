import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import { store } from "react-notifications-component";
import { Formik } from "formik";
import { BsGridFill } from "react-icons/bs";

import Button from "@material-ui/core/Button";
import ServiceImg from "./hpadmin2.png";
import axios from "axios";
import FormHelperText from "@material-ui/core/FormHelperText";
import IntlMessages from "../../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../../components/ContainerHeader/index";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import CustomCurrencyInput from "../../../../../../util/CustomCurrencyInput";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
import "../Service/service.style.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

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
          Authorization: `Bearer ${this.props.userLogin.token}`,
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

  render() {
    const { category } = this.state;

    const mapCategory2 = category
      .filter((e) => e.categoryType !== "Service")
      .map((e) => {
        return <MenuItem value={e.categoryId}>{e.name}</MenuItem>;
      });

    //~ preview image
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "180px", height: "180px", marginRight: 20 }}
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={ServiceImg}
          style={{ width: "180px", height: "180px", marginRight: 20 }}
          alt="service"
        />
      );
    }

    return (
      <div className="container-fluid content-list">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.newProduct" />}
          disableBreadcrumb={true}
        />
        <div className="react-transition swipe-up service-container page-heading add__product">
          <div style={{ display: "flex", alignItems: "center" }}>
            <BsGridFill size={23} style={{ color: "black" }} />
            <h2
              style={{
                marginTop: 13,
                paddingLeft: "10px",
                letterSpacing: 0.6,
                fontWeight: 500,
              }}
            >
              New Product
            </h2>
          </div>

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
                    Authorization: `Bearer ${this.props.userLogin.token}`,
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
                            Authorization: `Bearer ${this.props.userLogin.token}`,
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

                          setTimeout(() => {
                            this.props.history.push(
                              "/app/merchants/profile/product"
                            );
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
              <form onSubmit={handleSubmit} noValidate>
                <div className="container Service">
                  <div className="row">
                    <div className="col-6" style={{ paddingLeft: "0px" }}>
                      <div>
                        <FormControl
                          style={{ width: "50%" }}
                          error={errors.categoryId && touched.categoryId}
                        >
                          <InputLabel>Category*</InputLabel>
                          <Select
                            onChange={(selectedOption) => {
                              setFieldValue("categoryId", selectedOption.value);
                            }}
                          >
                            {mapCategory2}
                          </Select>
                          {errors.categoryId && touched.categoryId && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>
                      </div>
                    </div>
                    <div className="col-3" style={{ marginTop: 6 }}>
                      <TextField
                        name="sku"
                        type="text"
                        label="SKU Number*"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sku}
                        style={{
                          borderBottomColor: "#dddddd",
                          borderBottomWidth: 1,
                          marginTop: 10,
                        }}
                        error={touched.sku && Boolean(errors.sku)}
                        helperText={touched.sku ? errors.sku : ""}
                      />
                    </div>
                    <div className="col-3" style={{ marginTop: 13 }}>
                      <TextField
                        name="quantity"
                        type="number"
                        label=" Items In Stock*"
                        style={{
                          borderBottomColor: "#dddddd",
                          borderBottomWidth: 1,
                          width: "100%",
                          textAlign: "end",
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.quantity}
                        error={touched.quantity && Boolean(errors.quantity)}
                        helperText={touched.quantity ? errors.quantity : ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <p style={styles.p}>Item</p>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div
                      className="col-6"
                      style={{ marginTop: 15, paddingLeft: "0px" }}
                    >
                      <TextField
                        name="name"
                        type="text"
                        label="Product Name*"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        style={{
                          borderBottomColor: "#dddddd",
                          borderBottomWidth: 1,
                          width: "100%",
                        }}
                        // variant="outlined"
                        error={errors.name && touched.name}
                        helperText={touched.name ? errors.name : ""}
                      />
                    </div>
                    <div className="col-3" style={{ marginTop: 15 }}>
                      <TextField
                        name="minThreshold"
                        type="number"
                        label="Low Threshold*"
                        style={{
                          borderBottomColor: "#dddddd",
                          borderBottomWidth: 1,
                          width: "100%",
                          textAlign: "end",
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.minThreshold}
                        error={
                          touched.minThreshold && Boolean(errors.minThreshold)
                        }
                        helperText={
                          touched.minThreshold ? errors.minThreshold : ""
                        }
                        className={
                          errors.minThreshold && touched.minThreshold
                            ? "text-input error"
                            : "text-input"
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <p style={styles.p}>Item</p>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <div className="col-3" style={{ marginTop: 15 }}>
                      <TextField
                        name="maxThreshold"
                        type="number"
                        label="  High Threshold*"
                        style={{
                          borderBottomColor: "#dddddd",
                          borderBottomWidth: 1,
                          width: "100%",
                          textAlign: "end",
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.maxThreshold}
                        error={
                          touched.maxThreshold && Boolean(errors.maxThreshold)
                        }
                        helperText={
                          touched.maxThreshold ? errors.maxThreshold : ""
                        }
                        className={
                          errors.maxThreshold && touched.maxThreshold
                            ? "text-input error"
                            : "text-input"
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <p style={styles.p}>Item</p>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <div
                      className="col-6"
                      style={{ marginTop: 15, paddingLeft: "0px" }}
                    >
                      <label
                        style={{
                          color: "#4054B2",
                          fontSize: "14px",
                        }}
                      >
                        Description
                      </label>
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

                    <div className="col-3">
                      <FormControl>
                        <InputLabel htmlFor="formatted-text-mask-input">
                          Price*
                        </InputLabel>
                        <Input
                          onChange={(e, masked) =>
                            setFieldValue("price", masked)
                          }
                          onBlur={handleBlur}
                          value={values.price}
                          name="price"
                          id="custom-price-input"
                          error={touched.price && errors.price}
                          helperText={touched.price ? errors.price : ""}
                          className={
                            errors.price && touched.price
                              ? "text-input error"
                              : "text-input"
                          }
                          startAdornment={
                            <InputAdornment position="start">
                              <p style={styles.p}>$</p>
                            </InputAdornment>
                          }
                          inputComponent={CustomCurrencyInput}
                        />
                      </FormControl>
                    </div>

                    <div className="col-3">
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel>Status*</InputLabel>
                        <Select
                          onChange={(selectedOption) => {
                            setFieldValue("isDisabled", selectedOption.value);
                          }}
                          name="isDisabled"
                          value={values.isDisabled}
                        >
                          <MenuItem value={0}>Active</MenuItem>
                          <MenuItem value={1}>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div
                      className="col-md-9"
                      style={{ marginTop: 20, paddingLeft: "0px" }}
                    >
                      <label
                        style={{
                          marginBottom: "15px",
                          color: "#4054B2",
                          fontSize: "14px",
                        }}
                      >
                        Image
                      </label>
                      <br />
                      <div
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {$imagePreview}
                        <br />
                        <div style={{ marginTop: "10px", width: "23%" }}>
                          <input
                            type="file"
                            className="custom-input"
                            onChange={this._handleImageChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="btn btn-green"
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
                    onClick={() => this.props.history.goBack()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Formik>
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
  p: {
    marginBottom: 0,
    fontSize: "15px",
  },
};
