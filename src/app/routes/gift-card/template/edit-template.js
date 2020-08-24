import React, { Component } from "react";
import { connect } from "react-redux";
import { MdAddToPhotos } from "react-icons/md";
import { Formik } from "formik";
import { GET_TEMPLATE } from "../../../../actions/gift-card/actions";
import { store } from "react-notifications-component";
import { config } from "../../../../url/url";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "../delete-generation";
import DefaultImage from "./default.png";

import "../generation/generation.styles.scss";
import "./template.styles.scss";

const URL = config.url.URL;
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

  _Delete = () => {
    const ID = this.state.ID;
    axios
      .put(URL + "/giftcardtemplate/disabled/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          store.addNotification({
            title: "Success!",
            message: `${res.data.message}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 1000,
              onScreen: true,
            },
            width: 250,
          });
          this.setState({ openDelete: false });
          setTimeout(() => {
            this.props.history.push("/app/giftcard/template");
          }, 1100);
        }
      })
      .catch((error) => console.log(error));
  };

  _uploadFile = (e) => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
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
            deleteGeneration={this._Delete}
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
              const {
                isConsumer,
                giftCardTemplateName,
                giftCardType,
                isDisabled,
              } = values;
              const { fileId, ID } = this.state;
              axios
                .put(
                  URL + "/giftcardtemplate/" + ID,
                  {
                    giftCardTemplateName,
                    giftCardType,
                    isConsumer,
                    fileId,
                    isDisabled,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.props.userLogin.token}`,
                    },
                  }
                )
                .then((res) => {
                  if (res.data.message === "Success") {
                    store.addNotification({
                      title: "Success!",
                      message: `${res.data.message}`,
                      type: "success",
                      insert: "top",
                      container: "top-right",
                      animationIn: ["animated", "fadeIn"],
                      animationOut: ["animated", "fadeOut"],
                      dismiss: {
                        duration: 2500,
                        onScreen: true,
                      },
                      width: 250,
                    });
                    this.props.history.push("/app/giftcard/template");
                  } else {
                    store.addNotification({
                      title: "ERROR!",
                      message: `${res.data.message}`,
                      type: "danger",
                      insert: "top",
                      container: "top-right",
                      animationIn: ["animated", "fadeIn"],
                      animationOut: ["animated", "fadeOut"],
                      dismiss: {
                        duration: 2500,
                        onScreen: true,
                      },
                      width: 250,
                    });
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
                      <Button
                        className="btn btn-green"
                        onClick={() => this.setState({ openDelete: true })}
                      >
                        DELETE
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
                  <div className="information container-fluid">
                    <h3 className="title">General Information</h3>
                    {this.state.loading && (
                      <div className="row">
                        <div className="col-4">
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
                        </div>

                        <div className="col-4">
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
                        </div>

                        <div className="col-4">
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
                        </div>

                        <div className="col-4" style={{ paddingTop: "10px" }}>
                          <h4>Image</h4>

                          {this.state.isUploadImage ? (
                            <div
                              style={{ padding: "20px", textAlign: "center" }}
                            >
                              <CircularProgress size={50} />
                            </div>
                          ) : (
                            <div className="image__container">
                              {$imagePreview}
                            </div>
                          )}

                          <br />
                          <input
                            type="file"
                            className="custom-input"
                            onChange={(e) => this._uploadFile(e)}
                            style={{ width: "250px", border: "none" }}
                          />
                        </div>
                        <div className="col-8" style={{ paddingTop: "45px" }}>
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
                            style={{ color: "#4251af" }}
                          />
                          Visible on Consumer App
                        </div>
                      </div>
                    )}
                  </div>
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
  Detail: state.GiftCardReducer.detail,
});

const mapDispatchToProps = (dispatch) => ({
  GET_TEMPLATE: () => {
    dispatch(GET_TEMPLATE());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditTemplate);
