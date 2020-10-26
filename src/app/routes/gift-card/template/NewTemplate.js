import React, { Component } from "react";
import { connect } from "react-redux";
import { MdAddToPhotos } from "react-icons/md";
import { Formik } from "formik";
import { GET_TEMPLATE } from "../../../../actions/gift-card/actions";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
  WARNING_NOTIFICATION,
} from "../../../../actions/notifications/actions";
import { config } from "../../../../url/url";
import { CustomTitle } from "../../../../util/CustomText";
import { Grid, Button } from "@material-ui/core";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";

import DefaultImage from "./default.png";
import "../generation/generation.styles.scss";
import "./template.styles.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

class NewTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileId: 0,
      imagePreviewUrl: "",
      isConsumer: 0,
      isUploadImage: false,
    };
  }

  _uploadFile = (e) => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          isUploadImage: true,
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
        .post(upFile, formData, config)
        .then((res) => {
          this.setState({ fileId: res.data.data.fileId, isUploadImage: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ isUploadImage: false });
        });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  render() {
    const Group = [
      { value: "Happy Anniversary", label: "Happy Anniversary" },
      { value: "Happy Birthday", label: "Happy Birthday" },
      { value: "Happy New Year", label: "Happy New Year" },
      { value: "Happy Valentine", label: "Happy Valentine" },
      { value: "Thank You", label: "Thank You" },
      { value: "I Love You", label: "I Love You" },
      { value: "Merry Christmas", label: "Merry Christmas" },
    ];

    const Status = [
      { value: "0", label: "Active" },
      { value: "1", label: "Disable" },
    ];

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img className="template-img" src={imagePreviewUrl} alt="void" />
      );
    } else {
      $imagePreview = (
        <img className="template-img" src={DefaultImage} alt="void" />
      );
    }

    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.template-add" />}
        />
        <div className="giftcard">
          <Formik
            initialValues={{
              giftCardTemplateName: "",
              giftCardType: "",
              isDisabled: 0,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.giftCardTemplateName) {
                errors.giftCardTemplateName = "Required";
              }
              if (!values.giftCardType) {
                errors.giftCardType = "Required";
              }
              if (!values.isDisabled) {
                errors.isDisabled = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { giftCardTemplateName, giftCardType, isDisabled } = values;
              const { fileId, isConsumer } = this.state;
              // resetForm();
              axios
                .post(
                  URL + "/giftcardtemplate",
                  {
                    giftCardTemplateName,
                    giftCardType,
                    isConsumer,
                    fileId,
                    isDisabled: Number(isDisabled),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.props.userLogin.token}`,
                    },
                  }
                )
                .then((res) => {
                  if (res.data.message === "Success") {
                    this.props.SuccessNotify(res.data.message);
                    this.props.history.push("/app/giftcard/template");
                  } else {
                    this.props.FailureNotify(res.data.message);
                  }
                })
                .catch((error) => console.log(error));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              resetForm,
            }) => (
              <React.Fragment>
                <form onSubmit={handleSubmit}>
                  <div className="id-and-btn">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <MdAddToPhotos size={23} />
                      <h3
                        style={{
                          paddingLeft: "13px",
                          fontWeight: "400",
                          fontSize: "21px",
                        }}
                      >
                        New Template
                      </h3>
                    </div>

                    <div>
                      <Button
                        className="btn btn-green"
                        onClick={() =>
                          this.props.history.push("/app/giftcard/template")
                        }
                      >
                        BACK
                      </Button>
                      <Button
                        className="btn btn-red"
                        type="submit"
                        disabled={this.state.isUploadImage}
                      >
                        SAVE
                      </Button>
                    </div>
                  </div>
                  <Grid
                    container
                    spacing={3}
                    className="information container-fluid"
                  >
                    <Grid item xs={12}>
                      <CustomTitle value="General Information" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        style={{ marginTop: "16px", width: "100%" }}
                        type="text"
                        name="giftCardTemplateName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Template Name"
                        value={values.giftCardTemplateName}
                        error={
                          errors.giftCardTemplateName &&
                          touched.giftCardTemplateName
                        }
                        helperText={
                          errors.giftCardTemplateName &&
                          touched.giftCardTemplateName
                            ? errors.giftCardTemplateName
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <h4>Group</h4>
                      <Select
                        options={Group}
                        onChange={(selectedOption) => {
                          setFieldValue("giftCardType", selectedOption.value);
                        }}
                        placeholder="Select Group"
                        value={this.state.group}
                      />
                      {errors.giftCardType && touched.giftCardType && (
                        <div className="input-feedback">
                          {errors.giftCardType}
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <h4>Status</h4>
                      <Select
                        options={Status}
                        onChange={(selectedOption) => {
                          setFieldValue("isDisabled", selectedOption.value);
                        }}
                        placeholder="Select Status"
                        value={this.state.isDisabled}
                      />
                      {errors.isDisabled && touched.isDisabled && (
                        <div className="input-feedback">
                          {errors.isDisabled}
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <h4>Image</h4>

                      {this.state.isUploadImage ? (
                        <div style={{ padding: "20px", textAlign: "center" }}>
                          <CircularProgress size={50} />
                        </div>
                      ) : (
                        <div className="image__container">{$imagePreview}</div>
                      )}

                      <input
                        type="file"
                        className="custom-input"
                        accept="image/gif,image/jpeg, image/png"
                        onChange={(e) => this._uploadFile(e)}
                        style={{ width: "100%", border: "none" }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Checkbox
                        id="isConsumer"
                        onChange={(e) =>
                          this.setState({ isConsumer: e.target.value })
                        }
                        value="1"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        style={{ color: "#4251af" }}
                      />
                      Visible on Consumer App
                    </Grid>
                  </Grid>
                </form>
              </React.Fragment>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Template: state.GiftCardReducer.template,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  GET_TEMPLATE: () => {
    dispatch(GET_TEMPLATE());
  },
  SuccessNotify: (message) => {
    dispatch(SUCCESS_NOTIFICATION(message));
  },
  FailureNotify: (message) => {
    dispatch(FAILURE_NOTIFICATION(message));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewTemplate);
