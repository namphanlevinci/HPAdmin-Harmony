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
} from "@material-ui/core";
import { config } from "../../../url/url";
import { history } from "../../../store";
import { addMarketPlaceAction } from "../../../actions/marketActions";
import { WARNING_NOTIFICATION } from "../../../constants/notificationConstants";
import LinearProgress from "../../../util/linearProgress";

import defaultImg from "./hpadmin2.png";
import CustomSwitch from "./components/Switch";
import axios from "axios";
import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import QueueIcon from "@material-ui/icons/Queue";
import * as Yup from "yup";

const upFile = config.url.upFile;

class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  uploadImage = (e, setFieldValue) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      setFieldValue("isUpload", true);

      let formData = new FormData();
      formData.append("Filename3", file);
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

          setFieldValue(`isUpload`, false);
          setFieldValue(`fileId`, res.data.data.fileId);
        })
        .catch((err) => {
          console.log(err);
          setFieldValue(`isUpload`, false);
        });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  render() {
    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Transaction | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.marketPlace" />}
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
              value="New Brand"
              styles={{ color: "black", marginLeft: "10px" }}
            />
          </div>

          <Formik
            initialValues={{
              name: "",
              link: "",
              onTop: false,
              fileId: "",
              isDisabled: 0,
              imageUrl: "",
            }}
            validationSchema={MarketPlaceSchema}
            onSubmit={(values) => {
              this.props.addMarketPlaceAction(values);
            }}
          >
            {({ errors, touched, handleChange, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={4}>
                    <TextField
                      label={
                        <p>
                          Name <span style={{ color: "red" }}>*</span>
                        </p>
                      }
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
                  <Grid item xs={6} md={4}>
                    <TextField
                      label={
                        <p>
                          URL <span style={{ color: "red" }}>*</span>
                        </p>
                      }
                      name="link"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.link}
                      error={errors.link && touched.link}
                      helperText={
                        errors.link && touched.link ? errors.link : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={4} md={12}>
                    <label style={{ marginBottom: "10px" }}>
                      Image <span style={{ color: "red" }}>*</span>
                    </label>{" "}
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
                    <CardMedia
                      component="img"
                      src={
                        values?.imageUrl === "" ? defaultImg : values?.imageUrl
                      }
                      alt="void"
                      style={{ width: "20%" }}
                    />{" "}
                    <div style={{ width: "20%", margin: "15px 0px" }}>
                      {values?.isUpload ? <LinearProgress /> : null}
                    </div>
                    <input
                      type="file"
                      name="image"
                      id="file"
                      accept="image/gif,image/jpeg, image/png"
                      onChange={(e) => this.uploadImage(e, setFieldValue)}
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Status
                      </InputLabel>
                      <Select
                        value={values.isDisabled}
                        onChange={(e) =>
                          setFieldValue("isDisabled", e.target.value)
                        }
                        fullWidth
                      >
                        <MenuItem value={0}>Active</MenuItem>
                        <MenuItem value={1}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    On Top{" "}
                    <CustomSwitch
                      // style={{ color: "#fffff" }}
                      // color="primary"
                      name="onTop"
                      checked={values?.onTop}
                      onChange={handleChange}
                    />
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

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
});
const mapDispatchToProps = (dispatch) => ({
  addMarketPlaceAction: (value) => {
    dispatch(addMarketPlaceAction(value));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});

const MarketPlaceSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  link: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter link"),

  fileId: Yup.string().required("Image is required"),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace);
