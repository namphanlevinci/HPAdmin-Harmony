import { connect } from "react-redux";
import React, { Component } from "react";
import { AnimatePresence } from "framer-motion";
import { AiFillAppstore } from "react-icons/ai";
import {
  Grid,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  CardMedia,
  Switch,
} from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../util/CustomText";
import { Tabs } from "antd";
import { changeStatus } from "../../../actions/ticketActions";
import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import NewButton from "../../../components/Button/Search";
import CustomSelect from "../../../components/Select/index";
import Log from "./Active/Log";
import Comment from "./Active/Comment";
import moment from "moment";
import CheckPermissions from "../../../util/checkPermission";
// routes\Consumers\ConsumerProfile\Detail\Consumer.css
// D:\levinci\HarmonyPay\Hpadmin\src\app\routes\Merchants\PendingList\MerchantReqProfile.css
import "antd/dist/antd.css";
import "./Ticket.css";

class TicketInfo extends Component {
  constructor(props) {
    super(props);
  }
  EditPage = () => {
    this.props.history.push("/app/ticket/edit");
  };
  changeStatus = (e) => {
    console.log(e.target.value);
    const { data } = this.props.ticketInfo;

    this.props.changeStatus({ id: data.id, status: e.target.value });
  };
  render() {
    const { data } = this.props.ticketInfo;
    const { userAdmin } = this.props.verifyUser.user;
    const { ticketComment, ticketLog } = this.props;
    const { TabPane } = Tabs;
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
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <AiFillAppstore size={23} style={{ color: " black" }} />
                <h3
                  style={{ margin: 0, marginLeft: 5, fontSize: 20 }}
                >{`Ticket ID: ${data.id}`}</h3>
              </div>

              <NewButton onClick={() => this.props.history.push("/app/ticket")}>
                Back
              </NewButton>
            </div>
          </Grid>

          <Grid item xs={12} md={6} spacing={3}>
            <h3 style={{ margin: "20px 0" }}>{`${data.title}`}</h3>
            <CustomSelect
              value={data.status}
              onChange={(e) => this.changeStatus(e)}
              valuesArr={[
                { title: "Backlog", value: "backlog" },
                { title: "Waiting", value: "waiting" },
                { title: "Complete", value: "complete" },
                { title: "Inprogress", value: "inprogress" },
              ]}
            />
            <hr />
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Description:" />
                <CustomTextLabel value={data.description} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Application:" />
                <CustomTextLabel value={data.clientApp} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Client name:" />
                <CustomTextLabel value={data.clientName} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Create by:" />
                <CustomTextLabel value={data.createdUserName} />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Date create:" />
                <CustomTextLabel
                  value={moment(data.createdDate).format(
                    "MMM DD, YYYY, h:mm:ss A"
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Last update:" />
                <CustomTextLabel
                  value={moment(data.modifiedDate).format(
                    "MMM DD, YYYY, h:mm:ss A"
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Modified by:" />
                <CustomTextLabel value={data.modifiedUserName} />
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
                <CustomText value="Attack file:" />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  }}
                >
                  {data.ticketAttachFiles.map((item, index) => (
                    <img
                      style={{
                        height: "80px",
                        width: "80px",
                        margin: "5px 5px 5px 0px",
                      }}
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
                      <Comment
                        data={data}
                        userAdmin={userAdmin}
                        ticketComment={ticketComment}
                      />
                    </TabPane>
                    <TabPane tab="Log" key="2">
                      <Log data={data} ticketLog={ticketLog} />
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
  ticketComment: state.getTicketCommentById,
  ticketLog: state.getTicketLogById,
});
const mapDispatchToProps = (dispatch) => ({
  changeStatus: (payload) => {
    dispatch(changeStatus(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TicketInfo);
const style = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  marginBottom: "10px",
};
