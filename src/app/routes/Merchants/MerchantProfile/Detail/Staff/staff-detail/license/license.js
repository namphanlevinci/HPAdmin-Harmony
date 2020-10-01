import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../../../util/CustomText";
export class license extends Component {
  render() {
    const Staff = this.props.Staff;

    return (
      <Grid container spacing={3} className="container-fluid">
        <Grid item xs={12}>
          <CustomTitle value="Licenses" />
        </Grid>
        <Grid item xs={4}>
          <CustomTextLabel value="Driver License" />
          <CustomText value={Staff?.driverLicense} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Social Security Number" />
          <CustomText value={Staff?.ssn} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Professional License" />
          <CustomText value={Staff?.professionalLicense} />
        </Grid>

        <Grid
          item
          xs={12}
          className="SettingsContent general-content"
          style={{ marginTop: "200px" }}
        >
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
  Staff: state.MerchantReducer.StaffData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(license);

// const styles = {
//   h2: {
//     paddingBottom: "10px",
//   },
//   input: {
//     marginBottom: "10px",
//   },
// };
