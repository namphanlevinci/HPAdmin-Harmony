import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Grid,
  FormHelperText,
  MenuItem,
  Button,
} from "@material-ui/core";

import { updateMerchantCategoryById } from "../../../../../../actions/merchantActions";

import "../Detail.css";
import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";
import "../../../Merchants.css";

import "./category.styles.scss";

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const category = this.props.category;
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
          const merchantId = category.merchantId;
          const categoryId = category.categoryId;

          const payload = {
            ...values,
            merchantId,
            categoryId,
          };
          this.props.updateMerchantCategoryById(payload);
          this.props.toggleEdit();
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
            <Grid container className="edit-category" style={{ width: "100%" }}>
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
                  style={{ marginTop: "20px", color: "#0764B0" }}
                  className="btn btn-red"
                  onClick={this.props.toggleEdit}
                >
                  CANCEL
                </Button>
                <Button
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#0764B0",
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
  category: state.category.category,
});

const mapDispatchToProps = (dispatch) => ({
  updateMerchantCategoryById: (payload) => {
    dispatch(updateMerchantCategoryById(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
