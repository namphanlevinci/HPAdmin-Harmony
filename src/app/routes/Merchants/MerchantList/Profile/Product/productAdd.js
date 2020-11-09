import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import { Formik } from "formik";
import { BsGridFill } from "react-icons/bs";
import {
  getCategoryByID,
  addMerchantProductById,
} from "../../../../../../actions/merchantActions";

import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";

import Button from "@material-ui/core/Button";
import ServiceImg from "./hpadmin2.png";
import axios from "axios";
import FormHelperText from "@material-ui/core/FormHelperText";
import IntlMessages from "../../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../../components/ContainerHeader/index";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CustomCurrencyInput from "../../../../../../util/CustomCurrencyInput";

import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";
import "../../../Merchants.css";
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
      price: "",
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
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.getCategoryByID(merchantId);
  }

  uploadImage = (e) => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
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
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  goBack = () => {
    this.props.history.push("/app/merchants/profile/product");
  };

  render() {
    const { categoryList: category } = this.props.category;

    const { loading } = this.props.addProduct;

    const mapCategory2 = category
      ?.filter((e) => e?.categoryType !== "Service")
      ?.map((e) => {
        return <MenuItem value={e.categoryId}>{e.name}</MenuItem>;
      });

    //~ preview image
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "60%", height: "auto", marginRight: 20 }}
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={ServiceImg}
          style={{ width: "60%", height: "auto", marginRight: 20 }}
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
              let fileId = this.state.fileId;
              const merchantId = this.props.MerchantProfile.merchantId;
              const path = "/app/merchants/profile/product";
              const payload = { ...values, merchantId, fileId, path };
              this.props.addMerchantProductById(payload);
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
                <Grid container spacing={3}>
                  {/* <div className="Service"> */}
                  <Grid item xs={12} md={6}>
                    <FormControl
                      style={{ width: "50%" }}
                      error={errors.categoryId && touched.categoryId}
                    >
                      <InputLabel>Category*</InputLabel>
                      <Select
                        onChange={(e) => {
                          setFieldValue("categoryId", e.target.value);
                        }}
                      >
                        {mapCategory2}
                      </Select>
                      {errors.categoryId && touched.categoryId && (
                        <FormHelperText>Required</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                      }}
                      error={touched.sku && Boolean(errors.sku)}
                      helperText={touched.sku ? errors.sku : ""}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                  </Grid>

                  <Grid item xs={12} md={3}>
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
                  </Grid>

                  <Grid item xs={12} md={6}>
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
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl>
                      <InputLabel htmlFor="formatted-text-mask-input">
                        Price*
                      </InputLabel>
                      <Input
                        onChange={(e, masked) => setFieldValue("price", masked)}
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price ? errors.price : ""}
                        onBlur={handleBlur}
                        value={values.price}
                        margin="normal"
                        name="price"
                        id="custom-price-input"
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
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel>Status*</InputLabel>
                      <Select
                        onChange={(e) => {
                          setFieldValue("isDisabled", e.target.value);
                        }}
                        name="isDisabled"
                        value={values.isDisabled}
                        displayEmpty
                      >
                        <MenuItem value={0}>Active</MenuItem>
                        <MenuItem value={1}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                      <div style={{ marginTop: "10px", width: "60%" }}>
                        <input
                          type="file"
                          className="custom-input"
                          accept="image/gif,image/jpeg, image/png"
                          onChange={this.uploadImage}
                        />
                      </div>
                    </div>

                    <Button
                      className="btn btn-green"
                      type="submit"
                      disabled={loading}
                      style={{
                        marginTop: 25,
                        backgroundColor: "#4054B2",
                        color: "white",
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      style={{ marginTop: 25 }}
                      className="btn btn-red"
                      onClick={() => this.props.history.goBack()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  userLogin: state.userReducer.User,
  category: state.category,
  addProduct: state.addProduct,
});

const mapDispatchToProps = (dispatch) => ({
  addMerchantProductById: (payload) => {
    dispatch(addMerchantProductById(payload));
  },
  getCategoryByID: (merchantId) => {
    dispatch(getCategoryByID(merchantId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

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
