import React, { Component } from "react";
import { connect } from "react-redux";
import { viewPrincipal } from "@/actions/merchantActions";
import { Grid, Button } from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "@/util/CustomText";

import moment from "moment";
import CheckPermissions from "@/util/checkPermission";
import NumberFormat from "react-number-format";
import getStateNameById from "@/util/FormatState";

import "./principal.styles.scss";
import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";
class PrincipalProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  editPrincipal = (data) => {
    this.props.viewPrincipal(data);
    this.props.history.push("/app/merchants/profile/principal/edit");
  };

  render() {
    const e = this.props.principalData;
    let ssn = e.ssn.toString().replace(/-/g, '');
    
    return (
      <Grid
        container
        spacing={3}
        className="react-transition swipe-up principal-container container-fluid"
      >
        <Grid item xs={12}>
          <CustomTitle value="Principal Information" />
        </Grid>
        <React.Fragment key={e?.principalId}>
          <Grid item xs={4}>
            <CustomTextLabel value="Name*" />
            <CustomText value={e.firstName + " " + e.lastName} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Title/Position*" />
            <CustomText value={e.title} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Ownership* (%)" />
            <CustomText value={`${e.ownerShip}%`} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Home Phone" />
            <CustomText value={e.homePhone} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Mobile Phone*" />
            <CustomText value={e.mobilePhone} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Address*" />
            <CustomText
              value={`${e.address}, ${e.city}, ${e.state.name}, ${e.zip}`}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Social Security Number* (SSN)" />
            <CustomText value={"********" + ssn.slice(ssn.length - 4)} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Date of Birth* (mm/dd/yy)" />
            <CustomText value={moment(e.birthDate).format("MM/DD/YYYY")} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Email Address*" />
            <CustomText value={e.email} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Driver License Number*" />
            <CustomText value={e.driverNumber} />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="State Issued*" />
            <CustomText value={getStateNameById(e?.stateIssued)} />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Driver License Picture*" />

            {
              <a
                href={`${URL}/file/${e?.fileId}?fileName=DriverLicense-${this.props.PendingProfile?.general?.doBusinessName}`}
                download
              >
                <img
                  className="pending-image"
                  src={`${e?.imageUrl}`}
                  alt="driver license"
                />
              </a>
            }
          </Grid>
        </React.Fragment>
        <Grid item xs={12}>
          {CheckPermissions("edit-merchant") && (
            <Button
              className="btn btn-green"
              onClick={() => this.editPrincipal(e)}
            >
              EDIT
            </Button>
          )}

          <Button
            className="btn btn-red"
            onClick={() =>
              this.props.history.push("/app/merchants/profile/principal")
            }
          >
            BACK
          </Button>
        </Grid>
        {e?.arrayOldData !== undefined
          ? e?.arrayOldData.map((e, index) => {
            return (
              <React.Fragment key={index}>
                <hr />
                <Grid item xs={4}>
                  <CustomTextLabel value="Home Phone" />
                  <CustomText value={e.homePhone} />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextLabel value="Mobile Phone*" />
                  <CustomText value={e.mobilePhone} />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextLabel value="Address*" />
                  <CustomText value={e.address} />
                </Grid>

                <Grid item xs={4}>
                  <CustomTextLabel value="State Issued*" />
                  <CustomText value={e?.stateName} />
                </Grid>

                <Grid item xs={6}>
                  <CustomTextLabel value="Driver License Number*" />
                  <CustomText value={e.driverNumber} />
                </Grid>
                {e?.ImageUrl !== null ? (
                  <Grid item xs={3} lg={3}>
                    <CustomTextLabel value="Driver License Picture*" />
                    <img
                      className="bankVoid"
                      src={`${e?.ImageUrl}`}
                      alt="driver license"
                    />
                  </Grid>
                ) : null}
              </React.Fragment>
            );
          })
          : null}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  principalData: state.updateMerchantPrincipal.principal,
});

const mapDispatchToProps = (dispatch) => ({
  viewPrincipal: (payload) => {
    dispatch(viewPrincipal(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalProfile);
