import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "../../../../url/url";
import { ViewMerchant_Request } from "../../../../actions/merchants/actions";

import EditPrincipal from "./EditPrincipal";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import PendingInput from "./pendingInput";
import Select from "react-select";
import selectState from "../../../../util/selectState";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import LinearProgress from "../../../../util/linearProgress";
import SimpleReactValidator from "simple-react-validator";

import "./MerchantReqProfile.css";
import "bootstrap/js/src/collapse.js";
import "react-phone-input-2/lib/high-res.css";

const URL = config.url.URL;
const upFile = config.url.upFile;

class EditPendingMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      progress: false,
      progressPrincipal: false,
    };
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required", // will override all messages
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
        principals: Profile?.principals,
      },
      () => this.setState({ loading: true })
    );
  }

  goBack = () => {
    this.props.history.push("/app/merchants/pending/profile");
  };

  // handle Input
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
    // handle upload image
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    let formData = new FormData();
    formData.append("Filename3", file);
    const response = await axios.post(upFile, formData, config);
    setFieldValue(name, response.data.data.fileId);

    // handle preview Image
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

    // BANK IMAGE
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
              <div className="row justify-content-between">
                <PendingInput
                  label="Legal Business Name*"
                  name="legalBusinessName"
                  initValue={this.state.legalBusinessName}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />

                <PendingInput
                  label=" Doing Business As* (DBA)"
                  name="doBusinessName"
                  initValue={this.state.doBusinessName}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />

                <PendingInput
                  label="Federal Tax ID*"
                  name="tax"
                  initValue={this.state.tax}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />

                <PendingInput
                  label="Business Address* (no P.O. Boxes)"
                  name="address"
                  initValue={this.state.address}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />
                <PendingInput
                  label="City"
                  name="city"
                  initValue={this.state.city}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />
                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>State</label>
                  <div>
                    {this.state.loading ? (
                      <Select
                        onChange={(e) => this.setState({ stateId: e.value })}
                        defaultValue={{
                          label: `${this.state.stateName}`,
                          value: this.state.stateId,
                        }}
                        name="state"
                        options={selectState}
                      />
                    ) : null}
                  </div>
                </div>

                <PendingInput
                  label="Zip*"
                  name="zip"
                  initValue={this.state.zip}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  validator={this.validator}
                />
                <PendingInput
                  label="Email Contact*"
                  name="emailContact"
                  initValue={this.state.emailContact}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  validator={this.validator}
                />
                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>Business Phone Number</label>
                  {this.state.loading && (
                    <PhoneInput
                      style={{ marginTop: "10px" }}
                      placeholder="Business Phone Number"
                      name="businessPhone"
                      value={this.state.phoneBusiness}
                      onChange={(phone) =>
                        this.setState({ phoneBusiness: phone })
                      }
                    />
                  )}
                </div>
              </div>
              {/* <h2
                style={{
                  paddingTop: "15px",
                  color: "#4251af",
                  fontWeight: "400",
                }}
              >
                Representative Information
              </h2> */}
              <div className="row justify-content-between">
                <PendingInput
                  styles="col-3"
                  label="First Name"
                  name="firstName"
                  initValue={this.state.firstName}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  validator={this.validator}
                />
                <PendingInput
                  styles="col-3"
                  label="Last Name"
                  name="lastName"
                  initValue={this.state.lastName}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  validator={this.validator}
                />
                <PendingInput
                  styles="col-3"
                  label="Title/Position"
                  name="title"
                  initValue={this.state.title}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  validator={this.validator}
                />

                <div className="col-3" style={{ paddingTop: "10px" }}>
                  <label>Contact Phone Number*</label>
                  {this.state.loading && (
                    <PhoneInput
                      style={{ marginTop: "10px" }}
                      placeholder="Contact Phone Number"
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
                <PendingInput
                  styles="col-3"
                  label="Account Holder Name*"
                  name="accountHolderName"
                  initValue={this.state.accountHolderName}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />
                <PendingInput
                  styles="col-3"
                  label="Bank Name*"
                  name="bankName"
                  initValue={this.state.bankName}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />

                <PendingInput
                  styles="col-3"
                  label="ABA Routing Number*"
                  name="routingNumber"
                  initValue={this.state.routingNumber}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />
                <PendingInput
                  styles="col-3"
                  label="Account Number (DDA)*"
                  name="accountNumber"
                  initValue={this.state.accountNumber}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />
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
                  ViewMerchant_Request={this.props.ViewMerchant_Request}
                  history={this.props.history}
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
  Profile: state.ViewMerchant_Request,
  userLogin: state.userReducer.User,
  ApprovalStatus: state.Approval,
  RejectStatus: state.Reject,
});

const mapDispatchToProps = (dispatch) => ({
  ViewMerchant_Request: (payload) => {
    dispatch(ViewMerchant_Request(payload));
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
};
