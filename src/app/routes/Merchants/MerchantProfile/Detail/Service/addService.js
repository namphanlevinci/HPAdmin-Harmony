import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import URL, { upfileUrl } from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import * as Yup from "yup";
import { FieldArray, Field, Formik, FastField } from "formik";
import ServiceImg from "../service.png";
import Extra from "./extra";

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
      render: false
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
      .then(
        res => {
          this.setState({ category: res.data.data });
        },
        () => console.log("CATEGORY", this.state.category)
      );
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
    this.props.history.push("/app/merchants/profile/service");
  };

  render() {
    const schema = Yup.object().shape({
      friends: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .min(2, "too short")
            .required("Required")
        })
      )
    });

    const { category } = this.state;
    const mapCategory = category
      .filter(e => e.categoryType !== "Product")
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
          style={{ width: "150px", height: "150px" }}
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={ServiceImg}
          style={{ width: "150px", height: "150px" }}
          alt="service"
        />
      );
    }

    return (
      <div className="react-transition swipe-up service-container">
        <h2 style={{ color: "#0764b0" }}>Add Service</h2>
        <NotificationContainer />

        <Formik
          initialValues={{
            name: "",
            description: "",
            duration: "",
            openTime: "",
            secondTime: "",
            price: "",
            categoryId: "",
            extras: [
              {
                name: "",
                description: "",
                duration: "",
                price: "",
                isDisabled: ""
              }
            ]
          }}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.categoryId) {
              errors.categoryId = "Please choose a category";
            }
            if (!values.duration) {
              errors.duration = "Please enter duration";
            }
            if (!values.price) {
              errors.price = "Please enter price";
            }
            if (!values.name) {
              errors.extras = "Requried";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("NEW VALUES", values);
            const {
              categoryId,
              name,
              description,
              duration,
              openTime,
              secondTime,
              price,
              extras
            } = values;
            const { discount, isDisabled, fileId } = this.state;
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
                  merchantId
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
                  }
                }
              )
              .then(res => {
                let message = res.data.message;
                if (res.data.codeNumber === 200) {
                  NotificationManager.success(message, null, 800);
                  setTimeout(() => {
                    this.props.history.push("/app/merchants/profile/service");
                  }, 800);
                } else {
                  NotificationManager.error(message, null, 800);
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
                  <div className="col-6 ">
                    <div className="row">
                      <div className="col-6">
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
                          <option value="">Please Choose Category</option>
                          {mapCategory}
                        </select>
                        {errors.categoryId && touched.categoryId && (
                          <div className="input-feedback">
                            {errors.categoryId}
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <label>Service Name*</label>
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
                      <div className="col-md-12">
                        <label>Description</label>
                        <br />
                        <input
                          name="description"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                        <label style={{ paddingTop: "10px" }}>Image*</label>
                        <br />
                        {$imagePreview}
                        <input
                          name="price"
                          type="file"
                          onChange={this._handleImageChange}
                          style={{
                            width: "auto",
                            borderBottom: "none",
                            paddingTop: "20px",
                            fontWeight: 400
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <label>
                          Duration*
                          <span className="small-label"> (Minutes)</span>
                        </label>
                        <br />
                        <input
                          name="duration"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.duration}
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
                      <div className="col-md-4">
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
                        />
                      </div>
                      <div className="col-md-4">
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
                    </div>
                  </div>

                  {/* EXTRA BÊN NÀY */}
                  <div className="col-6">
                    {this.state.render === true ? null : (
                      <p
                        className="extra-btn"
                        onClick={() => this.setState({ render: true })}
                      >
                        Add Extra
                      </p>
                    )}
                    {this.state.render === true && (
                      <Extra
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    )}
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
export default connect(mapStateToProps)(AddService);
