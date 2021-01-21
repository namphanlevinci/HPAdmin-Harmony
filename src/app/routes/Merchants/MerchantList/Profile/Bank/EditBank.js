import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import { updateMerchantBankById } from "../../../../../../actions/merchantActions";
import { WARNING_NOTIFICATION } from "../../../../../../constants/notificationConstants";

import { Formik, Form } from "formik";
import { CustomTitle } from "../../../../../../util/CustomText";
import { Grid, Button, TextField } from "@material-ui/core";

import * as Yup from "yup";
import axios from "axios";
import LinearProgress from "../../../../../../util/linearProgress";
import InputCustom from "../../../../../../util/CustomInput";

const upFile = config.url.upFile;

class EditBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: "",
      loadingProgress: false,
      loading: false,
    };
  }
  async componentDidMount() {
    const data = this.props.MerchantProfile.businessBank;
    this.setState({
      data: data,
      loading: true,
    });
  }

  uploadFile = (e, setFieldValue) => {
    e.preventDefault();
    let file = e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      this.setState({ loadingProgress: true });
      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          setFieldValue(`fileId`, res.data.data.fileId);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result,
              loadingProgress: false,
            });
          };
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
    this.props.history.push("/app/merchants/profile/bank");
  };

  render() {
    const e = this.props.MerchantProfile;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img className="bankVoid" src={imagePreviewUrl} alt="void" />
      );
    } else {
      $imagePreview = (
        <img className="bankVoid" src={e?.businessBank?.imageUrl} alt="void" />
      );
    }

    return (
      <div className="react-transition swipe-up general-content">
        <div className="container-fluid">
          {this.state.loading && (
            <Formik
              initialValues={this.state.data}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                const ID = this.props.MerchantProfile.merchantId;
                const path = "/app/merchants/profile/bank";
                const payload = { ...values, ID, path };
                this.props.updateMerchantBankById(payload);
              }}
            >
              {({ errors, touched, handleChange, setFieldValue, values }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <CustomTitle value="Bank Information" />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        label="Account Holder Name*"
                        name="accountHolderName"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values?.accountHolderName}
                        error={
                          errors.accountHolderName && touched.accountHolderName
                        }
                        helperText={
                          errors.accountHolderName && touched.accountHolderName
                            ? errors.accountHolderName
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        label="Bank Name*"
                        name="name"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.name}
                        error={errors.name && touched.name}
                        helperText={
                          errors.name && touched.name ? errors.name : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Routing Number* (ABA)"
                        value={values.routingNumber}
                        onChange={handleChange}
                        fullWidth
                        name="routingNumber"
                        InputProps={{
                          inputComponent: InputCustom,
                        }}
                        inputProps={{
                          numericOnly: true,
                        }}
                        error={errors?.routingNumber && touched?.routingNumber}
                        helperText={
                          errors?.routingNumber && touched?.routingNumber
                            ? errors?.routingNumber
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Account Number* (DDA)"
                        value={values.accountNumber}
                        onChange={handleChange}
                        fullWidth
                        name="accountNumber"
                        InputProps={{
                          inputComponent: InputCustom,
                        }}
                        inputProps={{
                          creditCard: true,
                          delimiter: true,
                        }}
                        error={errors?.accountNumber && touched?.accountNumber}
                        helperText={
                          errors?.accountNumber && touched?.accountNumber
                            ? errors?.accountNumber
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4} md={3}>
                      <label>Void Check*</label> <br />
                      {$imagePreview}
                      <div style={{ width: "100%", marginTop: "15px" }}>
                        {this.state.loadingProgress ? <LinearProgress /> : null}
                      </div>
                      <input
                        type="file"
                        name="image"
                        id="file"
                        className="custom-input"
                        accept="image/gif,image/jpeg, image/png"
                        onChange={(e) => this.uploadFile(e, setFieldValue)}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: "20px" }}>
                    <Button className="btn btn-green" type="submit">
                      SAVE
                    </Button>
                    <Button className="btn btn-red" onClick={this.goBack}>
                      CANCEL
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
});
const mapDispatchToProps = (dispatch) => ({
  updateMerchantBankById: (payload) => {
    dispatch(updateMerchantBankById(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditBank);

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Bank name is required"),
  routingNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Routing number is required"),
  accountNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Account number is required"),
  accountHolderName: Yup.string()
    .min(2, "Too Short!")
    .required("Account holder name is required"),
});
