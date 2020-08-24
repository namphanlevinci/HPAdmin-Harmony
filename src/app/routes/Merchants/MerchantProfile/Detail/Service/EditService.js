import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { store } from "react-notifications-component";

import Extra from "./extra";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { config } from "../../../../../../url/url";
import * as Yup from "yup";
import Select from "react-select";
import LinearProgress from "../../../../../../util/linearProgress";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
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
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        this.setState({ category: res.data.data });
      });
    const service = this.props.SERVICE;
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

  _handleImageChange = (e) => {
    e.preventDefault();
    this.setState({ imageProgress: true });
    // handle preview Image

    let file = e.target.files[0];

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
  };
  goBack = () => {
    this.props.history.push("/app/merchants/profile/service");
  };

  updateService = () => {
    const {
      categoryId,
      name,
      duration,
      description,
      openTime,
      secondTime,
      price,
      discount,
      isDisabled,
      fileId,
      serviceId,
      supplyFee,
    } = this.state;
    const extras = this.state.extras.length !== 0 ? this.state.extras : [];
    const merchantId = this.props.MerchantProfile.merchantId;
    axios
      .put(
        URL + "/service/" + serviceId,
        {
          categoryId,
          name,
          duration,
          description,
          openTime,
          secondTime,
          price,
          discount,
          isDisabled,
          fileId,
          extras,
          merchantId,
          supplyFee,
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
            this.props.history.push("/app/merchants/profile/service");
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
    const serviceStatus = [
      { value: "0", label: "Active" },
      { value: "1", label: "Inactive" },
    ];
    const service = this.props.SERVICE;

    //~ preview image
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "220px", height: "160px" }}
          alt="void"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={this.state.imageUrl}
          style={{ width: "220px", height: "160px" }}
          alt="void"
        />
      );
    }

    //FORMIK VALIDATE
    const validationSchema = Yup.object().shape({
      extras: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .min(3, "too short")
            .required("Required"),
          duration: Yup.string().required("Required"),
          price: Yup.string().required("Required"),
          isDisabled: Yup.string().required("Required"),
        })
      ),
    });

    const extraItem =
      service?.extras.length !== 0
        ? service?.extras.filter((e) => e?.isDeleted !== 1)
        : null;
    return (
      <div
        className="react-transition swipe-up service-container"
        style={{ paddingBottom: "50px" }}
      >
        <div className="profile-nav content-body">
          <div className="detail-content">
            <div className="service-container content-body">
              <h2
                style={{
                  color: "#4251af",
                  marginBottom: "65px",
                  marginTop: 2,
                  textAlign: "center",
                  letterSpacing: 0.6,
                  fontWeight: 500,
                }}
              >
                Edit Service
              </h2>
              <div className="container Service">
                <div className="row">
                  <div className="col-7">
                    <div className="row">
                      <div className="col-4">
                        <label
                          style={{
                            textAlign: "left",
                            color: "#4251af",
                          }}
                        >
                          Category*
                        </label>
                        <br />
                        <Select
                          styles={colourStyles}
                          options={
                            this.state.category
                              ? this.state.category
                                  .filter((e) => e.categoryType !== "Product")
                                  .map((e) => {
                                    return {
                                      id: e.categoryId,
                                      value: e.categoryId,
                                      label: e.name,
                                    };
                                  })
                              : []
                          }
                          defaultValue={{
                            value: this.state.categoryId,
                            label: this.state.categoryId,
                          }}
                          value={this.state.category
                            .filter(
                              (e) =>
                                e.categoryType !== "Product" &&
                                e.categoryId === this.state.categoryId
                            )
                            .map((e) => {
                              return {
                                label: e.name,
                                value: e.categoryId,
                              };
                            })}
                          onChange={(selectedOption) => {
                            this.setState({ categoryId: selectedOption.value });
                          }}
                          placeholder="- Select -"
                          loadingMessage={() => "Fetching Service"}
                          noOptionsMessage={() => "Service appears here!"}
                        />
                      </div>
                      <div className="col-12" style={{ marginTop: 40 }}>
                        <label style={{ color: "#4251af" }}>
                          Service Name*
                        </label>
                        <br />
                        <input
                          name="name"
                          type="text"
                          value={this.state.name}
                          onChange={this.handleChange}
                          style={{
                            borderBottomColor: "#dddddd",
                            borderBottomWidth: 1,
                          }}
                        />
                      </div>
                      <div className="col-12" style={{ marginTop: 40 }}>
                        <label style={{ color: "#4251af" }}>Description</label>
                        <br />
                        <textarea
                          name="description"
                          type="text"
                          value={this.state.description}
                          onChange={this.handleChange}
                          style={styles.textarea}
                        />
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

                        <div>
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

                          <div style={{ width: "35%" }}>
                            <input
                              style={{ marginTop: "20px" }}
                              name="price"
                              type="file"
                              className="custom-input"
                              onChange={this._handleImageChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-4" style={{ marginTop: 5 }}>
                        <label style={{ color: "#4251af" }}>Duration</label>
                        <br />
                        <label>
                          <span className="small-label">Minutes*</span>
                        </label>
                        <br />
                        <div className="input-box">
                          <input
                            name="duration"
                            type="number"
                            value={this.state.duration}
                            onChange={this.handleChange}
                            placeholder="Min"
                            style={{
                              borderBottomColor: "#dddddd",
                              borderBottomWidth: 1,
                            }}
                          />{" "}
                          <span className="unit">Min</span>
                        </div>
                      </div>
                      <div className="col-4" style={{ marginTop: "30px" }}>
                        <label>
                          <span className="small-label">Open Time</span>
                        </label>
                        <br />
                        <div className="input-box">
                          <input
                            name="openTime"
                            type="number"
                            value={this.state.openTime}
                            onChange={this.handleChange}
                            placeholder="Min"
                            style={{
                              borderBottomColor: "#dddddd",
                              borderBottomWidth: 1,
                            }}
                          />
                          <span className="unit">Min</span>
                        </div>
                      </div>
                      <div className="col-4" style={{ marginTop: "30px" }}>
                        <label>
                          <span className="small-label">Second Time</span>
                        </label>
                        <br />
                        <div className="input-box">
                          <input
                            name="secondTime"
                            type="number"
                            value={this.state.secondTime}
                            onChange={this.handleChange}
                            placeholder="Min"
                            style={{
                              borderBottomColor: "#dddddd",
                              borderBottomWidth: 1,
                            }}
                          />
                          <span className="unit">Min</span>
                        </div>
                      </div>
                      <div className="col-6" style={{ marginTop: 20 }}>
                        <label style={{ color: "#4251af" }}>Price*</label>
                        <br />
                        <div className="input-box">
                          <input
                            name="price"
                            // type="number"
                            value={this.state.price}
                            onChange={this.handleChange}
                            placeholder="$"
                            style={{
                              borderBottomColor: "#dddddd",
                              borderBottomWidth: 1,
                              marginTop: 10,
                            }}
                          />
                          <span className="unit">$</span>
                        </div>
                      </div>
                      <div className="col-6" style={{ marginTop: 20 }}>
                        <label style={{ color: "#4251af" }}>Status*</label>
                        <br />
                        <div style={{ marginTop: 7 }}>
                          {this.state.loading && (
                            <Select
                              styles={colourStyles}
                              options={serviceStatus}
                              defaultValue={{
                                value: this.state.isDisabled,
                                label:
                                  Number(this.state.isDisabled) === 0
                                    ? "Active"
                                    : "Inactive",
                              }}
                              onChange={(e) => {
                                this.setState({ isDisabled: e.value });
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-6" style={{ marginTop: 20 }}>
                        <label style={{ color: "#4251af" }}>Surcharged*</label>
                        <br />
                        <div className="input-box">
                          <input
                            name="supplyFee"
                            value={this.state.supplyFee}
                            onChange={this.handleChange}
                            // placeholder="$"
                            style={{
                              borderBottomColor: "#dddddd",
                              borderBottomWidth: 1,
                              marginTop: 4,
                            }}
                          />
                          <span className="unit">$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <Formik
                      initialValues={{ extras: extraItem }}
                      validationSchema={validationSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        this.setState({
                          extras: values.extras,
                        });
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
                        /* and other goodies */
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
                            <Button
                              className="btn btn-red"
                              onClick={this.goBack}
                            >
                              CANCEL
                            </Button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
export default connect(mapStateToProps)(EditService);

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
