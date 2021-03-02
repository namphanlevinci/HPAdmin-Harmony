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
import { WARNING_NOTIFICATION } from "../../../constants/notificationConstants";
import { updateTicketById } from "../../../actions/ticketActions";

import LinearProgress from "../../../util/linearProgress";

import axios from "axios";
import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import QueueIcon from "@material-ui/icons/Queue";
import * as Yup from "yup";
const upFile = config.url.upFile;

class EditTicket extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount() {
    const { ticketInfo } = this.props;
    this.setState({
      clientApp: ticketInfo.data.clientApp,
      clientName: ticketInfo.data.clientName,
      title: ticketInfo.data.title,
      status: ticketInfo.data.status,
      description: ticketInfo.data.description,
      ticketAttachFiles: ticketInfo.data.ticketAttachFiles,
      id: ticketInfo.data.id,
    });
  }
  handleSubmit = (values) => {
    const path = "/app/ticket/detail";
    const payload = { ...values, path };
    this.props.updateTicketById(payload);
  };
  render() {
    const { ticketInfo } = this.props;
    console.log("ticketInfo", ticketInfo);
    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Edit Ticket | Harmony Admin</title>
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
              value="Edit Ticket"
              styles={{ color: "black", marginLeft: "10px" }}
            />
          </div>

          <Formik
            initialValues={this.state}
            validationSchema={MarketPlaceSchema}
            onSubmit={(values) => this.handleSubmit(values)}
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
                      value={values.title}
                      error={errors.title && touched.title}
                      helperText={
                        errors.title && touched.title ? errors.title : ""
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
                      value={values.clientApp}
                      error={errors.clientApp && touched.clientApp}
                      helperText={
                        errors.clientApp && touched.clientApp
                          ? errors.clientApp
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
                      value={values.clientName}
                      error={errors.clientName && touched.clientName}
                      helperText={
                        errors.clientName && touched.clientName
                          ? errors.clientName
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
});
EditTicket.propTypes = {};

const mapStateToProps = (state) => ({
  ticketInfo: state.getTicketById,
});
const mapDispatchToProps = (dispatch) => ({
  updateTicketById: (payload) => {
    dispatch(updateTicketById(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTicket);
