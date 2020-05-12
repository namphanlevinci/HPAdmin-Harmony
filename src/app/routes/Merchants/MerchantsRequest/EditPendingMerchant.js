import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import URL, { upfileUrl } from "../../../../url/url";

import EditPrincipal from "./EditPrincipal";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import PendingInput from "./pendingInput";
import Select from "react-select";
import selectState from "../../../../util/selectState";
import PhoneInput from "react-phone-input-2";
import axios from "axios";

import "./MerchantReqProfile.css";
// import "./MerchantsRequest.css";
import "bootstrap/js/src/collapse.js";
import "react-phone-input-2/lib/high-res.css";

class EditPendingMerchant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      imagePreviewUrlPrincipal: "",
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
      .post(upfileUrl, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const pendingProfile = this.props.PendingProfile;
    let phone = pendingProfile?.general.phoneBusiness;
    console.log("PendingProfile", pendingProfile);
    this.setState(
      {
        // General
        doBusinessName: pendingProfile?.general?.doBusinessName,
        legalBusinessName: pendingProfile?.general?.legalBusinessName,
        tax: pendingProfile?.general?.tax,
        address: pendingProfile?.general?.address,
        city: pendingProfile?.general?.city,
        stateId: pendingProfile?.general?.stateId,
        stateName: pendingProfile?.state?.name,
        phoneBusiness: pendingProfile?.general.phoneBusiness,
        zip: pendingProfile?.general?.zip,
        emailContact: pendingProfile?.general?.emailContact,
        // Representative Information
        firstName: pendingProfile?.general?.firstName,
        lastName: pendingProfile?.general?.lastName,
        title: pendingProfile?.general?.title,
        phoneContact: pendingProfile?.general?.phoneContact,
        // Bank Information
        bankName: pendingProfile?.businessBank?.name,
        accountHolderName: pendingProfile?.businessBank?.accountHolderName,
        accountNumber: pendingProfile?.businessBank?.accountNumber,
        routingNumber: pendingProfile?.businessBank?.routingNumber,
        // Principal Information
        principals: pendingProfile?.principals,
      },
      () => this.setState({ loading: true }),
      console.log("this.state", this.state)
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
    this.setState(
      {
        [name]: value,
      },
      () => console.log("AFTER STATE CHANGE", this.state)
    );
  };

  getData = async (e, setFieldValue, name) => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrlPrincipal: reader.result,
      });

      console.log("reader.result,", reader.result);
    };
    reader.readAsDataURL(file);
    // handle upload image
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    let formData = new FormData();
    formData.append("Filename3", file);
    const response = await axios.post(upfileUrl, formData, config);
    setFieldValue(name, response.data.data.fileId);

    return response.data.data.fileId;
  };

  render() {
    const e = this.props.PendingProfile;
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
          src={e.businessBank.imageUrl}
          alt="void"
        />
      );
    }

    return (
      <div className="container-fluid PendingList ">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.editPendingMerchant" />}
        />
        <div className="PendingLBody page-heading">
          <div className="PDL-Btn col-12">
            <h3>{"HP-" + e.merchantId}</h3>

            <span>
              <Button className="btn btn-red" onClick={this.goBack}>
                BACK
              </Button>
              <Button className="btn btn-green" onClick={this.handleEdit}>
                SAVE
              </Button>
            </span>
          </div>
          <hr />
          <div className="content react-transition swipe-right">
            <div className="container-fluid">
              <h2 style={{ color: "#4251af", fontWeight: "500" }}>
                General Information
              </h2>
              <div className="row justify-content-between">
                <PendingInput
                  label="Legal Business Name*"
                  name="legalBusinessName"
                  initValue={this.state.legalBusinessName}
                  onChangeInput={this.handleChange}
                />

                <PendingInput
                  label="Doing Business As Name (DBA)*"
                  name="doBusinessName"
                  initValue={this.state.doBusinessName}
                  onChangeInput={this.handleChange}
                />

                <PendingInput
                  label="Federal Tax ID*"
                  name="tax"
                  initValue={this.state.tax}
                  onChangeInput={this.handleChange}
                />

                <PendingInput
                  label="Address*"
                  name=""
                  initValue={this.state.address}
                  onChangeInput={this.handleChange}
                />
                <PendingInput
                  label="City"
                  initValue={this.state.city}
                  onChangeInput={this.handleChange}
                />
                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>State</label>
                  <div>
                    {this.state.loading === true ? (
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
                />
                <PendingInput
                  label="Email Contact*"
                  name="emailContact"
                  initValue={this.state.emailContact}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                />
                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>Business Phone Number</label>
                  <PhoneInput
                    style={{ marginTop: "10px" }}
                    country={"us"}
                    placeholder="Business Phone Number"
                    name="businessPhone"
                    value={this.state.phoneBusiness}
                    onChange={(phone) =>
                      this.setState({ phoneBusiness: phone })
                    }
                  />
                </div>
              </div>
              <h2
                style={{
                  paddingTop: "15px",
                  color: "#4251af",
                  fontWeight: "500",
                }}
              >
                Representative Information
              </h2>
              <div className="row justify-content-between">
                <PendingInput
                  styles="col-3"
                  label="First Name"
                  name="firstName"
                  initValue={this.state.firstName}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                />
                <PendingInput
                  styles="col-3"
                  label="Last Name"
                  name="lastName"
                  initValue={this.state.lastName}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  v
                />
                <PendingInput
                  styles="col-3"
                  label="Title"
                  name="title"
                  initValue={this.state.title}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                />

                <div className="col-3" style={{ paddingTop: "10px" }}>
                  <label>Contact Phone Number*</label>
                  <PhoneInput
                    country={"us"}
                    style={{ marginTop: "10px" }}
                    placeholder="Contact Phone Number"
                    name="phoneContact"
                    value={this.state.phoneContact}
                    onChange={(phone) => this.setState({ phoneContact: phone })}
                  />
                </div>
              </div>
              {/* BANK INFORMATION */}
              <h2
                style={{
                  paddingTop: "15px",
                  color: "#4251af",
                  fontWeight: "500",
                }}
              >
                Bank Information
              </h2>
              <div className="row ">
                <PendingInput
                  styles="col-3"
                  label="Bank Name"
                  name="bankName"
                  initValue={this.state.bankName}
                  onChangeInput={this.handleChange}
                />
                <PendingInput
                  styles="col-3"
                  label="Account Holder Name"
                  name="accountHolderName"
                  initValue={this.state.accountHolderName}
                  onChangeInput={this.handleChange}
                />
                <PendingInput
                  styles="col-3"
                  label="ABA Routing Number"
                  name="routingNumber"
                  initValue={this.state.routingNumber}
                  onChangeInput={this.handleChange}
                />
                <PendingInput
                  styles="col-3"
                  label="Account Number (DDA)*"
                  name="accountNumber"
                  initValue={this.state.accountNumber}
                  onChangeInput={this.handleChange}
                />
                <div className="col-3" style={{ paddingTop: "10px" }}>
                  <label>Void Check*</label> <br />
                  {$imagePreview}
                </div>
                <div
                  className="col-9"
                  style={{ paddingTop: "10px", float: "left" }}
                >
                  <label>Upload new Void Check:</label>
                  <input
                    type="file"
                    style={styles.imageInput}
                    name="image"
                    id="file"
                    onChange={(e) => this._uploadFile(e)}
                  ></input>
                </div>
              </div>
              {/* PRINCIPAL INFORMATION */}
              <h2
                style={{
                  paddingTop: "15px",
                  color: "#4251af",
                  fontWeight: "500",
                }}
              >
                Principal Information
              </h2>
            </div>
            <div className="container-fluid justify-content-between">
              {this.state.loading && (
                <EditPrincipal
                  principals={this.state.principals}
                  getData={this.getData}
                  imagePreviewUrlPrincipal={this.state.imagePreviewUrlPrincipal}
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
  PendingProfile: state.ViewMerchant_Request,
  InfoUser_Login: state.User,
  ApprovalStatus: state.Approval,
  RejectStatus: state.Reject,
});

export default withRouter(connect(mapStateToProps)(EditPendingMerchant));

const styles = {
  image: {
    width: "250px",
    height: "200px",
  },
  imageInput: {
    border: "none",
  },
};
