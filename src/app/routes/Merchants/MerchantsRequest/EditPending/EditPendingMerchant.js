import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "../../../../../url/url";
import { GET_MERCHANT_BY_ID } from "../../../../../actions/merchants/actions";

import EditPrincipal from "./EditPrincipal";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../../util/IntlMessages";
import MaterialUiPhoneNumber from "material-ui-phone-number";

import axios from "axios";
import LinearProgress from "../../../../../util/linearProgress";
import SimpleReactValidator from "simple-react-validator";
import CustomSelect from "../../../../../util/getState";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
  WARNING_NOTIFICATION,
} from "../../../../../actions/notifications/actions";
import InputCustom from "../../MerchantsList/addMerchant/custom-input";
import update from "immutability-helper";

import "../MerchantReqProfile.css";
import "bootstrap/js/src/collapse.js";

const upFile = config.url.upFile;

class EditPendingMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      progress: false,
      progressPrincipal: false,
      isSubmitting: false,
    };
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required",
      },
    });
  }

  _uploadFile = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    this.setState({ progress: true });
    // handle upload image
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
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            progress: false,
          });
        };
        reader.readAsDataURL(file);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmitting = () => {
    this.setState({ isSubmitting: true });
  };

  handleSubmitFail = () => {
    this.setState({ isSubmitting: false });
  };

  async componentDidMount() {
    const Profile = this.props.Profile;
    var BusinessQuestionObject = Profile?.business.reduce(
      (obj, item, index) =>
        Object.assign(obj, {
          [`question${index + 1}`]: {
            isAccept: item?.answer,
            desc: item?.answerReply,
            question: item?.question,
          },
        }),
      {}
    );

    let newPrincipalState = update(Profile, {
      principals: {
        $apply: (b) =>
          b.map((item, ii) => {
            return {
              ...item,
              DateOfBirth: item.birthDate,
            };
          }),
      },
    });

    this.setState(
      {
        ID: Profile?.merchantId,
        // General
        doBusinessName: Profile?.general?.doBusinessName,
        legalBusinessName: Profile?.general?.legalBusinessName,
        tax: Profile?.general?.tax,
        address: Profile?.general?.address,
        city: Profile?.general?.city,
        stateId: Profile?.general?.stateId,
        stateName: Profile?.state?.name,
        phoneBusiness: Profile?.general.phoneBusiness,
        zip: Profile?.general?.zip,
        emailContact: Profile?.general?.emailContact,
        // dbaAddress
        dbaAddress: Profile?.general?.dbaAddress?.Address,
        dbaCity: Profile?.general?.dbaAddress?.City,
        dbaState: Profile?.general?.dbaAddress?.State,
        dbaZip: Profile?.general?.dbaAddress?.Zip,
        // Representative Information
        firstName: Profile?.general?.firstName,
        lastName: Profile?.general?.lastName,
        title: Profile?.general?.title,
        phoneContact: Profile?.general?.phoneContact,
        // Business Questions
        business: BusinessQuestionObject,
        // Bank Information
        bankName: Profile?.businessBank?.name,
        accountHolderName: Profile?.businessBank?.accountHolderName,
        accountNumber: Profile?.businessBank?.accountNumber,
        routingNumber: Profile?.businessBank?.routingNumber,
        fileId: Profile?.businessBank?.fileId,
        // Principal Information
        principals: newPrincipalState.principals,
      },
      () => this.setState({ loading: true })
    );
  }

  goBack = () => {
    this.props.history.push("/app/merchants/pending/profile");
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  checkValid = () => {
    if (this.validator.allValid()) {
      return true;
    } else {
      this.validator.showMessages();
      this.forceUpdate();

      return false;
    }
  };

  getData = async (e, setFieldValue, name) => {
    e.preventDefault();
    let imagePreview =
      name === "PrincipalInfo.0.fileId"
        ? "PrincipalInfo.0.imageUrl"
        : "PrincipalInfo.1.imageUrl";

    let file = e.target.files[0];
    this.setState({ progressPrincipal: true });
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    let formData = new FormData();
    formData.append("Filename3", file);
    const response = await axios.post(upFile, formData, config);
    setFieldValue(name, response.data.data.fileId);
    let reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue(imagePreview, reader.result);
      this.setState({ progressPrincipal: false });
    };
    reader.readAsDataURL(file);
    return response.data.data.fileId;
  };

  render() {
    const e = this.props.Profile;

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          className="bankVoid"
          src={imagePreviewUrl}
          alt="void"
          style={styles.image}
        />
      );
    } else {
      $imagePreview = (
        <img
          className="bankVoid"
          style={styles.image}
          src={e?.businessBank?.imageUrl}
          alt="void"
        />
      );
    }

    return (
      <div className="container-fluid content-list ">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.editPendingMerchant" />}
        />
        <div className="content-body page-heading">
          <div className="header col-12">
            <h3>{"HP-" + e.merchantId}</h3>
          </div>
          <hr />
          <div className="content react-transition swipe-right">
            <div className="container-fluid">
              <h2 style={{ color: "#4251af", fontWeight: "400" }}>
                General Information
              </h2>
              <div className="row ">
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "legalBusinessName",
                          this.state.legalBusinessName,
                          "required|string"
                        )}
                      </p>
                    }
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "doingBusiness",
                          this.state.doBusinessName,
                          "required|string"
                        )}
                      </p>
                    }
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "tax",
                          this.state.tax,
                          "required|string"
                        )}
                      </p>
                    }
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "address",
                          this.state.address,
                          "required|string"
                        )}
                      </p>
                    }
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "city",
                          this.state.city,
                          "required|string"
                        )}
                      </p>
                    }
                  </div>
                </div>
                <div className="col-3">
                  <div style={{ marginTop: "16px" }}>
                    {this.state.loading && (
                      <CustomSelect
                        name="state"
                        label="State Issued*"
                        initialValue={this.state.stateId}
                        handleChange={(e) =>
                          this.setState({ stateId: e.target.value })
                        }
                      />
                    )}
                  </div>
                  {
                    <p style={styles.p}>
                      {this.validator.message(
                        "state",
                        this.state.stateId,
                        "required|integer"
                      )}
                    </p>
                  }
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

                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "zip",
                          this.state.zip,
                          "required|string"
                        )}
                      </p>
                    }
                  </div>
                </div>

                {/* // DBA ADDRESS */}
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "dbaAddress",
                          this.state.dbaAddress,
                          "required|string"
                        )}
                      </p>
                    }
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "dbaCity",
                          this.state.dbaCity,
                          "required|string"
                        )}
                      </p>
                    }
                  </div>
                </div>
                <div className="col-3">
                  <div style={{ marginTop: "16px" }}>
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
                  {
                    <p style={styles.p}>
                      {this.validator.message(
                        "dbaState",
                        this.state.dbaState,
                        "required|integer"
                      )}
                    </p>
                  }
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

                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "dbaZip",
                          this.state.dbaZip,
                          "required|string"
                        )}
                      </p>
                    }
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "emailContact",
                          this.state.emailContact,
                          "required|email"
                        )}
                      </p>
                    }
                  </div>
                </div>

                <div className="col-4">
                  {this.state.loading && (
                    <MaterialUiPhoneNumber
                      onlyCountries={["us", "vn"]}
                      style={{ marginTop: "10px" }}
                      label="Business Phone Number*"
                      name="businessPhone"
                      value={this.state.phoneBusiness}
                      onChange={(phone) =>
                        this.setState({ phoneBusiness: phone })
                      }
                    />
                  )}
                </div>
              </div>
              <div className="row justify-content-between">
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "firstName",
                          this.state.firstName,
                          "required|string"
                        )}
                      </p>
                    }
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "lastName",
                          this.state.lastName,
                          "required|string"
                        )}
                      </p>
                    }
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
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "title",
                          this.state.title,
                          "required|string"
                        )}
                      </p>
                    }
                  </div>
                </div>
                <div className="col-3">
                  {this.state.loading && (
                    <MaterialUiPhoneNumber
                      onlyCountries={["us", "vn"]}
                      style={{ marginTop: "10px" }}
                      label="Contact Phone Number*"
                      name="phoneContact"
                      value={this.state.phoneContact}
                      onChange={(phone) =>
                        this.setState({ phoneContact: phone })
                      }
                    />
                  )}
                </div>
              </div>

              {/* BANK INFORMATION */}
              <h2
                style={{
                  paddingTop: "15px",
                  color: "#4251af",
                  fontWeight: "400",
                }}
              >
                Bank Information
              </h2>
              <div className="row ">
                <div className="col-3">
                  <div className="form-group">
                    <TextField
                      name="accountHolderName"
                      value={this.state.accountHolderName}
                      id="cardHolder3"
                      label="Account Holder Name*"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                    />
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "accountHolderName",
                          this.state.accountHolderName,
                          "required|string"
                        )}
                      </p>
                    }
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <TextField
                      name="bankName"
                      value={this.state.bankName}
                      id="cardHolder1"
                      label="Bank Name*"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                    />
                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "bankName",
                          this.state.bankName,
                          "required|string"
                        )}
                      </p>
                    }
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <FormControl style={{ width: "100%", marginTop: "16px" }}>
                      <InputLabel htmlFor="formatted-text-mask-input">
                        Routing Number* (ABA)
                      </InputLabel>
                      <Input
                        value={this.state.routingNumber}
                        onChange={this.handleChange}
                        name="routingNumber"
                        id="custom-routingNumber-input"
                        inputProps={{
                          block: [12],
                          numericOnly: true,
                        }}
                        inputComponent={InputCustom}
                        startAdornment
                      />
                    </FormControl>

                    {
                      <p style={styles.p}>
                        {this.validator.message(
                          "routingNumber",
                          this.state.routingNumber,
                          "required|string"
                        )}
                      </p>
                    }
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <FormControl style={{ width: "100%", marginTop: "16px" }}>
                      <InputLabel htmlFor="formatted-text-mask-input">
                        Account Number* (ABA)
                      </InputLabel>
                      <Input
                        value={this.state.accountNumber}
                        onChange={this.handleChange}
                        name="accountNumber"
                        id="custom-accountNumber-input"
                        startAdornment
                        inputProps={{
                          block: [12],
                          numericOnly: true,
                        }}
                        inputComponent={InputCustom}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="col-3" style={{ paddingTop: "10px" }}>
                  <label style={{ paddingBottom: "10px" }}>Void Check*</label>{" "}
                  <br />
                  {$imagePreview}
                  <div style={{ width: "100%", marginTop: "5px" }}>
                    {this.state.progress ? <LinearProgress /> : null}
                  </div>
                  <input
                    type="file"
                    style={styles.imageInput}
                    name="image"
                    id="file"
                    className="custom-input"
                    onChange={(e) => this._uploadFile(e)}
                  />
                </div>
              </div>
              {/* PRINCIPAL INFORMATION */}
              <h2
                style={{
                  paddingTop: "15px",
                  color: "#4251af",
                  fontWeight: "400",
                }}
              >
                Principal Information
              </h2>
            </div>
            <div className="container-fluid justify-content-between">
              {this.state.loading && (
                <EditPrincipal
                  checkValid={this.checkValid}
                  initValue={this.state}
                  principals={this.state.principals}
                  getData={this.getData}
                  token={this.props.userLogin.token}
                  GetMerchantByID={this.props.GET_MERCHANT_BY_ID}
                  history={this.props.history}
                  SuccessNotification={this.props.SUCCESS_NOTIFICATION}
                  FailureNotification={this.props.FAILURE_NOTIFICATION}
                  WarningNotification={this.props.WARNING_NOTIFICATION}
                  handleSubmit={this.handleSubmitting}
                  handleSubmitFail={this.handleSubmitFail}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Profile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
  RejectStatus: state.Reject,
});

const mapDispatchToProps = (dispatch) => ({
  GET_MERCHANT_BY_ID: (payload) => {
    dispatch(GET_MERCHANT_BY_ID(payload));
  },
  SUCCESS_NOTIFICATION: (payload) => {
    dispatch(SUCCESS_NOTIFICATION(payload));
  },
  FAILURE_NOTIFICATION: (payload) => {
    dispatch(FAILURE_NOTIFICATION(payload));
  },
  WARNING_NOTIFICATION: (payload) => {
    dispatch(WARNING_NOTIFICATION(payload));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditPendingMerchant)
);

const styles = {
  image: {
    width: "250px",
    height: "200px",
  },
  imageInput: {
    border: "none",
    marginTop: "10px",
  },
  p: {
    color: "red",
    fontSize: "18px",
  },
};
