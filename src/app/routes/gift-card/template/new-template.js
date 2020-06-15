import React, { Component } from "react";
import { connect } from "react-redux";
import { MdAddToPhotos } from "react-icons/md";
import { Formik } from "formik";
import { GET_TEMPLATE } from "../../../../actions/gift-card/actions";
import { store } from "react-notifications-component";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import URL, { upFileUrl } from "../../../../url/url";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";

import DefualtImage from "./default.png";
import "../generation/generation.styles.scss";
import "./template.styles.scss";

class NewTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileId: "",
      imagePreviewUrl: "",
      isConsumer: 0,
    };
  }

  _uploadFile = (e) => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
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
      .post(upFileUrl, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
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
      { value: "1", label: "Active" },
      { value: "2", label: "Disable" },
    ];

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img className="template-img" src={imagePreviewUrl} alt="void" />
      );
    } else {
      $imagePreview = (
        <img className="template-img" src={DefualtImage} alt="void" />
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
              status: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.giftCardTemplateName) {
                errors.giftCardTemplateName = "Required";
              }
              if (!values.giftCardType) {
                errors.giftCardType = "Required";
              }
              if (!values.status) {
                errors.status = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { giftCardTemplateName, giftCardType } = values;
              const { fileId, isConsumer } = this.state;
              resetForm();
              axios
                .post(
                  URL + "/giftcardtemplate",
                  { giftCardTemplateName, giftCardType, isConsumer, fileId },
                  {
                    headers: {
                      Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
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
                    this.setState({
                      status: null,
                      group: null,
                      imagePreviewUrl: null,
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
              resetForm,
            }) => (
              <React.Fragment>
                <form onSubmit={handleSubmit}>
                  <div className="id-and-btn">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <MdAddToPhotos size={23} />
                      <h3 style={{ paddingLeft: "5px" }}>New Template</h3>
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
                      <Button className="btn btn-red" type="submit">
                        SAVE
                      </Button>
                    </div>
                  </div>
                  <div className="information container-fluid">
                    <h3 className="title">General Information</h3>

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
                      </div>

                      <div className="col-4">
                        <h4>Status</h4>
                        <Select
                          options={Status}
                          onChange={(selectedOption) => {
                            setFieldValue("status", selectedOption.value);
                          }}
                          placeholder="Select Status"
                          value={this.state.status}
                        />
                        {errors.status && touched.status && (
                          <div className="input-feedback">{errors.status}</div>
                        )}
                      </div>

                      <div className="col-4" style={{ paddingTop: "10px" }}>
                        <h4>Image</h4>
                        {$imagePreview}
                        <input
                          type="file"
                          className="custom-input"
                          onChange={(e) => this._uploadFile(e)}
                          style={{ width: "250px", border: "none" }}
                        />
                      </div>
                      <div className="col-8" style={{ paddingTop: "45px" }}>
                        <Checkbox
                          // checked={checked}
                          id="isConsumer"
                          onChange={(e) =>
                            this.setState({ isConsumer: e.target.value })
                          }
                          value="1"
                          inputProps={{ "aria-label": "primary checkbox" }}
                          style={{ color: "#4251af" }}
                        />
                        Visible on Consumer App
                      </div>
                      {/* <div
                        className="id-and-btn"
                        style={{ paddingTop: "20px" }}
                      >
                        <Button className="btn btn-red" type="submit">
                          SAVE
                        </Button>
                      </div> */}
                    </div>
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
  Template: state.GiftCardData.template,
  InfoUser_Login: state.User,
});

const mapDispatchToProps = (dispatch) => ({
  GET_TEMPLATE: () => {
    dispatch(GET_TEMPLATE());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewTemplate);
