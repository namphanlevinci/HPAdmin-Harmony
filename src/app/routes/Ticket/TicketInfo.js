import { connect } from "react-redux";
import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withRouter, Route, NavLink, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AiFillAppstore } from "react-icons/ai";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../util/CustomText";
import { Tabs } from "antd";

import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import NewButton from "../../../components/Button/Search";
import Log from "./Active/Log";
import Comment from "./Active/Comment";
import Button from "@material-ui/core/Button";
import moment from "moment";
import CheckPermissions from "../../../util/checkPermission";
// routes\Consumers\ConsumerProfile\Detail\Consumer.css
// D:\levinci\HarmonyPay\Hpadmin\src\app\routes\Merchants\PendingList\MerchantReqProfile.css
import "antd/dist/antd.css";

class TicketInfo extends Component {
  constructor(props) {
    super(props);
  }
  EditPage = () => {
    this.props.history.push("/app/ticket/edit");
  };
  render() {
    const { data } = this.props.ticketInfo;
    const { userAdmin } = this.props.verifyUser.user;
    const { TabPane } = Tabs;
    console.log("props", this.props);

    return (
      <div className="container-fluid userProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.ticket" />}
        />
        <Grid
          container
          spacing={0}
          className="admin_profile page-heading"
          xs={12}
        >
          <Grid xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <AiFillAppstore size={23} style={{ color: " black" }} />
                <h3 style={style}>{`Ticket ID: ${data.id}`}</h3>
              </div>
              <NewButton onClick={() => this.props.history.push('/app/ticket')}>
                Back
              </NewButton>
            </div>
          </Grid>

          <Grid item xs={12} md={6} spacing={3}>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomTextLabel value="Description:" />
                <CustomText value={data.description} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomTextLabel value="Application:" />
                <CustomText value={data.clientApp} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomTextLabel value="Client name:" />
                <CustomText value={data.clientName} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomTextLabel value="Create by:" />
                <CustomText value={data.createdUserName} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomTextLabel value="Date create:" />
                <CustomText
                  value={moment(data.createdDate).format(
                    "MMM DD, YYYY, h:mm:ss A"
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomTextLabel value="Last update:" />
                <CustomText
                  value={moment(data.modifiedDate).format(
                    "MMM DD, YYYY, h:mm:ss A"
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomTextLabel value="Modified by:" />
                <CustomText value={data.modifiedUserName} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  margin: "10px 0",
                  flexDirection: "column",
                }}
              >
                <CustomTextLabel value="Attack file:" />
                <div>
                  {data.ticketAttachFiles.map((item, index) => (
                    <img
                      style={{ height: "80px", margin: "5px 5px 5px 0px" }}
                      alt=""
                      key={index}
                      src={item.fileURL}
                    ></img>
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} spacing={3}>
            <div className="content">
              <div className="container-fluid">
                <div className="profile-nav">
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Comment" key="1">
                      <Comment data={data} userAdmin={userAdmin} />
                    </TabPane>
                    <TabPane tab="Log" key="2">
                      <div
                        style={{
                          height: "350px",
                          overflow: "scroll",
                          overflowX: "hidden",
                        }}
                      >
                        <Log data={data} />
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </Grid>
          <Button
            style={{
              backgroundColor: "#0764B0",
              color: "white",
              marginTop: "10px",
            }}
            className="btn btn-red"
            onClick={() => this.EditPage()}
          >
            Edit
          </Button>
        </Grid>
      </div>
    );
  }
}

TicketInfo.propTypes = {};
const mapStateToProps = (state) => ({
  ticketInfo: state.getTicketById,
  verifyUser: state.verifyUser,
});
export default connect(mapStateToProps)(TicketInfo);
const style = { display: "flex", alignItems: "center", margin: "10px 0" };
