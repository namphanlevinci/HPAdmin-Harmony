import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { CustomTitle } from "../../../util/CustomText";
import { Formik, Form } from "formik";
import {
  Grid,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  CardMedia,
  Switch,
} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { config } from "../../../url/url";
import { history } from "../../../store";
import { addMarketPlaceAction } from "../../../actions/marketActions";
import { WARNING_NOTIFICATION } from "../../../constants/notificationConstants";
import { addTicket } from "../../../actions/ticketActions";

import LinearProgress from "../../../util/linearProgress";

import axios from "axios";
import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import QueueIcon from "@material-ui/icons/Queue";
import * as Yup from "yup";
const upFile = config.url.upFile;

class AddTicket extends Component {
  constructor(props) {
    super(props);
    this.state = { fileIds: [] };
  }
  uploadImage = (e, setFieldValue) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      setFieldValue("isUpload", true);
      let formData = new FormData();

      formData.append("Filename", file);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setFieldValue(`imageUrl`, reader.result);
          };
          let fileIds = [];
          fileIds.push(res.data.data.fileId);
          setFieldValue(`isUpload`, false);
          setFieldValue(`fileIds`, fileIds);
        })
        .catch((err) => {
          console.log(err);
          setFieldValue(`isUpload`, false);
        });
    } else {
      // this.props.warningNotify(
      //   "Image type is not supported, Please choose another image "
      // );
      alert("Image type is not supported, Please choose another image ");
    }
  };
  // uploadImage = (e, setFieldValue) => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];
  //   let files = e.target.files;

  //   if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
  //     setFieldValue("isUpload", true);
  //     let formData = new FormData();
  //     const config = {
  //       headers: { "content-type": "multipart/form-data" },
  //     };
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append(`Filename[${i}]`, files[i]);
  //       axios
  //         .post(upFile, formData, config)
  //         .then((res) => {
  //           reader.readAsDataURL(files[i]);
  //           reader.onloadend = () => {
  //             setFieldValue(`imageUrl`, reader.result);
  //           };
  //           this.setState({
  //             imgUrlArr: reader.result,
  //           });

  //           setFieldValue(`isUpload`, false);
  //           setFieldValue(`fileId`, res.data.data.fileId);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           setFieldValue(`isUpload`, false);
  //         });
  //     }
  //     console.log("this.state.imgUrlArr", this.state.imgUrlArr);
  //   } else {
  //     // this.props.warningNotify(
  //     //   "Image type is not supported, Please choose another image "
  //     // );
  //     alert("Image type is not supported, Please choose another image ");
  //   }
  // };
  submitForm = (values, actions) => {
    const path = "/app/ticket/detail";
    const payload = { ...values, path };
    this.props.addTicket(payload);
    actions.setSubmitting(false);
  };
  handleSubmit = (values, actions) => {
    this.submitForm(values, actions);
    actions.setSubmitting(false);
  };
  render() {
    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Add Ticket | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.ticket" />}
        />

        <div className="page-heading">
          <div
            style={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <QueueIcon style={{ color: "black" }} size={22} />
            <CustomTitle
              value="New Ticket"
              styles={{ color: "black", marginLeft: "10px" }}
            />
          </div>

          <Formik
            initialValues={{
              title: "",
              clientApp: "",
              clientName: "",
              description: "",
              fileIds: "",
              imageUrl: "",
              isUpload: "",
              status: "",
            }}
            validationSchema={MarketPlaceSchema}
            onSubmit={this.handleSubmit}
          >
            {({ errors, touched, handleChange, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={3} xs={12} md={6}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      label={
                        <p>
                          Title <span style={{ color: "red" }}>*</span>
                        </p>
                      }
                      name="title"
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
                  <Grid item xs={12} md={12}>
                    <TextField
                      label={
                        <p>
                          Application <span style={{ color: "red" }}>*</span>
                        </p>
                      }
                      name="clientApp"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.application}
                      error={errors.application && touched.application}
                      helperText={
                        errors.application && touched.application
                          ? errors.application
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      label={
                        <p>
                          Client <span style={{ color: "red" }}>*</span>
                        </p>
                      }
                      name="clientName"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.nameClient}
                      error={errors.nameClient && touched.nameClient}
                      helperText={
                        errors.nameClient && touched.nameClient
                          ? errors.nameClient
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label style={{ marginBottom: "10px" }}>
                        Description <span style={{ color: "red" }}>*</span>
                      </label>
                      <br />
                      {errors?.description && touched?.description ? (
                        <p
                          style={{
                            color: "#f44336",
                          }}
                        >
                          {errors.description}
                        </p>
                      ) : null}
                      <TextareaAutosize
                        rowsMin={5}
                        onChange={handleChange}
                        type="text"
                        name="description"
                        value={values.description}
                        error={errors.description && touched.description}
                        helperText={
                          errors.description && touched.description
                            ? errors.description
                            : ""
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <label style={{ marginBottom: "10px" }}>
                      Attack files <span style={{ color: "red" }}>*</span>
                    </label>
                    <CardMedia
                      component="img"
                      src={values?.imageUrl === "" ? null : values?.imageUrl}
                      alt=""
                      style={{ width: "40%" }}
                    />
                    <br />
                    {errors?.fileId && touched?.fileId ? (
                      <p
                        style={{
                          color: "#f44336",
                        }}
                      >
                        {errors.fileId}
                      </p>
                    ) : null}
                    <div style={{ width: "20%", margin: "5px 5px" }}>
                      {values?.isUpload ? <LinearProgress /> : null}
                    </div>
                    <input
                      type="file"
                      name="image"
                      id="file"
                      accept="image/gif,image/jpeg, image/png"
                      onChange={(e) => this.uploadImage(e, setFieldValue)}
                      multiple
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Status
                      </InputLabel>
                      <Select
                        value={values.status}
                        fullWidth
                        onChange={(e) =>
                          setFieldValue("status", e.target.value)
                        }
                      >
                        <MenuItem value="backlog">Backlog</MenuItem>
                        <MenuItem value="waiting">Waiting</MenuItem>
                        <MenuItem value="complete">Complete</MenuItem>
                        <MenuItem value="inprogress">Inprogress</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ paddingTop: "20px" }}>
                  <Button
                    className="btn btn-red"
                    onClick={() => history.goBack()}
                  >
                    CANCEL
                  </Button>
                  <Button className="btn btn-green" type="submit">
                    SAVE
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
const MarketPlaceSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  clientApp: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Application is required"),
  clientName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name Client is required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(10000, "Too Long!")
    .required("Description is required"),
  //   link: Yup.string()
  //     .matches(
  //       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //       "Enter correct url!"
  //     )
  //     .required("Please enter link"),

  //   fileId: Yup.string().required("Image is required"),
});
AddTicket.propTypes = {};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
  addTicket: (payload) => {
    dispatch(addTicket(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTicket);
