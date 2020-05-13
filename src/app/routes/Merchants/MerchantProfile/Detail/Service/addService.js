import React, { Component } from "react";
import { connect } from "react-redux";
import URL, { upFileUrl } from "../../../../../../url/url";
import { Formik, Form } from "formik";
import { store } from "react-notifications-component";

import ServiceImg from "../service.png";
import Extra from "./extra";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import * as Yup from "yup";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
import "./service.style.scss";
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
      //~ preview image
      imagePreviewUrl: "",
      render: false,
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
    this.props.history.push("/app/merchants/profile/service");
  };

  render() {
    const serviceStatus = [
      { value: "0", label: "Active" },
      { value: "1", label: "Disable" },
    ];

    const extrasCondition =
      this.state.render === true
        ? Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Required"),
              duration: Yup.string().required("Required"),
              price: Yup.string().required("Required"),
              isDisabled: Yup.string().required("Required"),
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
    });

    const ExtraInitialValues =
      this.state.render === true
        ? [
            {
              name: "",
              description: "",
              duration: "",
              price: "",
              isDisabled: "",
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
          style={{ width: "200px", height: "200px", marginBottom: "30px" }}
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={ServiceImg}
          style={{ width: "200px", height: "200px", marginBottom: "30px" }}
          alt="service"
        />
      );
    }

    return (
      <div className="react-transition swipe-up service-container">
        <h2 style={{ color: "#4251af", marginBottom: "40px" }}>Add Service</h2>
        <Formik
          initialValues={{
            name: "",
            description: "",
            duration: "",
            openTime: 0,
            secondTime: 0,
            price: "",
            categoryId: "",
            isDisabled: "",
            extras: ExtraInitialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const {
              categoryId,
              name,
              description,
              duration,
              openTime,
              secondTime,
              price,
              extras,
              isDisabled,
            } = values;
            const { discount, fileId } = this.state;
            const merchantId = this.props.MerchantProfile.merchantId;

            axios
              .post(
                URL + "/service",
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
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
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
                  <div className="col-6 ">
                    <div className="row">
                      <div className="col-6">
                        <label>Category *</label>
                        <br />
                        <div>
                          <Select
                            options={this.state.category
                              .filter((e) => e.categoryType !== "Product")
                              .map((e) => {
                                return {
                                  id: e.categoryId,
                                  value: e.categoryId,
                                  label: e.name,
                                };
                              })}
                            onChange={(selectedOption) => {
                              setFieldValue("categoryId", selectedOption.value);
                            }}
                            placeholder="Select"
                            loadingMessage={() => "Fetching Service"}
                            noOptionsMessage={() => "Service appears here!"}
                          />
                        </div>

                        {errors.categoryId && touched.categoryId && (
                          <div className="input-feedback">
                            {errors.categoryId}
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <label>Service Name *</label>
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
                      <div className="col-12">
                        <label>Description</label>
                        <br />
                        <textarea
                          name="description"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          style={{
                            width: "100%",
                            height: "70px",
                            padding: "10px",
                            borderWidth: 1,
                            borderColor: "#dddddd",
                            borderStyle: "solid",
                            borderRadius: 5,
                          }}
                        />
                        <label style={{ paddingTop: "10px" }}>Image</label>
                        <br />
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          {$imagePreview}
                          <input
                            name="price"
                            type="file"
                            onChange={this._handleImageChange}
                            style={{
                              width: "100px !important",
                              borderBottom: "none",
                              fontWeight: 400,
                              margin: "80px 0px",
                              paddingLeft: "20px",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-4">
                        <label>
                          Duration *
                          <span className="small-label"> (Minutes)</span>
                        </label>
                        <br />
                        <input
                          name="duration"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.duration}
                          placeholder="Min"
                          className={
                            errors.duration && touched.duration
                              ? "text-input error"
                              : "text-input"
                          }
                        />

                        {errors.duration && touched.duration && (
                          <div className="input-feedback">
                            {errors.duration}
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        <label>
                          Open Time
                          <span className="small-label"> (Minutes)</span>
                        </label>
                        <br />
                        <input
                          name="openTime"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.openTime}
                          placeholder="Min"
                        />
                      </div>
                      <div className="col-4">
                        <label>
                          Second Time
                          <span className="small-label"> (Minutes)</span>
                        </label>
                        <br />
                        <input
                          name="secondTime"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.secondTime}
                          placeholder="Min"
                          className={
                            errors.secondTime && touched.secondTime
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.secondTime && touched.secondTime && (
                          <div className="input-feedback">
                            {errors.secondTime}
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <label>Status</label>
                        <br />
                        <Select
                          options={serviceStatus}
                          onChange={(selectedOption) => {
                            setFieldValue("isDisabled", selectedOption.value);
                          }}
                        />
                        {errors.isDisabled && touched.isDisabled && (
                          <div className="input-feedback">
                            {errors.isDisabled}
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <label>Price *</label>
                        <br />
                        <input
                          name="price"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                          placeholder="$"
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
                    </div>
                  </div>

                  {/* EXTRA BÊN NÀY */}
                  <div className="col-6">
                    {this.state.render === false ? (
                      <p
                        className="extra-btn"
                        onClick={() => this.setState({ render: true })}
                      >
                        Add Extra
                      </p>
                    ) : (
                      <Extra
                        setFieldValue={setFieldValue}
                        validationSchema={validationSchema}
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                      />
                    )}
                  </div>
                </div>

                <Button
                  className="btn btn-green"
                  style={{ backgroundColor: "#4251af", color: "white" }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  ADD
                </Button>
                <Button className="btn btn-red" onClick={this.goBack}>
                  BACK
                </Button>
              </div>
            </Form>
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
export default connect(mapStateToProps)(AddService);
