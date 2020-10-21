import React, { Component } from "react";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Grid,
  FormHelperText,
  MenuItem,
} from "@material-ui/core";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../../../../../../actions/notifications/actions";
import axios from "axios";
import "../Detail.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import { config } from "../../../../../../url/url";

import "./category.styles.scss";

const URL = config.url.URL;

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const category = this.props.SERVICE;
    return (
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
                  Authorization: `Bearer ${this.props.userLogin.token}`,
                },
              }
            )
            .then((res) => {
              let message = res.data.message;
              if (res.data.codeNumber === 200) {
                this.props.successNotify(message);
                this.props.getCategory();
                this.props.toggleEdit();
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container className="edit-category">
              <Grid item xs={12}>
                <FormControl style={{ width: "50%" }}>
                  <InputLabel
                    className={
                      errors.categoryType && touched.categoryType
                        ? "error-text"
                        : ""
                    }
                  >
                    Category Type*
                  </InputLabel>
                  <Select
                    onChange={(e) => {
                      setFieldValue("categoryType", e.target.value);
                    }}
                    error={errors.categoryType && touched.categoryType}
                    value={values.categoryType}
                  >
                    <MenuItem value="Product">Product</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
                  </Select>
                  {errors.categoryType && touched.categoryType ? (
                    <FormHelperText className="error-text">
                      {errors.categoryType}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="name"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  label="Category Name*"
                  fullWidth
                  error={errors.name && Boolean(touched.name)}
                  helperText={errors.name && touched.name ? errors.name : ""}
                />
              </Grid>

              <div className="Disable-Button">
                <Button
                  style={{ marginTop: "20px", color: "#4251af" }}
                  className="btn btn-red"
                  onClick={this.props.toggleEdit}
                >
                  CANCEL
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
            </Grid>
          </form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
