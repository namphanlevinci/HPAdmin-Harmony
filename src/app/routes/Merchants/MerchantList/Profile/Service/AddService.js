import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import { Formik, Form } from "formik";
import { WARNING_NOTIFICATION } from "../../../../../../constants/notificationConstants";
import {
  getCategoryByID,
  addMerchantServiceById,
  exportService,
  importService,
} from "../../../../../../actions/merchantActions";
import { AiOutlineClose } from "react-icons/ai";

import DialogContent from "@material-ui/core/DialogContent";
import ServiceImg from "../Product/hpadmin2.png";
import Extra from "./extra";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import LinearProgress from "../../../../../../util/linearProgress";
import CurrencyInput from "react-currency-masked-input";

import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";
import "../../../Merchants.css";
import "../Detail.css";

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
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const upFile = config.url.upFile;

class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
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
      supplyFee: 0,
      extraId: "",
      //~ preview image
      imagePreviewUrl: "",
      render: false,
      open: false,
      imageProgress: false,
    };
  }

  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    this.props.getCategoryByID(ID);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handePushValue = (e, values) => {
    console.log(e);
    this.setState({ extraId: e.id }, () => {
      // values.extras.map((value) => {
      //   if (value?.extraId !== e.id || values.extras.length === 0) {
      //     const newExtra = { ...e.extra };
      //     values.extras.push(newExtra);
      //   } else {
      //   }
      // });
    });
  };
  handleExport = () => {
    const ID = this.props.MerchantProfile.merchantId;
    this.props.exportService(ID);
  };

  handleUploadImage = (e) => {
    e.preventDefault();
    this.setState({ imageProgress: true });
    let file = e?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          this.setState({ fileId: res.data.data.fileId });
          let reader = new FileReader();
          reader.onloadend = () => {
            this.setState({
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
  handleAddTemplate = async (e) => {
    e.preventDefault();
    const merchantId = this.props.MerchantProfile.merchantId;
    let file = await e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(xlsx)$/)) {
      this.props.importService(merchantId, file);
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another file "
      );
    }
  };
  goBack = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const serviceStatus = [
      { value: "0", label: "Active" },
      { value: "1", label: "Inactive" },
    ];
    const extra = this.props.extraList.extraList;

    const extrasCondition =
      this.state.render === true
        ? Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Required"),
              duration: Yup.string().required("Required"),
              price: Yup.string().required("Required"),
              isDisabled: Yup.string().required("Required"),
              supplyFee: Yup.string().required("Required"),
            })
          )
        : "";

    const validationSchema = Yup.object().shape({
      extras: extrasCondition,
      name: Yup.string().required("Required"),
      categoryId: Yup.string().required("Required"),
      duration: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
      isDisabled: Yup.string().required("Required"),
      // supplyFee: Yup.string().required("Required"),
    });

    const ExtraInitialValues =
      this.state.render === true
        ? [
            {
              name: "",
              description: "",
              duration: "",
              price: "",
              isDisabled: 0,
              supplyFee: "",
            },
          ]
        : [];

    //~ preview image
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: 220, height: 160, marginBottom: "15px" }}
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={ServiceImg}
          style={{ width: 220, height: 160, marginBottom: "15px" }}
          alt="service"
        />
      );
    }
    let { categoryList: category } = this.props.categoryList;
    return (
      <div>
        <Button
          className="btn btn-green"
          style={{ marginRight: "10px" }}
          onClick={() => this.handleExport()}
        >
          EXPORT
        </Button>
        <div id="upload_button">
          <label>
            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => this.handleAddTemplate(e)}
            />
            <span
              style={{ margin: "0px", marginRight: 10 }}
              className="btn btn-green"
            >
              IMPORT
            </span>
          </label>
        </div>
        <Button
          className="btn btn-green"
          style={{ marginRight: "0px" }}
          onClick={this.handleClickOpen}
        >
          NEW SERVICE
        </Button>

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClickOpen}
          TransitionComponent={Transition}
        >
          <div
            onClick={this.goBack}
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <AiOutlineClose
              style={{ fontWeight: "bold", width: 30, height: 30 }}
            />
          </div>
          <DialogContent>
            <div className="profile-nav content-body">
              <div className="detail-content">
                <div className="service-container content-body">
                  <h2
                    style={{
                      color: "#0764B0",
                      marginBottom: "65px",
                      marginTop: 15,
                      textAlign: "center",
                      letterSpacing: 0.6,
                      fontWeight: 500,
                    }}
                  >
                    New Service
                  </h2>
                  <Formik
                    initialValues={{
                      name: "",
                      description: "",
                      duration: "",
                      openTime: 0,
                      secondTime: 0,
                      price: 0,
                      categoryId: "",
                      isDisabled: 0,
                      supplyFee: 0,
                      extras: ExtraInitialValues,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      const { discount, fileId } = this.state;
                      const merchantId = this.props.MerchantProfile.merchantId;

                      const payload = {
                        ...values,
                        discount,
                        fileId,
                        merchantId,
                        resetFirstPage : this.props.resetFirstPage,
                      };
                      this.props.addMerchantServiceById(payload);

                      this.setState({ open: false, imagePreviewUrl: "" });
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
                      isValidating,
                      /* and other goodies */
                    }) => (
                      <Form noValidate autoComplete="off">
                        <div className="container Service">
                          <div className="row">
                            <div className="col-7">
                              <div className="row">
                                <div className="col-4">
                                  <label
                                    style={{
                                      textAlign: "left",
                                      color: "#0764B0",
                                    }}
                                  >
                                    Category*
                                  </label>
                                  <br />
                                  <div>
                                    <Select
                                      styles={colourStyles}
                                      options={
                                        category
                                          ? category
                                              .filter(
                                                (e) =>
                                                  e.categoryType !== "Product"
                                              )
                                              .map((e) => {
                                                return {
                                                  id: e.categoryId,
                                                  value: e.categoryId,
                                                  label: e.name,
                                                };
                                              })
                                          : []
                                      }
                                      onChange={(selectedOption) => {
                                        setFieldValue(
                                          "categoryId",
                                          selectedOption.value
                                        );
                                      }}
                                      loadingMessage={() => "Fetching Service"}
                                      noOptionsMessage={() =>
                                        "Service appears here!"
                                      }
                                    />
                                  </div>

                                  {errors.categoryId && touched.categoryId && (
                                    <div className="input-feedback">
                                      {errors.categoryId}
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="col-12"
                                  style={{ marginTop: 40 }}
                                >
                                  <label style={{ color: "#0764B0" }}>
                                    Service*
                                  </label>
                                  <br />
                                  <input
                                    name="name"
                                    type="text"
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
                                    <div className="input-feedback">
                                      {errors.name}
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="col-12"
                                  style={{ marginTop: 40 }}
                                >
                                  <label style={{ color: "#0764B0" }}>
                                    Description
                                  </label>
                                  <br />
                                  <textarea
                                    name="description"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    style={styles.textarea}
                                  />
                                  <label
                                    style={{
                                      paddingTop: "10px",
                                      color: "#0764B0",
                                      marginBottom: 8,
                                    }}
                                  >
                                    Image
                                  </label>
                                  <br />
                                  <div>
                                    {$imagePreview}
                                    {this.state.imageProgress ? (
                                      <div
                                        style={{
                                          width: "35%",
                                          paddingBottom: "15px",
                                        }}
                                      >
                                        <LinearProgress />
                                      </div>
                                    ) : null}
                                    <div style={{ width: "35%" }}>
                                      <input
                                        style={styles.uploadBtn}
                                        name="price"
                                        type="file"
                                        className="custom-input"
                                        accept="image/gif,image/jpeg, image/png"
                                        onChange={this.handleUploadImage}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4" style={{ marginTop: 5 }}>
                                  <label style={{ color: "#0764B0" }}>
                                    Duration
                                  </label>
                                  <br />
                                  <label
                                    style={{ color: "#333", marginTop: "17px" }}
                                  >
                                    <span className="small-label">
                                      Minutes*
                                    </span>
                                  </label>
                                  <br />
                                  <div className="input-box">
                                    <input
                                      name="duration"
                                      type="number"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.duration}
                                      style={{
                                        borderBottomColor: "#dddddd",
                                        borderBottomWidth: 1,
                                      }}
                                      className={
                                        errors.duration && touched.duration
                                          ? "text-input error"
                                          : "text-input"
                                      }
                                    />
                                    <span className="unit">Min</span>
                                  </div>
                                  {errors.duration && touched.duration && (
                                    <div className="input-feedback">
                                      {errors.duration}
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="col-4"
                                  style={{ marginTop: 40 }}
                                >
                                  <label style={{ color: "#333" }}>
                                    <span className="small-label">
                                      Open Time
                                    </span>
                                  </label>
                                  <br />
                                  <div className="input-box">
                                    <input
                                      name="openTime"
                                      type="number"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.openTime}
                                      // placeholder="Min"
                                      style={{
                                        borderBottomColor: "#dddddd",
                                        borderBottomWidth: 1,
                                      }}
                                    />
                                    <span className="unit">Min</span>
                                  </div>
                                </div>

                                <div
                                  className="col-4"
                                  style={{ marginTop: 40 }}
                                >
                                  <label style={{ color: "#333" }}>
                                    <span className="small-label">
                                      Second Time
                                    </span>
                                  </label>
                                  <br />
                                  <div className="input-box">
                                    <input
                                      name="secondTime"
                                      type="number"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.secondTime}
                                      // placeholder="Min"
                                      style={{
                                        borderBottomColor: "#dddddd",
                                        borderBottomWidth: 1,
                                      }}
                                    />
                                    <span className="unit">Min</span>
                                  </div>
                                </div>

                                <div
                                  className="col-6"
                                  style={{ marginTop: 60 }}
                                >
                                  <label style={{ color: "#0764B0" }}>
                                    Price*
                                  </label>
                                  <br />
                                  <div className="input-box">
                                    <CurrencyInput
                                      name="price"
                                      type="tel"
                                      onChange={(e, masked) => [
                                        setFieldValue("price", e.target.value),
                                      ]}
                                      onBlur={handleBlur}
                                      value={values.price}
                                      style={{
                                        borderBottomColor: "#dddddd",
                                        borderBottomWidth: 1,
                                        marginTop: 4,
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
                                    <div className="input-feedback">
                                      {errors.price}
                                    </div>
                                  )}
                                </div>

                                <div
                                  className="col-6"
                                  style={{ marginTop: 60 }}
                                >
                                  <label style={{ color: "#0764B0" }}>
                                    Status*
                                  </label>
                                  <Select
                                    styles={colourStyles}
                                    options={serviceStatus}
                                    defaultInputValue="Active"
                                    onChange={(selectedOption) => {
                                      setFieldValue(
                                        "isDisabled",
                                        selectedOption.value
                                      );
                                    }}
                                  />
                                  {errors.isDisabled && touched.isDisabled && (
                                    <div className="input-feedback">
                                      {errors.isDisabled}
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="col-6"
                                  style={{ marginTop: 60 }}
                                >
                                  <label style={{ color: "#0764B0" }}>
                                    Surcharged
                                  </label>
                                  <br />
                                  <div className="input-box">
                                    <CurrencyInput
                                      name="supplyFee"
                                      onChange={(e, masked) => [
                                        setFieldValue(
                                          "supplyFee",
                                          e.target.value
                                        ),
                                      ]}
                                      type="tel"
                                      onBlur={handleBlur}
                                      value={values.supplyFee}
                                      style={{
                                        borderBottomColor: "#dddddd",
                                        borderBottomWidth: 1,
                                        marginTop: 4,
                                      }}
                                      className={
                                        errors.supplyFee && touched.supplyFee
                                          ? "text-input error"
                                          : "text-input"
                                      }
                                    />
                                    <span className="unit">$</span>
                                  </div>
                                  {/* {errors.supplyFee && touched.supplyFee && (
                                    <div className="input-feedback">
                                      {errors.supplyFee}
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </div>

                            {/* EXTRA BÊN NÀY */}
                            <div className="col-5">
                              <Extra
                                setFieldValue={setFieldValue}
                                validationSchema={validationSchema}
                                errors={errors}
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                touched={touched}
                              />
                              <p
                                style={{
                                  marginLeft: -15,
                                  color: "#4251af",
                                  fontWeight: "600",
                                  fontSize: 14,
                                  cursor: "pointer",
                                  letterSpacing: 0.3,
                                  marginBottom: 0,
                                }}
                              >
                                + Select Extra Existing
                              </p>
                              <label
                                style={{
                                  textAlign: "left",
                                  color: "#0764B0",
                                }}
                              >
                                Extra
                              </label>
                              <br />
                              <div>
                                <Select
                                  styles={colourStyles}
                                  options={
                                    extra
                                      ? extra
                                          .filter((e) => e.isDeleted === 0)
                                          .map((e) => {
                                            return {
                                              id: e.extraId,
                                              value: e.extraId,
                                              label: e.name,
                                              extra: e,
                                            };
                                          })
                                      : []
                                  }
                                  onChange={(e) => {
                                    this.handePushValue(e, values);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div style={{ paddingTop: "25px" }}>
                            <Button
                              className="btn btn-green"
                              style={{
                                backgroundColor: "#4154B3",
                                color: "white",
                              }}
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Save
                            </Button>
                            <Button
                              className="btn btn-red"
                              onClick={this.goBack}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

// const findElement = (array, id) => {
//   for (let i = 0; i < array.length; i++) {
//     if (array[i]?.extraId === id) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// };

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  categoryList: state.category,
  extraList: state.extra,
});

const mapDispatchToPros = (dispatch) => ({
  warningNotify: (message) => {
    dispatch({ type: WARNING_NOTIFICATION, payload: message });
  },
  getCategoryByID: (MerchantId) => {
    dispatch(getCategoryByID(MerchantId));
  },
  addMerchantServiceById: (payload) => {
    dispatch(addMerchantServiceById(payload));
  },
  exportService: (serviceId) => {
    dispatch(exportService(serviceId));
  },
  importService: (merchantID, file) => {
    dispatch(importService(merchantID, file));
  },
});

export default connect(mapStateToProps, mapDispatchToPros)(AddService);

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
  uploadBtn: {
    width: "50% !important",
  },
};
