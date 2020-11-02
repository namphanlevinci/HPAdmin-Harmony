import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../../../util/CustomText";
export class License extends Component {
  render() {
    const Staff = this.props.Staff;

    return (
      <Grid container spacing={3} className="container-fluid">
        <Grid item xs={12}>
          <CustomTitle value="Licenses" />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextLabel value="Driver License" />
          <CustomText value={Staff?.driverLicense} />
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomTextLabel value="Social Security Number" />
          <CustomText value={Staff?.ssn} />
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomTextLabel value="Professional License" />
          <CustomText value={Staff?.professionalLicense} />
        </Grid>

        <Grid item xs={12} style={{ marginTop: "200px" }}>
          <Button
            className="btn btn-green"
            onClick={() =>
              this.props.history.push("/app/merchants/staff/license/edit")
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

export default connect(mapStateToProps)(License);
