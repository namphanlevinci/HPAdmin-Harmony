import React, { Component } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "../../../../url/url";
import { Select, Avatar } from "@material-ui/core";
import { addUser } from "../../../../actions/userActions";
import { TextField, Grid, Button } from "@material-ui/core";
import { WARNING_NOTIFICATION } from "../../../../constants/notificationConstants";

import * as Yup from "yup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import CustomStateSelect from "../../../../util/CustomStateSelect";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import moment from "moment";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import DefaultAvatar from "./avatar.png";

import "date-fns";
import "../../Merchants/MerchantList/Profile/Detail.css";
import "react-datepicker/dist/react-datepicker.css";
import "./User.css";

const upFile = config.url.upFile;

class addAdmin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: "",
    };
  }

  uploadFile = (event, setFieldValue) => {
    event.stopPropagation();
    event.preventDefault();

    let reader = new FileReader();
    const file = event?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);

      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile + "/file?category=service", formData, config)
        .then((res) => {
          setFieldValue("fileId", res.data.data.fileId);
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
    this.props.history.push("/app/accounts/admin");
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <Avatar src={imagePreviewUrl} alt="avatar" style={styles.avatar} />
      );
    } else {
      $imagePreview = (
        <Avatar src={DefaultAvatar} alt="avatar" style={styles.avatar} />
      );
    }

    return (
      <div className="container-fluid UserProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.addAdmin" />}
        />

        <div className="row admin_profile page-heading">
          <>
            <Formik
              initialValues={{
                email: "",
                password: "",
                WaRoleId: "",
                confirmPassword: "",
                stateID: "",
                firstname: "",
                lastname: "",
                address: "",
                city: "",
                zip: "",
                BirthDate: null,
                phone: "+",
                fileId: 0,
                userName: "",
                gender: "",
              }}
              validationSchema={userSchema}
              onSubmit={(values, { setSubmitting }) => {
                const { firstname, lastname } = values;
                const BirthDate = moment(values.BirthDate).format("MM/DD/YYYY");
                const fullname = firstname + lastname;
                const path = "/app/accounts/admin";
                const payload = {
                  ...values,
                  BirthDate,
                  fullname,
                  path,
                };
                this.props.addUser(payload);
              }}
            >
              {({
                isSubmitting,
                setFieldValue,
                values,
                handleChange,
                handleBlur,
                errors,
                touched,
              }) => (
                <Form style={{ width: "100%" }}>
                  <Grid container spacing={3} style={styles.grid}>
                    <Grid
                      item
                      xs={12}
                      className="admin-header-div"
                      style={styles.div}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          color: "black",
                        }}
                      >
                        <AddToPhotosIcon size={24} />
                        <p style={styles.p}>New Account</p>
                      </div>
                      <span>
                        <Button
                          style={{
                            color: "#4251af",
                            backgroundColor: "white",
                          }}
                          className="btn btn-green"
                          onClick={this.goBack}
                        >
                          BACK
                        </Button>
                      </span>
                    </Grid>

                    <Grid item xs={12}>
                      <h2 style={styles.h2}>Personal Information</h2>
                    </Grid>

                    <Grid item xs={4} style={styles.margin}>
                      <TextField
                        label="First Name*"
                        name="firstname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.firstname && Boolean(errors.firstname)}
                        helperText={touched.firstname ? errors.firstname : ""}
                      />
                    </Grid>
                    <Grid item xs={4} style={styles.margin}>
                      <TextField
                        label="Last Name*"
                        name="lastname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.lastname && Boolean(errors.lastname)}
                        helperText={touched.lastname ? errors.lastname : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <MaterialUiPhoneNumber
                        onlyCountries={["us", "vn"]}
                        placeholder="Contact Phone Number"
                        name="phone"
                        fullWidth
                        value={values.phone}
                        label="Phone*"
                        onChange={(phone) => setFieldValue("phone", phone)}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone ? errors.phone : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Address*"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address ? errors.address : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="City*"
                        name="city"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city ? errors.city : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomStateSelect
                        label="State*"
                        name="stateID"
                        initialValue={values.stateID}
                        handleChange={(state) =>
                          setFieldValue("stateID", state.target.value)
                        }
                      />
                      {errors.stateID && touched.stateID ? (
                        <FormHelperText style={styles.errorText}>
                          {errors.stateID}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Email*"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email ? errors.email : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          displayEmpty
                          fullWidth
                          value={values.gender}
                          onChange={(gender) =>
                            setFieldValue("gender", gender.target.value)
                          }
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          label="Birthday*"
                          variant="inline"
                          format="MM/dd/yyyy"
                          placeholder="MM/DD/YYYY"
                          value={values.BirthDate}
                          onChange={(date) => setFieldValue("BirthDate", date)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          autoOk={true}
                          fullWidth
                          error={touched.BirthDate && Boolean(errors.BirthDate)}
                          helperText={touched.BirthDate ? errors.BirthDate : ""}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel>Role*</InputLabel>
                        <Select
                          displayEmpty
                          fullWidth
                          error={touched.WaRoleId && Boolean(errors.WaRoleId)}
                          helperText={touched.WaRoleId ? errors.WaRoleId : ""}
                          value={values.WaRoleId}
                          onChange={(role) =>
                            setFieldValue("WaRoleId", Number(role.target.value))
                          }
                        >
                          <MenuItem value={1}>Administrator</MenuItem>
                          <MenuItem value={2}>Manager</MenuItem>
                          <MenuItem value={3}>Staff Lv1</MenuItem>
                          <MenuItem value={4}>Staff Lv2</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.WaRoleId && touched.WaRoleId ? (
                        <FormHelperText style={styles.errorText}>
                          {errors.WaRoleId}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={8} />
                    <Grid item xs={4}>
                      <label style={{ padding: "10px 0px", fontWeight: "400" }}>
                        Avatar
                      </label>{" "}
                      <br />
                      {$imagePreview}
                      <div>
                        <br />
                        <input
                          type="file"
                          name="image"
                          id="file"
                          className="custom-input"
                          accept="image/gif,image/jpeg, image/png"
                          onChange={(e) => this.uploadFile(e, setFieldValue)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <h2 style={styles.h2}>Account Information</h2>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        label="User Name*"
                        type="text"
                        name="userName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.userName && Boolean(errors.userName)}
                        helperText={touched.userName ? errors.userName : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Password*"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password ? errors.password : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Confirm Password*"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword ? errors.confirmPassword : ""
                        }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "block",
                        padding: "20px 15px 0px 15px",
                        marginBottom: "20px",
                      }}
                    >
                      <Button
                        style={{ color: "#4251af", backgroundColor: "white" }}
                        className="btn btn-green"
                        onClick={this.goBack}
                      >
                        CANCEL
                      </Button>
                      <Button
                        type="submit"
                        // disabled={isSubmitting}
                        className="btn btn-green"
                      >
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addUser: (payload) => {
    dispatch(addUser(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(addAdmin2)
);

const styles = {
  grid: {
    padding: "0px 10px",
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  p: {
    fontWeight: "500",
    fontSize: "19px",
    paddingLeft: "10px",
  },
  errorText: {
    color: "red",
  },
  h2: {
    color: "#4251af",
    fontWeight: "400",
    padding: "10px 0px",
    fontSize: "22px",
  },
  row: {
    padding: "0px 15px 0px 15px",
  },
  input: {
    width: "100%",
  },
  avatar: {
    height: "200px",
    width: "200px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const userSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  email: Yup.string().email().required("Email is required"),
  userName: Yup.string().required("Last name is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  stateID: Yup.string().required("City is required"),

  WaRoleId: Yup.string().required("Please choose a State"),
  BirthDate: Yup.string().required("Date of birth is required").nullable(),
});
