import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { CustomTitle } from "../../../util/CustomText";
import { Formik, Form } from "formik";
import {
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

import { config } from "../../../url/url";
import { history } from "../../../store";
import {
  updateTicketById,
  deleteTicketFile,
  addTicketFile,
} from "../../../actions/ticketActions";

import NewButton from "../../../components/Button/Search";
import LinearProgress from "../../../util/linearProgress";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AddButton from "../../../components/Button/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import QueueIcon from "@material-ui/icons/Queue";
import * as Yup from "yup";

import "./Ticket.css";

const upFile = config.url.upFile;

class EditTicket extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, imgUrl: [] };
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

  uploadImage = (e, setFieldValue) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    const { ticketInfo } = this.props;

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
            this.setState({
              imgUrl: [...this.state.imgUrl, res.data.data.url],
            });
            this.props.addTicketFile({
              id: ticketInfo.data.id,
              fileId: res.data.data.fileId,
            });
          };
          this.setState({
            fileIds: [...this.state.fileIds, res.data.data.fileId],
          });

          setFieldValue(`isUpload`, false);
          setFieldValue(`fileIds`, this.state.fileIds);
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

  handleDel = (id) => {
    const { ticketInfo } = this.props;
    const payload = { id: ticketInfo.data.id, fileId: id };
    this.props.deleteTicketFile(payload);
  };

  handleSubmit = (values) => {
    const path = "/app/ticket/detail";
    const payload = { ...values, path };
    this.props.updateTicketById(payload);
  };
  
  render() {
    const { ticketInfo } = this.props;
    const { ticketAttachFiles } = ticketInfo.data;
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
                  <Grid item xs={12} md={8}>
                    <label style={{ marginBottom: "10px" }}>Attack files</label>

                    <div className="img_area">
                      {ticketAttachFiles.map((item, index) => (
                        <div className="img_item">
                          <DeleteIcon
                            style={{
                              zIndex: 9999,
                              position: "absolute",
                              left: 95,
                              top: -5,
                              cursor: "pointer",
                              color: "#707070",
                            }}
                            onClick={() => this.handleDel(item.id)}
                          />
                          <img
                            alt=""
                            key={index}
                            src={item.fileURL}
                            style={{
                              height: "100px",
                              width: "100px",
                              padding: 5,
                              marginBottom: 15,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ width: "20%", margin: "5px 5px" }}>
                      {values?.isUpload ? <LinearProgress /> : null}
                    </div>
                    <AddButton
                      onChange={(e) => this.uploadImage(e, setFieldValue)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
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
                        <MenuItem value="inprogress">In Progress</MenuItem>
                        <MenuItem value="waiting">Waiting</MenuItem>
                        <MenuItem value="complete">Complete</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ paddingTop: "20px" }}>
                  <NewButton
                    onClick={() => history.goBack()}
                    style={{ marginRight: 15 }}
                  >
                    Cancel
                  </NewButton>
                  <NewButton type="submit">Save</NewButton>
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
  deleteTicketFile: (payload) => {
    dispatch(deleteTicketFile(payload));
  },
  addTicketFile: (payload) => {
    dispatch(addTicketFile(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTicket);
