import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import { Grid } from "@material-ui/core";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Formik } from "formik";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
  WARNING_NOTIFICATION,
} from "../../../../../../actions/notifications/actions";

import FormHelperText from "@material-ui/core/FormHelperText";
import CustomCurrencyInput from "../../../../../../util/CustomCurrencyInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import ServiceImg from "./hpadmin2.png";
import axios from "axios";

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
    const merchantId = this.props.MerchantProfile.merchantId;

    this.setState({
      categoryId: product?.categoryId,
      description: product?.description,
      price: product?.price,
      tax: product?.tax,
      discount: product?.discount,
      fileId: product?.fileId,
      name: product?.name,
      isDisabled: product?.isDisabled,
      quantity: product?.quantity,
      maxThreshold: product?.maxThreshold,
      minThreshold: product?.minThreshold,
      sku: product?.sku,
      imageUrl: product?.imageUrl,
      productId: product?.productId,
      merchantId,
      loading: true,
    });
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleImage = (e, setFieldValue) => {
    e.preventDefault();
    // handle preview Image
    let reader = new FileReader();
    let file = e?.target?.files[0];

    if (!file?.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    } else {
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
          // this.setState({ fileId: res.data.data.fileId });
          setFieldValue("fileId", res.data.data.fileId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          style={{ width: "100%", height: "auto" }}
          alt="void"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={this.state.imageUrl === "" ? ServiceImg : this.state.imageUrl}
          style={{ width: "100%", height: "auto" }}
          alt="void"
        />
      );
    }

    return (
      <div className="react-transition swipe-up service-container">
        <h2 style={{ color: "#4251af", paddingBottom: "30px" }}>
          Edit Product
        </h2>

        {this.state.loading && (
          <Formik
            initialValues={this.state}
            validate={(values) => {
              const errors = {};
              if (!values?.name) {
                errors.name = "Required";
              }
              if (!values?.sku) {
                errors.sku = "Please enter SKU number";
              }
              if (!values?.categoryId) {
                errors.categoryId = "Please choose a category";
              }
              if (!values?.quantity) {
                errors.quantity = "Please enter quantity";
              }
              if (!values?.maxThreshold) {
                errors.maxThreshold = "Please enter max threshold";
              }
              if (!values?.minThreshold) {
                errors.minThreshold = "Please enter min threshold";
              }
              if (!values?.price) {
                errors.price = "Please enter price";
              }
              return errors;
            }}
            onSubmit={(
              values,
              { setSubmitting, setFieldError },
              setFieldValue
            ) => {
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
                productId,
                merchantId,
              } = values;

              let fileId = this.state.fileId;

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
                  if (message === "The SKU is exist.") {
                    setFieldError("sku", "SKU number already exits");
                    setSubmitting(false);
                  } else if (Number(res.data.codeNumber) === 200) {
                    this.props.successNotify(message);
                    setTimeout(() => {
                      this.props.history.push("/app/merchants/profile/product");
                    }, 800);
                  } else {
                    this.props.failureNotify(message);
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
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      style={{ width: "50%" }}
                      error={errors.categoryId && touched.categoryId}
                    >
                      <InputLabel>Category*</InputLabel>
                      <Select
                        defaultValue={values.categoryId}
                        value={values.categoryId}
                        displayEmpty
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
                      fullWidth
                      label="SKU Number*"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.sku}
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
                      value={values?.quantity}
                      error={touched.quantity && Boolean(errors.quantity)}
                      helperText={touched.quantity ? errors.quantity : ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Item</InputAdornment>
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
                      value={values?.name}
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
                      value={values?.minThreshold}
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
                          <InputAdornment position="start">Item</InputAdornment>
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
                      value={values?.maxThreshold}
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
                          <InputAdornment position="start">Item</InputAdornment>
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
                      value={values?.description}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      onChange={(e, masked) => setFieldValue("price", masked)}
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price ? errors.price : ""}
                      onBlur={handleBlur}
                      value={values?.price}
                      name="price"
                      label="Price*"
                      id="custom-price-input"
                      className={
                        errors.price && touched.price
                          ? "text-input error"
                          : "text-input"
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                        inputComponent: CustomCurrencyInput,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel>Status*</InputLabel>
                      <Select
                        onChange={(e) => {
                          setFieldValue("isDisabled", e.target.value);
                        }}
                        name="isDisabled"
                        value={values?.isDisabled}
                        displayEmpty
                      >
                        <MenuItem value={0}>Active</MenuItem>
                        <MenuItem value={1}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
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
                      <div style={{ marginTop: "10px" }}>
                        <input
                          type="file"
                          className="custom-input"
                          accept="image/gif,image/jpeg, image/png"
                          onChange={(e) => this.handleImage(e, setFieldValue)}
                        />
                      </div>
                    </div>

                    <Button
                      className="btn btn-green"
                      type="submit"
                      disabled={isSubmitting}
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
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
  SERVICE: state.serviceProps,
});

const mapDispatchToProps = (dispatch) => ({
  successNotify: (payload) => {
    dispatch(SUCCESS_NOTIFICATION(payload));
  },
  failureNotify: (payload) => {
    dispatch(FAILURE_NOTIFICATION(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

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
