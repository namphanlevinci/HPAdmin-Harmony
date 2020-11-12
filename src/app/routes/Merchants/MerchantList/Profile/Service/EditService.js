import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { WARNING_NOTIFICATION } from "../../../../../../actions/notifications/actions";
import {
  getServiceByID,
  updateMerchantServiceById,
} from "../../../../../../actions/merchantActions";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { CustomTitle } from "../../../../../../util/CustomText";
import Extra from "./Extra";
import axios from "axios";
import { config } from "../../../../../../url/url";
import * as Yup from "yup";
import LinearProgress from "../../../../../../util/linearProgress";

import "./service.style.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

class EditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      categoryId: "",
      categoryName: "",
      description: "",
      discount: "",
      fileId: "",
      name: "",
      openTime: "",
      position: "",
      price: "",
      secondTime: "",
      serviceId: "",
      duration: "",
      isDisabled: "",
      imageUrl: "",
      extras: [],
      //~ preview image
      imagePreviewUrl: "",
      loading: false,
      imageProgress: false,
    };
  }
  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;

    this.props.getServiceByID(ID);

    const service = this.props.updateService;
    if (service !== null) {
      this.setState(
        {
          categoryId: service.categoryId,
          categoryName: service.categoryName,
          description: service.description,
          discount: service.discount,
          fileId: service.fileId,
          name: service.name,
          openTime: service.openTime,
          secondTime: service.secondTime,
          position: service.position,
          price: Number(service.price).toFixed(2),
          supplyFee: service.supplyFee,
          duration: service.duration,
          isDisabled: service.isDisabled,
          imageUrl: service.imageUrl,
          extras: service.extras,
          serviceId: service.serviceId,
        },
        () => this.setState({ loading: true })
      );
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadImage = (e) => {
    e.preventDefault();
    let file = e?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      this.setState({ imageProgress: true });
      // handle upload image
      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          let reader = new FileReader();
          reader.onloadend = () => {
            this.setState({
              fileId: res.data.data.fileId,
              file: file,
              imagePreviewUrl: reader.result,
              imageProgress: false,
            });
          };
          reader.readAsDataURL(file);
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
    this.props.history.push("/app/merchants/profile/service");
  };

  updateService = () => {
    const merchantId = this.props.MerchantProfile.merchantId;
    const path = "/app/merchants/profile/service";
    const payload = { ...this.state, merchantId, path };

    this.props.updateMerchantServiceById(payload);
  };

  render() {
    const service = this.props.updateService;

    let { categoryList: category, loading } = this.props.categoryList;

    //~ preview image
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "100%", height: "auto", maxHeight: "220px" }}
          alt="void"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={this.state.imageUrl}
          style={{ width: "100%", height: "auto", maxHeight: "220px" }}
          alt="void"
        />
      );
    }

    const validationSchema =
      service.extras.length > 0
        ? Yup.object().shape({
            extras: Yup.array().of(
              Yup.object().shape({
                name: Yup.string().min(3, "too short").required("Required"),
                duration: Yup.string().required("Required"),
                price: Yup.string().required("Required"),
                isDisabled: Yup.string().required("Required"),
              })
            ),
          })
        : null;

    //FORMIK VALIDATE

    const extraItem =
      service?.extras.length !== 0
        ? service?.extras.filter((e) => e?.isDeleted !== 1)
        : null;
    return (
      <div
        className="react-transition swipe-up service-container"
        style={{ paddingBottom: "50px" }}
      >
        <Grid container spacing={3} className="profile-nav content-body">
          <Grid item xs={12}>
            <CustomTitle
              value="Edit Service"
              styles={{
                marginBottom: "65px",
                marginTop: 2,
                textAlign: "center",
                letterSpacing: 0.6,
                fontWeight: 500,
              }}
            />
          </Grid>

          <Grid item xs={7}>
            <Grid item xs={6}>
              {this.state.loading && (
                <FormControl style={{ width: "100%", marginTop: "16px" }}>
                  <InputLabel>Category*</InputLabel>
                  <Select
                    value={this.state.categoryId}
                    onChange={(e) => {
                      this.setState({ categoryId: e.target.value });
                    }}
                  >
                    {category
                      ? category
                          .filter((e) => e.categoryType !== "Product")
                          .map((e) => (
                            <MenuItem key={e.categoryId} value={e.categoryId}>
                              {e.name}
                            </MenuItem>
                          ))
                      : []}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Service Name*"
                fullWidth
                margin="normal"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                style={{
                  borderBottomColor: "#dddddd",
                  borderBottomWidth: 1,
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Description"
                margin="normal"
                fullWidth
                name="description"
                type="text"
                multiline
                variant="outlined"
                rows={4}
                value={this.state.description}
                onChange={this.handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <label
                style={{
                  paddingTop: "10px",
                  color: "#4251af",
                  marginBottom: 8,
                }}
              >
                Image
              </label>
              <br />
              {$imagePreview}
              {this.state.imageProgress ? (
                <div
                  style={{
                    width: "35%",
                    paddingBottom: "15px",
                    marginTop: "15px",
                  }}
                >
                  <LinearProgress />
                </div>
              ) : null}
              <input
                style={{ marginTop: "20px" }}
                name="price"
                type="file"
                className="custom-input"
                accept="image/gif,image/jpeg, image/png"
                onChange={this.uploadImage}
              />
            </Grid>
            <Grid item xs={12}>
              <label style={{ color: "#4251af", marginTop: "10px" }}>
                Duration
              </label>{" "}
              <br />
              <TextField
                style={styles.duration}
                label="Minutes*"
                name="duration"
                type="number"
                margin="normal"
                value={this.state.duration}
                onChange={this.handleChange}
                placeholder="Min"
                InputProps={{
                  startAdornment: (
                    <span
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      Min
                    </span>
                  ),
                }}
              />
              <TextField
                style={styles.duration}
                label="Open Time"
                name="openTime"
                type="number"
                margin="normal"
                value={this.state.openTime}
                onChange={this.handleChange}
                placeholder="Min"
                InputProps={{
                  startAdornment: (
                    <span
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      Min
                    </span>
                  ),
                }}
              />
              <TextField
                style={styles.duration}
                label="Second Time"
                name="secondTime"
                type="number"
                margin="normal"
                value={this.state.secondTime}
                onChange={this.handleChange}
                placeholder="Min"
                InputProps={{
                  startAdornment: (
                    <span
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      Min
                    </span>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    label="Price*"
                    name="price"
                    margin="normal"
                    fullWidth
                    value={this.state.price}
                    onChange={this.handleChange}
                    placeholder="$"
                    InputProps={{
                      startAdornment: (
                        <span
                          style={{
                            paddingRight: "10px",
                          }}
                        >
                          $
                        </span>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  {this.state.loading && (
                    <FormControl style={{ width: "100%", marginTop: "16px" }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={this.state.isDisabled}
                        onChange={(e) => {
                          this.setState({ isDisabled: e.value });
                        }}
                      >
                        <MenuItem value={0}>Active</MenuItem>
                        <MenuItem value={1}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Surcharged"
                    name="supplyFee"
                    margin="normal"
                    fullWidth
                    value={this.state.supplyFee}
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: (
                        <span
                          style={{
                            paddingRight: "10px",
                          }}
                        >
                          $
                        </span>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <Formik
              initialValues={{ extras: extraItem }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                if (values.extras === null) {
                  this.setState({
                    extras: [],
                  });
                } else {
                  this.setState({
                    extras: values.extras,
                  });
                }

                this.updateService();
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <Extra
                    setFieldValue={setFieldValue}
                    validationSchema={validationSchema}
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    loading={this.state.loading}
                  />

                  <div className="Save-fixed-bottom">
                    <Button
                      className="btn btn-green"
                      type="submit"
                      style={{
                        backgroundColor: "#4251af",
                        color: "white",
                      }}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      SAVE
                    </Button>
                    <Button className="btn btn-red" onClick={this.goBack}>
                      CANCEL
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  service: state.service,
  updateService: state.updateService.service,
  categoryList: state.category,
});

const mapDispatchToProps = (dispatch) => ({
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
  getServiceByID: (MerchantId) => {
    dispatch(getServiceByID(MerchantId));
  },
  updateMerchantServiceById: (payload) => {
    dispatch(updateMerchantServiceById(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditService);

const styles = {
  duration: {
    marginRight: "20px",
  },
};
