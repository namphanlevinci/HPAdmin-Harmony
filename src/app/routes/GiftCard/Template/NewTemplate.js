import React, { Component } from "react";
import { connect } from "react-redux";
import { MdAddToPhotos } from "react-icons/md";
import { Formik } from "formik";
import { addTemplateByID } from "../../../../actions/giftCardActions";

import { config } from "../../../../url/url";
import { CustomTitle } from "../../../../util/CustomText";
import { Grid, Button } from "@material-ui/core";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
// import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";

import DefaultImage from "./default.png";

import "../Generation/generation.styles.scss";
import "./template.styles.scss";

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

  updateImage = (e) => {
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
              if (values.isDisabled === "") {
                errors.isDisabled = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { fileId, isConsumer } = this.state;
              const { isDisabled } = values;
              const path = "/app/giftcard/template";
              const payload = {
                ...values,
                isDisabled: Number(isDisabled),
                fileId,
                isConsumer,
                path,
              };
              this.props.addTemplateByID(payload);
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
                        label="Template Name*"
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
                      <FormControl
                        style={{ width: "100%", paddingTop: "12px" }}
                      >
                        <InputLabel>Group*</InputLabel>
                        <Select
                          name="giftCardType"
                          value={values.giftCardType}
                          onChange={handleChange}
                          error={errors.giftCardType && touched.giftCardType}
                        >
                          <MenuItem value="Happy Anniversary">
                            Happy Anniversary
                          </MenuItem>
                          <MenuItem value="Happy Birthday">
                            Happy Birthday
                          </MenuItem>
                          <MenuItem value="Happy New Year">
                            Happy New Year
                          </MenuItem>
                          <MenuItem value="Happy Valentine">
                            Happy Valentine
                          </MenuItem>
                          <MenuItem value="Thank You">Thank You</MenuItem>
                          <MenuItem value="I Love You">I Love You</MenuItem>
                          <MenuItem value="Merry Christmas">
                            Merry Christmas
                          </MenuItem>
                        </Select>
                      </FormControl>

                      {errors.giftCardType && touched.giftCardType && (
                        <FormHelperText className="input-feedback">
                          {errors.giftCardType}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl
                        style={{ width: "100%", paddingTop: "12px" }}
                      >
                        <InputLabel>Status*</InputLabel>
                        <Select
                          name="isDisabled"
                          value={values.isDisabled}
                          onChange={handleChange}
                        >
                          <MenuItem value={0}>Active</MenuItem>
                          <MenuItem value={1}>Disable</MenuItem>
                        </Select>
                      </FormControl>

                      {errors.isDisabled && touched.isDisabled && (
                        <FormHelperText className="input-feedback">
                          {errors.isDisabled}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <h4>Image</h4>

                      {
                        this.state.isUploadImage ?
                          (
                            <div style={{ padding: "20px", textAlign: "center" }}>
                              <CircularProgress size={50} />
                            </div>
                          )
                          :
                          (<div className="image__container">{$imagePreview}</div>)
                      }

                      <input
                        type="file"
                        className="custom-input"
                        accept="image/gif,image/jpeg, image/png"
                        onChange={(e) => this.updateImage(e)}
                        style={{ width: "100%", border: "none" , marginTop : 20 }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Checkbox
                        id="isConsumer"
                        onChange={(e) => this.setState({ isConsumer: e.target.value })}
                        value="1"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        style={{ color: "#0764B0" }}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addTemplateByID: (payload) => {
    dispatch(addTemplateByID(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewTemplate);
