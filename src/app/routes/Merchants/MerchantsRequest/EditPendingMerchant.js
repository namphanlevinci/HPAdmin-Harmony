import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import URL, { upfileUrl } from "../../../../url/url";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import PendingInput from "./pendingInput";
import Select from "react-select";
import selectState from "../../../../util/selectState";
import PhoneInput from "react-phone-input-2";
import axios from "axios";

import "./MerchantReqProfile.css";
import "./MerchantsRequest.css";
import "bootstrap/js/src/collapse.js";
import "react-phone-input-2/lib/high-res.css";

class EditPendingMerchant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
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

        loading: true,
      },
      () => console.log("this.state", this.state)
    );
  }

  goBack = () => {
    this.props.history.push("/app/merchants/pending/profile");
  };

  render() {
    const e = this.props.PendingProfile;
    // BANK IMAGE
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img className="bankVoid" src={imagePreviewUrl} alt="void" />
      );
    } else {
      $imagePreview = (
        <img className="bankVoid" src={e.businessBank.imageUrl} alt="void" />
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
            <div className="container-fuild">
              <h2>General Information</h2>
              <div className="row justify-content-between">
                <PendingInput
                  label="Legal Business Name*"
                  initValue={this.state.legalBusinessName}
                />

                <PendingInput
                  label="Doing Business As Name (DBA)*"
                  initValue={this.state.doBusinessName}
                />

                <PendingInput
                  label="Federal Tax ID*"
                  initValue={this.state.tax}
                />

                <PendingInput label="Address*" initValue={this.state.address} />
                <PendingInput label="City" initValue={this.state.city} />
                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>State</label>
                  <div>
                    {this.state.loading === true ? (
                      <Select
                        // onChange={handleSelect}
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

                <PendingInput label="Zip*" initValue={this.state.zip} />
                <PendingInput
                  label="Email Contact*"
                  initValue={this.state.emailContact}
                />
                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>Business Phone Number</label>
                  <PhoneInput
                    style={{ marginTop: "10px" }}
                    country={"us"}
                    placeholder="Business Phone Number"
                    name="businessPhone"
                    value={this.state.phoneBusiness}
                    // onChange={(e) => (e, "businessPhone")}
                  />
                </div>
              </div>
              <h2 style={{ paddingTop: "15px" }}>Representative Information</h2>
              <div className="row justify-content-between">
                <PendingInput
                  styles="col-3"
                  label="First Name"
                  initValue={this.state.firstName}
                />
                <PendingInput
                  styles="col-3"
                  label="Last Name"
                  initValue={this.state.lastName}
                />
                <PendingInput
                  styles="col-3"
                  label="Title"
                  initValue={this.state.title}
                />

                <div className="col-3" style={{ paddingTop: "10px" }}>
                  <label>Contact Phone Number*</label>
                  <PhoneInput
                    country={"us"}
                    style={{ marginTop: "10px" }}
                    placeholder="Contact Phone Number"
                    name="phoneContact"
                    value={this.state.phoneContact}
                    // onChange={(e) => (e, "businessPhone")}
                  />
                </div>
              </div>
              {/* BANK INFORMATION */}
              <h2 style={{ paddingTop: "15px" }}>Bank Information</h2>
              <div className="row justify-content-between">
                <PendingInput
                  styles="col-3"
                  label="Bank Name"
                  initValue={this.state.bankName}
                />
                <PendingInput
                  styles="col-3"
                  label="Account Holder Name"
                  initValue={this.state.accountHolderName}
                />
                <PendingInput
                  styles="col-3"
                  label="ABA Routing Number"
                  initValue={this.state.routingNumber}
                />
                <PendingInput
                  styles="col-3"
                  label="Account Number (DDA)*"
                  initValue={this.state.accountNumber}
                />
              </div>
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
