import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid } from "@material-ui/core";

import {
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../../../util/CustomText";

import Checkbox from "@material-ui/core/Checkbox";
import Select from "react-select";

import "../../Staff.styles.scss";

class WorkTime extends Component {
  render() {
    const Time = this.props.Staff?.workingTimes;
    return (
      <Grid container spacing={3} className="container-fluid Staff">
        <Grid item xs={12} className="header">
          <CustomTitle value="Working Time" />
        </Grid>

        <Grid item xs={2} sm={4} md={2}>
          <CustomTextLabel value="Date" styles={{ color: "#4251af" }} />
        </Grid>

        <Grid item xs={5} sm={4} md={5}>
          <CustomTextLabel value="Shift Start" styles={{ color: "#4251af" }} />
        </Grid>

        <Grid item xs={5} sm={4} md={5}>
          <CustomTextLabel value="Shift End" styles={{ color: "#4251af" }} />
        </Grid>

        <Grid item xs={2} sm={4} md={2}>
          <Checkbox
            name="isCheck2"
            checked={Time?.Monday?.isCheck}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Monday</label>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Monday?.timeStart }}
              isDisabled
            />
          </div>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Monday?.timeEnd }}
              isDisabled
            />
          </div>
        </Grid>

        {/* Tuesday */}
        <Grid item xs={2} sm={4} md={2}>
          <Checkbox
            name="isCheck3"
            checked={Time?.Tuesday?.isCheck}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Tuesday</label>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Tuesday?.timeStart }}
              isDisabled
            />
          </div>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select ">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Tuesday?.timeEnd }}
              isDisabled
            />
          </div>
        </Grid>

        {/* Wednesday */}

        <Grid item xs={2} sm={4} md={2}>
          <Checkbox
            checked={Time?.Wednesday?.isCheck}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Wednesday</label>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Wednesday?.timeStart }}
              isDisabled
            />
          </div>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Wednesday?.timeEnd }}
              isDisabled
            />
          </div>
        </Grid>

        {/* Thursday */}

        <Grid item xs={2} sm={4} md={2}>
          <Checkbox
            checked={Time?.Thursday?.isCheck}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Thursday</label>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Thursday?.timeStart }}
              isDisabled
            />
          </div>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Thursday?.timeEnd }}
              isDisabled
            />
          </div>
        </Grid>

        {/* Friday */}

        <Grid item xs={2} sm={4} md={2}>
          <Checkbox
            name="isCheck5"
            checked={Time?.Friday?.isCheck}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Friday</label>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Friday?.timeStart }}
              isDisabled
            />
          </div>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Friday?.timeEnd }}
              isDisabled
            />
          </div>
        </Grid>

        {/* Saturday */}
        <Grid item xs={2} sm={4} md={2}>
          <Checkbox
            checked={Time?.Saturday?.isCheck}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Saturday</label>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Saturday?.timeStart }}
              isDisabled
            />
          </div>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Saturday?.timeEnd }}
              isDisabled
            />
          </div>
        </Grid>
        {/* Sunday */}
        <Grid item xs={2} sm={4} md={2}>
          <Checkbox
            checked={Time?.Sunday?.isCheck}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Sunday</label>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Sunday?.timeStart }}
              isDisabled
            />
          </div>
        </Grid>
        <Grid item xs={5} sm={4} md={5}>
          <div className="time-select">
            <Select
              options={Time}
              defaultValue={{ label: Time?.Sunday?.timeEnd }}
              isDisabled
            />
          </div>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: "10px" }}>
          <Button
            className="btn btn-green"
            onClick={() =>
              this.props.history.push("/app/merchants/staff/time/edit")
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkTime);
