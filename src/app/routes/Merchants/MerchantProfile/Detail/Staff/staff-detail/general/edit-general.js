import React, { Component } from "react";
import { connect } from "react-redux";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { UPDATE_STAFF } from "../../../../../../../../actions/merchants/actions";
import { config } from "../../../../../../../../url/url";
import { WARNING_NOTIFICATION } from "../../../../../../../../actions/notifications/actions";

import Button from "@material-ui/core/Button";
import Select from "react-select";
import selectState from "../../../../../../../../util/selectState";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import SimpleReactValidator from "simple-react-validator";
import LinearProgress from "../../../../../../../../util/linearProgress";
import axios from "axios";

import "react-phone-input-2/lib/high-res.css";
import "../../Staff.styles.scss";

const upFile = config.url.upFile;

export class EditGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPin: true,
      loading: false,
      loadingProgress: false,
    };
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required!",
      },
    });
  }

  componentDidMount() {
    const data = this.props.Staff;
    this.setState(
      {
        firstName: data?.firstName,
        lastName: data?.lastName,
        displayName: data?.displayName,
        address: data?.address,
        city: data?.city,
        stateId: data?.stateId,
        stateName: data?.stateName,
        phone: data?.phone,
        email: data?.email,
        pin: data?.pin,
        roleName: data?.roleName,
        isDisabled: data?.isDisabled,
        isActive: data?.isActive,
        zip: data?.zip,
        imageUrl: data?.imageUrl,
        fileId: data?.fileId,
      },
      () => this.setState({ loading: true })
    );
  }
  showPin = () => {
    this.setState({ showPin: !this.state.showPin });
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleUpdateStaff = () => {
    const state = this.state;
    const data = this.props.Staff;
    const staffId = this.props.Staff.staffId;
    const MerchantId = this.props.MerchantData.merchantId;

    const body = {
      firstName: state.firstName,
      lastName: state.lastName,
      displayName: state.displayName,
      cashPercent: data?.cashPercent,

      address: {
        street: state.address,
        city: state.city,
        state: state.stateId,
        zip: state.zip,
      },
      cellphone: state.phone,
      email: state.email,
      pin: state.pin,
      fileId: state.fileId,
      confirmPin: state.pin,
      isActive: state.isActive,
      isDisabled: Number(state.isDisabled),
      driverLicense: data.driverLicense,
      socialSecurityNumber: data.socialSecurityNumber,
      professionalLicense: data?.professionalLicense,
      workingTime: data.workingTimes,
      tipFee: data.tipFees,
      salary: data.salaries,
      productSalary: data.productSalaries,
      Roles: {
        NameRole: state.roleName,
      },
      MerchantId,
    };
    const payload = {
      body,
      staffId,
      MerchantId,
      path: "/app/merchants/staff/general",
    };

    if (this.validator.allValid()) {
      this.props.UPDATE_STAFF(payload);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  uploadFile = (e) => {
    e.preventDefault();
    let file = e?.target?.files[0];

    if (file?.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({ loadingProgress: true });
      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          this.setState({ fileId: res.data.data.fileId });
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result,
              loadingProgress: false,
            });
          };
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

  render() {
    const status = [
      { label: "Available", value: "0" },
      { label: "Disable", value: "1" },
    ];

    const roles = [
      { label: "Admin", value: "1" },
      { label: "Staff", value: "3" },
    ];

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <div
          style={{
            backgroundImage: `url(${imagePreviewUrl})`,
            width: "220px",
            height: "220px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "50%",
          }}
        />
      );
    } else {
      $imagePreview = (
        <div
          style={{
            backgroundImage: `url(${this.state?.imageUrl})`,
            width: "220px",
            height: "220px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "50%",
          }}
        />
      );
    }

    return (
      <div className="content">
        <div className="container-fluid">
          <div className="header">
            <h2>General Information</h2>
          </div>
          <div className="row ">
            <div className="col-4">
              <label>First Name*</label>
              <input
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                maxLength="90"
              />
              <span style={styles.validation}>
                {this.validator.message(
                  "firstName",
                  this.state.firstName,
                  "required|string"
                )}
              </span>
            </div>
            <div className="col-4">
              <label>Last Name*</label>
              <input
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                maxLength="90"
              />
              <span style={styles.validation}>
                {this.validator.message(
                  "lastName",
                  this.state.lastName,
                  "required|string"
                )}
              </span>
            </div>
            <div className="col-4">
              <label>Display Name*</label>
              <input
                name="displayName"
                value={this.state.displayName}
                onChange={this.handleChange}
                maxLength="90"
              />
              <span style={styles.validation}>
                {this.validator.message(
                  "displayName",
                  this.state.displayName,
                  "required|string"
                )}
              </span>
            </div>
            <div className="col-4" style={styles.div}>
              <label>Address</label>
              <input
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
                maxLength="90"
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>City</label>
              <input
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
                maxLength="90"
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>State</label>
              {this.state.loading && (
                <Select
                  defaultValue={{
                    label: this.state.stateName,
                    value: this.state.stateId,
                  }}
                  options={selectState}
                  onChange={(e) => this.setState({ stateId: e.value })}
                />
              )}
            </div>
            <div className="col-4" style={styles.div}>
              <label>Zip Code</label>
              <input
                name="zip"
                value={this.state.zip}
                onChange={this.handleChange}
                maxLength="90"
              />
            </div>

            <div className="col-4" style={{ paddingTop: "5px" }}>
              <label>Cell Phone</label>
              <MaterialUiPhoneNumber
                onlyCountries={["us", "vn"]}
                name="cellphone"
                value={this.state.phone}
                onChange={(phone) => this.setState({ phone })}
                fullWidth
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>Contact Email</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                maxLength="90"
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>Create PIN*</label>
              <div style={{ display: "flex" }}>
                <input
                  style={{ width: "100%" }}
                  name="pin"
                  type={this.state.showPin ? "password" : "text"}
                  value={this.state.pin}
                  onChange={this.handleChange}
                  maxLength={4}
                />
                <span>
                  {this.state.showPin ? (
                    <RiEyeLine
                      onClick={this.showPin}
                      style={styles.icon}
                      size={20}
                    />
                  ) : (
                    <RiEyeOffLine
                      onClick={this.showPin}
                      style={styles.icon}
                      size={20}
                    />
                  )}
                </span>
              </div>
              <span style={styles.validation}>
                {this.validator.message(
                  "pin",
                  this.state.pin,
                  "required|numeric"
                )}
              </span>
            </div>
            <div className="col-4" style={{ marginTop: "20px" }}>
              {this.state.loading && (
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value={true}
                      checked={this.state?.isActive}
                      control={<Checkbox color="primary" />}
                      label="Visible on App"
                      labelPlacement="end"
                      onClick={(e) =>
                        this.setState({ isActive: e.target.checked })
                      }
                    />
                  </FormGroup>
                </FormControl>
              )}
            </div>
          </div>
          <div className="row" style={styles.div}>
            <div className="col-4">
              <label>Role</label>
              {this.state.loading && (
                <Select
                  defaultValue={{
                    label: this.state.roleName,
                    value: this.state.roles,
                  }}
                  options={roles}
                  onChange={(e) => this.setState({ roles: e.label })}
                />
              )}
            </div>
            <div className="col-4">
              <label>Status</label>
              {this.state.loading && (
                <Select
                  defaultValue={{
                    label:
                      this.state.isDisabled === 0 ? "Available" : "Disable",
                    value: this.state.isDisabled,
                  }}
                  options={status}
                  onChange={(e) => this.setState({ isDisabled: e.value })}
                />
              )}
            </div>
            <div className="col-8" style={{ paddingTop: "20px" }}>
              <label>Avatar</label> <br />
              {$imagePreview}
              <div style={{ width: "40%", marginTop: "15px" }}>
                {this.state.loadingProgress ? <LinearProgress /> : null}
              </div>
              <input
                type="file"
                name="image"
                id="file"
                className="custom-input"
                accept="image/gif,image/jpeg, image/png"
                onChange={(e) => this.uploadFile(e)}
                style={{ width: "40%" }}
              />
            </div>
          </div>
          <div style={styles.div}>
            <Button className="btn btn-green" onClick={this.handleUpdateStaff}>
              SAVE
            </Button>
            <Button
              className="btn btn-red"
              onClick={() =>
                this.props.history.push("/app/merchants/staff/general")
              }
            >
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Staff: state.MerchantReducer.StaffData,
  MerchantData: state.MerchantReducer.MerchantData,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_STAFF: (payload) => {
    dispatch(UPDATE_STAFF(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);

const styles = {
  div: {
    paddingTop: "10px",
  },
  input: {
    width: "50%",
  },
  icon: {
    cursor: "pointer",
  },
  validation: {
    color: "red",
    fontSize: "16px",
  },
};
