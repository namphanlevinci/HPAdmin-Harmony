import React, { Component } from "react";
import { TextField, Grid, Button, InputAdornment } from "@material-ui/core";
import { CustomTitle } from "../../../../../../util/CustomText";
import { Formik } from "formik";
import { connect } from "react-redux";
import { addGiftCardByMerchantId } from "../../../../../../actions/merchantActions";

class AddGiftCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <CustomTitle value="General Information" />
        <Formik
          initialValues={{ Name: "", Amount: 0, quantity: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.Name) {
              errors.Name = "Name is required";
            }
            if (values.Amount === "") {
              errors.Amount = "Value is required";
            }
            if (!values.quantity) {
              errors.quantity = "Quantity is required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const MerchantId = this.props.MerchantProfile.merchantId;
            const path = "/app/merchants/profile/gift-card";
            const payload = { ...values, path, MerchantId };

            this.props.addGiftCard(payload);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    type="text"
                    name="Name"
                    label="Gift Card Label*"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Name}
                    fullWidth
                    error={errors.Name && touched.Name}
                    helperText={errors.Name && touched.Name ? errors.Name : ""}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quantity}
                    label="Qty*"
                    fullWidth
                    error={errors.quantity && touched.quantity}
                    helperText={
                      errors.quantity && touched.quantity ? errors.quantity : ""
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="Amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Amount}
                    label="Value*"
                    fullWidth
                    inputProps={{ type: "number" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    error={errors.Amount && touched.Amount}
                    helperText={
                      errors.Amount && touched.Amount ? errors.Amount : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "20px" }}>
                  <Button
                    className="btn btn-red"
                    onClick={this.props.history.goBack}
                  >
                    CANCEL
                  </Button>
                  <Button className="btn btn-green " type="submit">
                    GENERATE
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
});

const mapDispatchToProps = (dispatch) => ({
  addGiftCard: (payload) => {
    dispatch(addGiftCardByMerchantId(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddGiftCard);
