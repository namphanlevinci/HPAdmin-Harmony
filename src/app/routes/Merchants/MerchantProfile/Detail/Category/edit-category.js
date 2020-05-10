import React, { Component } from "react";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import "../Detail.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import URL from "../../../../../../url/url";

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const category = this.props.SERVICE;
    return (
      <div className="Disable-Popup container Service">
        <div className="row">
          <div className="col-6 mx-auto">
            <h2 className="title">Edit Category</h2>
            <div>
              <Formik
                initialValues={{
                  categoryType: category.categoryType,
                  name: category.name,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.categoryType) {
                    errors.categoryType = "Please choose a Type";
                  }
                  if (!values.name) {
                    errors.name = "Please enter category name";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const { categoryType, name } = values;
                  const merchantId = category.merchantId;
                  const ID = category.categoryId;
                  axios
                    .put(
                      URL + "/category/" + ID,
                      {
                        categoryType,
                        name,
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
                        NotificationManager.success(message, null, 800);
                        setTimeout(() => {
                          this.props.history.push(
                            "/app/merchants/profile/category"
                          );
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
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <label style={{ padding: "10px 0px" }}>
                      Category Type*
                    </label>
                    <br />
                    <select
                      className={
                        errors.categoryType && touched.categoryType
                          ? "text-input error"
                          : "text-input"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="categoryType"
                      value={values.categoryType}
                    >
                      <option value="Product">Product</option>
                      <option value="Service">Service</option>
                    </select>
                    {errors.categoryType && touched.categoryType && (
                      <div className="input-feedback">
                        {errors.categoryType}
                      </div>
                    )}
                    <br />
                    <label style={{ padding: "10px 0px" }}>
                      Category Name*
                    </label>
                    <br />
                    <input
                      type="text"
                      name="name"
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
                    <div className="Disable-Button">
                      <Button
                        style={{ marginTop: "20px", color: "#4251af" }}
                        className="btn btn-red"
                        onClick={() =>
                          this.props.history.push(
                            "/app/merchants/profile/category"
                          )
                        }
                      >
                        BACK
                      </Button>
                      <Button
                        style={{
                          marginTop: "20px",
                          backgroundColor: "#4251af",
                          color: "white",
                        }}
                        className="btn btn-green"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        SAVE
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  SERVICE: state.serviceProps,
});
export default connect(mapStateToProps)(EditCategory);
