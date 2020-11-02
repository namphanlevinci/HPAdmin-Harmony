import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";

import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../../../util/CustomText";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import "../../Staff.styles.scss";
export class General extends Component {
  render() {
    const Staff = this.props.Staff;
    return (
      <Grid container spacing={3} className="content">
        <Grid item xs={12}>
          <CustomTitle value="General Information" />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="First Name*" />
          <CustomText value={Staff?.firstName} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Last Name*" />
          <CustomText value={Staff?.lastName} />
        </Grid>
        <Grid item xs={4}>
          <CustomTextLabel value="Display Name*" />
          <CustomText value={Staff?.displayName} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Address" />
          <CustomText value={Staff?.address} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="City" />
          <CustomText value={Staff?.city} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="State" />
          <CustomText value={Staff?.stateName} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Zip Code" />
          <CustomText value={Staff?.zip} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Cell Phone" />
          <CustomText value={Staff?.phone} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Contact Email" />
          <CustomText value={Staff?.email} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Create PIN*" />
          <CustomText value="****" />
        </Grid>

        <Grid item xs={4}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Staff?.isActive}
                control={<Checkbox color="primary" />}
                label="Visible on App"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <CustomTextLabel value="Role" />
          <CustomText value={Staff?.roleName} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Status" />
          <CustomText
            value={Staff?.isDisabled === 0 ? "Available" : "Not Available"}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3} lg={3}>
          <CustomTextLabel value="Avatar" />
          <img
            src={Staff?.imageUrl}
            style={{
              width: "100%",
              height: "auto",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "50%",
            }}
            alt="staff_avatar"
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: "25px" }}>
          <Button
            className="btn btn-green"
            onClick={() =>
              this.props.history.push("/app/merchants/staff/General/edit")
            }
          >
            EDIT
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  Staff: state.staffById.data,
});

export default connect(mapStateToProps)(General);
