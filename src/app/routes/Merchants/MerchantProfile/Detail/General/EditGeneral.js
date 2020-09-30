import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ViewProfile_Merchants,
  UpdateMerchant_Infor,
  GET_MERCHANT_BY_ID,
} from "../../../../../../actions/merchants/actions";

import Button from "@material-ui/core/Button";
import SimpleReactValidator from "simple-react-validator";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import CustomSelect from "../../../../../../util/getState";
import InputCustom from "../../../MerchantsList/addMerchant/custom-input";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      emailContact: "",
      legalBusinessName: "",
      tax: "",
      address: "",
      city: "",
      stateId: "",
      phoneBusiness: "",
      zip: "",
      phoneContact: "",
      firstName: "",
      lastName: "",
      title: "",
      doBusinessName: "",
      stateName: "",
      loading: false,
    };
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required",
      },
    });
  }
  _goBack = () => {
    this.props.history.push("/app/merchants/profile/general");
  };
  Update = () => {
    const ID = this.props.MerchantProfile.general.generalId;

    const {
      emailContact,
      legalBusinessName,
      doBusinessName,
      tax,
      address,
      city,
      stateId,
      phoneBusiness,
      zip,
      phoneContact,
      firstName,
      lastName,
      title,
      dbaAddress,
      dbaCity,
      dbaState,
      dbaZip,
    } = this.state;

    const payload = {
      ID,
      dbaAddress: {
        Address: dbaAddress,
        City: dbaCity,
        State: dbaState,
        Zip: dbaZip,
      },
      emailContact,
      legalBusinessName,
      doBusinessName,
      tax,
      address,
      city,
      stateId,
      phoneBusiness,
      zip,
      phoneContact,
      firstName,
      lastName,
      title,
    };
    this.props.updateMerchant(payload);
    setTimeout(() => {
      const payload = {
        ID: this.props.MerchantProfile.merchantId,
        path: "/app/merchants/profile/general",
      };
      this.props.GET_MERCHANT_BY_ID(payload);
    }, 1000);
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  _toggleEdit = () => {
    this.setState({ edit: true });
  };
  getStateId = (e) => {
    this.setState({ stateId: e });
  };
  componentDidMount() {
    const data = this.props.MerchantProfile;
    this.setState(
      {
        emailContact: data.general.emailContact,
        legalBusinessName: data.general.legalBusinessName,
        tax: data.general.tax,
        address: data.general.address,
        city: data.general.city,
        stateId: data.general.stateId,
        phoneBusiness: data.general.phoneBusiness,
        zip: data.general.zip,
        phoneContact: data.general.phoneContact,
        firstName: data.general.firstName,
        lastName: data.general.lastName,
        title: data.general.title,
        doBusinessName: data.general.doBusinessName,
        stateName: data?.state?.name,

        dbaAddress: data?.general?.dbaAddress?.Address,
        dbaCity: data?.general?.dbaAddress?.City,
        dbaState: data?.general?.dbaAddress?.State,
        dbaZip: data?.general?.dbaAddress?.Zip,
      },
      () => this.setState({ loading: true })
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getMerchant !== this.props.getMerchant) {
      this.props.ViewProfile_Merchants(this.props.getMerchant.Data);
      this.props.history.push("/app/merchants/profile/general");
    }
  }
  render() {
    return (
      <div className="content  react-transition swipe-right">
        <div className="container-fluid">
          <h2 style={styles.h2}>General Information</h2>
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <TextField
                  name="legalBusinessName"
                  label="Legal Business Name*"
                  margin="normal"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.legalBusinessName}
                />
                {this.validator.message(
                  "legalBusinessName",
                  this.state.legalBusinessName,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <TextField
                  name="doBusinessName"
                  label="Doing Business As* (DBA)"
                  type="text"
                  autoComplete="doingBusiness"
                  margin="normal"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.doBusinessName}
                />
                {this.validator.message(
                  "doingBusiness",
                  this.state.doBusinessName,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <FormControl style={{ width: "100%", marginTop: "16px" }}>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Federal Tax ID*
                  </InputLabel>
                  <Input
                    value={this.state.tax}
                    onChange={this.handleChange}
                    name="tax"
                    startAdornment
                    inputProps={{
                      block: [2, 7],
                    }}
                    inputComponent={InputCustom}
                  />
                </FormControl>
                {this.validator.message(
                  "tax",
                  this.state.tax,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <TextField
                  name="address"
                  label="Business Address* (no P.O. Boxes)"
                  margin="normal"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.address}
                />
                {this.validator.message(
                  "address",
                  this.state.address,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <TextField
                  name="city"
                  label="City*"
                  type="text"
                  margin="normal"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.city}
                />
                {this.validator.message(
                  "city",
                  this.state.city,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-3" style={{ marginTop: "10px" }}>
              {this.state.loading ? (
                <CustomSelect
                  name="state"
                  label="State Issued*"
                  initialValue={this.state.stateId}
                  handleChange={(e) =>
                    this.setState({ stateId: e.target.value })
                  }
                />
              ) : null}
              {this.validator.message(
                "state",
                this.state.stateId,
                "required|integer"
              )}
            </div>

            <div className="col-2">
              <div className="form-group">
                <FormControl style={{ width: "100%", marginTop: "16px" }}>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Zip Code*
                  </InputLabel>
                  <Input
                    value={this.state.zip}
                    onChange={this.handleChange}
                    name="zip"
                    id="custom-zip-input"
                    startAdornment
                    inputProps={{
                      block: [5],
                      numericOnly: true,
                    }}
                    inputComponent={InputCustom}
                  />
                </FormControl>

                {this.validator.message(
                  "zip",
                  this.state.zip,
                  "required|string"
                )}
              </div>
            </div>

            {/* DBA ADDRESS */}
            <div className="col-4">
              <div className="form-group">
                <TextField
                  name="dbaAddress"
                  label="DBA Address*"
                  margin="normal"
                  type="text"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.dbaAddress}
                />
                {this.validator.message(
                  "dbaAddress",
                  this.state.dbaAddress,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <TextField
                  name="dbaCity"
                  label="City*"
                  type="text"
                  margin="normal"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.dbaCity}
                />
                {this.validator.message(
                  "dbaCity",
                  this.state.dbaCity,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-3">
              <div style={{ marginTop: "10px" }}>
                {this.state.loading && (
                  <CustomSelect
                    name="dbaState"
                    label="State Issued*"
                    initialValue={this.state.dbaState}
                    handleChange={(e) =>
                      this.setState({ dbaState: e.target.value })
                    }
                  />
                )}
              </div>
              {this.validator.message(
                "dbaState",
                this.state.dbaState,
                "required|integer"
              )}
            </div>
            <div className="col-2">
              <div className="form-group">
                <FormControl style={{ width: "100%", marginTop: "16px" }}>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Zip Code*
                  </InputLabel>
                  <Input
                    value={this.state.dbaZip}
                    onChange={this.handleChange}
                    name="dbaZip"
                    id="custom-zip2-input"
                    startAdornment
                    inputProps={{
                      block: [5],
                      numericOnly: true,
                    }}
                    inputComponent={InputCustom}
                  />
                </FormControl>

                {this.validator.message(
                  "dbaZip",
                  this.state.dbaZip,
                  "required|string"
                )}
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <TextField
                  name="emailContact"
                  label="Email Contact*"
                  type="email"
                  margin="normal"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.emailContact}
                />
                {this.validator.message(
                  "emailContact",
                  this.state.emailContact,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-4">
              <MaterialUiPhoneNumber
                onlyCountries={["us", "vn"]}
                placeholder="Business Phone Number"
                label="Business Phone*"
                name="businessPhone"
                margin="normal"
                value={this.state.phoneBusiness}
                onChange={(phone) => this.setState({ phoneBusiness: phone })}
              />
            </div>
          </div>
          {/* <h2 style={styles.h2}>Representative Information</h2> */}
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <TextField
                  name="firstName"
                  label="First Name*"
                  type="text"
                  margin="normal"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
                {this.validator.message(
                  "firstName",
                  this.state.firstName,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <TextField
                  name="lastName"
                  label="Last Name*"
                  type="text"
                  margin="normal"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
                {this.validator.message(
                  "lastName",
                  this.state.lastName,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <TextField
                  name="title"
                  label="Title/Position*"
                  type="text"
                  margin="normal"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.title}
                />
                {this.validator.message(
                  "title",
                  this.state.title,
                  "required|string"
                )}
              </div>
            </div>
            <div className="col-3">
              <MaterialUiPhoneNumber
                onlyCountries={["us", "vn"]}
                label="Contact Phone Number*"
                margin="normal"
                placeholder="Business Phone Number"
                name="businessPhone"
                value={this.state.phoneContact}
                onChange={(phone) => this.setState({ phoneContact: phone })}
              />
            </div>
          </div>
          <div
            className="SettingsContent general-content"
            style={{ paddingTop: "20px" }}
          >
            <Button className="btn btn-green" onClick={this.Update}>
              SAVE
            </Button>
            <Button className="btn btn-red" onClick={this._goBack}>
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
  UpdateStatus: state.updateMerchant_Infor,
  getMerchant: state.getMerchant,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
  updateMerchant: (payload) => {
    dispatch(UpdateMerchant_Infor(payload));
  },
  GET_MERCHANT_BY_ID: (ID) => {
    dispatch(GET_MERCHANT_BY_ID(ID));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(General);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
  input: {
    marginTop: "3px",
    marginBottom: "10px",
  },
};
