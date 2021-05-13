import React, { Component } from "react";
import { connect } from "react-redux";
import { MdAddToPhotos } from "react-icons/md";
import { Formik } from "formik";
import {
  updateTemplateByID,
  archiveTemplateByID,
} from "../../../../actions/giftCardActions";

import { config } from "../../../../url/url";
import { Button, Grid } from "@material-ui/core";
import { CustomTitle } from "../../../../util/CustomText";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";

import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "../DeleteGeneration";
import DefaultImage from "./default.png";

import "../Generation/generation.styles.scss";
import "./template.styles.scss";

const upFile = config.url.upFile;

class EditTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileId: 0,
      imagePreviewUrl: "",
      isConsumer: 0,
      openDelete: false,
      isChecked: false,
      loading: false,
      isUploadImage: false,
    };
  }

  componentDidMount() {
    const Data = this.props.Detail;
    this.setState({
      fileId: Data?.fileId,
      imagePreviewUrl: Data?.imageUrl,
      giftCardTemplateName: Data?.giftCardTemplateName,
      isDisabled: Data?.isDisabled,
      giftCardType: Data?.giftCardType,
      isConsumer: Data?.isConsumer,
      isChecked: Number(Data?.isConsumer) === 1 ? true : false,
      ID: Data?.giftCardTemplateId,
      loading: true,
    });
  }

  handleCheckbox = (event, setFieldValue) => {
    if (event) {
      setFieldValue("isConsumer", 1);
      setFieldValue("isChecked", event);
    } else {
      setFieldValue("isConsumer", 0);
      setFieldValue("isChecked", event);
    }
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  handleDeleteTemplate = () => {
    const templateId = this.state.ID;
    const path = "/app/giftcard/template";
    this.props.archiveTemplateByID(templateId, path);
  };

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
      { value: 0, label: "Active" },
      { value: 1, label: "Inactive" },
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
          <Delete
            handleCloseDelete={this.handleCloseDelete}
            open={this.state.openDelete}
            deleteGeneration={this.handleDeleteTemplate}
            text={"Template"}
          />
          <Formik
            initialValues={this.state}
            enableReinitialize={true}
            validate={(values) => {
              const errors = {};
              if (!values.giftCardTemplateName) {
                errors.giftCardTemplateName = "Required";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const path = "/app/giftcard/template";
              const { ID, fieldId } = this.state;
              const payload = { ...values, ID, fieldId, path };
              this.props.updateTemplateByID(payload);
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
            }) => (
              <React.Fragment>
                <form onSubmit={handleSubmit}>
                  <div className="id-and-btn">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <MdAddToPhotos size={23} />
                      <h3 style={{ paddingLeft: "5px" }}>Edit Template</h3>
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
                      {/* <Button
                        className="btn btn-green"
                        onClick={() => this.setState({ openDelete: true })}
                      >
                        ARCHIVE
                      </Button> */}

                      <Button
                        className="btn btn-red"
                        type="submit"
                        disabled={this.state.isUploadImage}
                      >
                        SAVE
                      </Button>
                    </div>
                  </div>
                  <Grid container spacing={3} className="information ">
                    <Grid item xs={12}>
                      <CustomTitle value="General Information" />
                    </Grid>
                    {this.state.loading && (
                      <>
                        <Grid item xs={4}>
                          <h4>Template Name</h4>
                          <input
                            type="text"
                            name="giftCardTemplateName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.giftCardTemplateName}
                          />
                          {errors.giftCardTemplateName &&
                            touched.giftCardTemplateName && (
                              <div className="input-feedback">
                                {errors.giftCardTemplateName}
                              </div>
                            )}
                        </Grid>

                        <Grid item xs={4}>
                          <h4>Group</h4>
                          <Select
                            options={Group}
                            onChange={(selectedOption) => {
                              setFieldValue(
                                "giftCardType",
                                selectedOption.value
                              );
                            }}
                            placeholder="Select Group"
                            value={{
                              value: values.giftCardType,
                              label: values.giftCardType,
                            }}
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
                            value={{
                              label:
                                values.isDisabled === 0 ? "Active" : "Inactive",
                            }}
                          />
                          {errors.status && touched.status && (
                            <div className="input-feedback">
                              {errors.status}
                            </div>
                          )}
                        </Grid>

                        <Grid item xs={4}>
                          <h4>Image</h4>

                          {this.state.isUploadImage ? (
                            <div
                              style={{ padding: "20px", textAlign: "center" }}
                            >
                              <CircularProgress size={50} />
                            </div>
                          ) : (
                            <div>{$imagePreview}</div>
                          )}

                          <br />
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
                            checked={values.isChecked}
                            onChange={(e) => [
                              this.handleCheckbox(
                                e.target.checked,
                                setFieldValue
                              ),
                            ]}
                            value="isConsumer"
                            inputProps={{ "aria-label": "primary checkbox" }}
                            style={{ color: "#0764B0" }}
                          />
                          Visible on Consumer App
                        </Grid>
                      </>
                    )}
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
  Detail: state.updateTemplate.template,
});

const mapDispatchToProps = (dispatch) => ({
  updateTemplateByID: (payload) => {
    dispatch(updateTemplateByID(payload));
  },
  archiveTemplateByID: (templateId, path) => {
    dispatch(archiveTemplateByID(templateId, path));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditTemplate);
