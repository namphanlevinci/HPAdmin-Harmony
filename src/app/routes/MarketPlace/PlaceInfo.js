import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../util/CustomText";

import { Grid, Button, CardMedia, Switch } from "@material-ui/core";

import CustomSwitch from "./components/Switch";
import defaultImg from "./hpadmin2.png";
import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import QueueIcon from "@material-ui/icons/Queue";

class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      marketPlaceId,
      name,
      fileURL,
      isDisabled,
      link,
      onTop,
    } = this.props.info;

    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Transaction | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.marketPlace" />}
        />

        <div className="page-heading">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <QueueIcon style={{ color: "black" }} size={22} />
              <CustomTitle
                value={name}
                styles={{ color: "black", marginLeft: "10px" }}
              />
            </div>
            <Button
              className="btn btn-red"
              onClick={() => this.props.history.goBack()}
            >
              BACK
            </Button>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
              <CustomTextLabel value="Name" />
              <CustomText value={name} />
            </Grid>
            <Grid item xs={6} md={4}>
              <CustomTextLabel value="URL" />
              <CustomText value={link} />
            </Grid>
            <Grid item xs={4} md={12}>
              <label style={{ marginBottom: "10px" }}>
                Image <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <CardMedia
                component="img"
                src={fileURL === "" ? defaultImg : fileURL}
                alt="void"
                style={{ width: "20%" }}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <CustomTextLabel value="Status" />
              <CustomText
                value={Number(isDisabled) !== 1 ? "Active" : "Disabled"}
              />
            </Grid>
            <Grid item xs={12}>
              On Top
              <CustomSwitch
                // style={{ color: "#0764B0" }}
                // color="primary"
                name="onTop"
                checked={onTop}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: "20px" }}>
            <Button
              className="btn btn-green"
              onClick={() =>
                this.props.history.push(
                  `/app/market-place/${marketPlaceId}/edit`
                )
              }
            >
              EDIT
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.marketInfo.info,
});

export default connect(mapStateToProps, null)(AddPlace);
