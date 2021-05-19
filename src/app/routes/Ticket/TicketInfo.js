import { connect } from "react-redux";
import React, { Component } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { Grid, Button } from "@material-ui/core";
import { CustomText, CustomTextLabel } from "@/util/CustomText";
import { config } from "@/url/url";
import { Tabs } from "antd";
import { getAllUser } from "@/actions/userActions";

import {
  changeStatus,
  addTicketFile,
  delTicket,
  updateTicketById
} from "@/actions/ticketActions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@/util/linearProgress";
import IntlMessages from "@/util/IntlMessages";
import ContainerHeader from "@components/ContainerHeader/index";
import SliderShow from "./SliderShow/index";
import NewButton from "@components/Button/Search";
import AddButton from "@components/Button/Add";

import CustomSelect from "@components/Select/index";
import Log from "./Active/Log";
import Comment from "./Active/Comment";
import moment from "moment";

import axios from "axios";
import { listUserArray } from "@/util/userList";

import "antd/dist/antd.css";
import "./Ticket.css";

const upFile = config.url.upFile;
class TicketInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      imgUrl: [],
      delDialog: false,
      isOpen: false,
      defaultIndex: 0,
      userRequestId: ''
    };
  }

  componentDidMount() {
    const { data: { requestedBy } } = this.props.ticketInfo;
    this.setState({ userRequestId: requestedBy });
  }

  onChangeUserRequest = async(e) => {
    await this.setState({ userRequestId: e.target.value });
    await this.editTicket();
  }

  editTicket = () => {
    const { userRequestId } = this.state;
    const { data } = this.props.ticketInfo;
    const payload = { ...data , requestBy: userRequestId };
    this.props.updateTicketById(payload);
  }

  handleClickOpen = (index) => {
    this.setState({ isOpen: true, defaultIndex: index });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  editPage = () => {
    this.props.history.push("/app/ticket/edit");
  };

  changeStatus = (e) => {
    const { data } = this.props.ticketInfo;
    this.props.changeStatus({ id: data.id, status: e.target.value });
  };

  handleDel = (ticketID) => {
    this.props.delTicket(ticketID);
  };

  uploadImage = (e, setFieldValue) => {
    e.preventDefault();
    const { data } = this.props.ticketInfo;
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      this.setState({ isUpload: true });
      let formData = new FormData();

      formData.append("Filename", file);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            // setFieldValue(`imageUrl`, reader.result);
            this.setState({
              imgUrl: [...this.state.imgUrl, res.data.data.url],
            });
            this.props.addTicketFile({
              id: data.id,
              fileId: res.data.data.fileId,
            });
          };
          this.setState({
            // fileIds: [...this.state.fileIds, res.data.data.fileId],
            isUpload: false,
          });

          // setFieldValue(`isUpload`, false);
          // setFieldValue(`fileIds`, this.state.fileIds);
        })
        .catch((err) => {
          console.log(err);
          // setFieldValue(`isUpload`, false);
          this.setState({ isUpload: false });
        });
    } else {
      // this.props.warningNotify(
      //   "Image type is not supported, Please choose another image "
      // );
      alert("Image type is not supported, Please choose another image ");
    }
  };

  render() {
    const { data } = this.props.ticketInfo;
    const { userList } = this.props.userList;

    const { userAdmin } = this.props.verifyUser.user;
    const { ticketComment, ticketLog } = this.props;
    const { TabPane } = Tabs;
    const { userRequestId } = this.state;
    return (
      <div className="container-fluid userProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.ticket" />}
        />
        <Grid container spacing={0} className="admin_profile page-heading">
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

              <div>
                <NewButton
                  style={{ marginRight: 20 }}
                  onClick={() => this.setState({ delDialog: true })}
                >
                  Delete
                </NewButton>
                <NewButton
                  onClick={() => this.props.history.push("/app/ticket")}
                >
                  Back
                </NewButton>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <h3 style={{ margin: "20px 0" }}>{`${data.title}`}</h3>

            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Status:" />
                <CustomSelect
                  value={data.status}
                  label="Status"
                  style={{ width: "200px" }}
                  onChange={(e) => this.changeStatus(e)}
                  valuesArr={[
                    { title: "Backlog", value: "backlog" },
                    { title: "In progress", value: "inprogress" },
                    { title: "Waiting", value: "waiting" },
                    { title: "Complete", value: "complete" },
                  ]}
                />
              </div>
              <div style={style}>
                <CustomText value="Request by:" />
                <CustomSelect
                  label="Request by"
                  style={{ width: "200px" }}
                  valuesArr={listUserArray(userList)}
                  onChange={this.onChangeUserRequest}
                  value={userRequestId}
                />
              </div>
            </Grid>
            <hr />
            <Grid item xs={12} md={12}>
              <div style={style}>
                <CustomText value="Description:" />
                <CustomTextLabel
                  value={data.description}
                  styles={{ textAlign: "justify" }}
                />
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
                {moment(data.modifiedDate).format("MMM DD, YYYY") !==
                  "Jan 01, 0001" && (
                    <CustomTextLabel
                      value={moment(data.modifiedDate).format(
                        "MMM DD, YYYY, h:mm:ss A"
                      )}
                    />
                  )}
                {/* <CustomTextLabel
                  value={moment(data.modifiedDate).format(
                    "MMM DD, YYYY, h:mm:ss A"
                  )}
                /> */}
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
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                  }}
                >
                  {data.ticketAttachFiles.map((item, index) => (
                    <img
                      style={{
                        height: "100px",
                        width: "100px",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                      alt=""
                      onClick={() => this.handleClickOpen(index)}
                      key={index}
                      src={item.fileURL}
                    ></img>
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} spacing={3}>
            <div className="content" style={{ height: "100%", marginTop: 20 }}>
              <div className="container-fluid" style={{ height: "100%" }}>
                <div className="profile-nav" style={{ height: "100%" }}>
                  <Tabs defaultActiveKey="1" style={{ height: "100%" }}>
                    <TabPane tab="Comment" key="1" style={{ height: "100%" }}>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", margin: "5px 5px" }}>
              {this.state?.isUpload ? <LinearProgress /> : null}
            </div>
            <AddButton onChange={(e) => this.uploadImage(e)}>
              Add file
            </AddButton>
            <NewButton
              onClick={() => this.editPage()}
              style={{ marginTop: 10 }}
              blue
            >
              Edit
            </NewButton>
          </div>
        </Grid>
        <SliderShow
          isOpen={this.state.isOpen}
          handleClose={this.handleClose}
          imgArr={data.ticketAttachFiles}
          defaultIndex={this.state.defaultIndex}
        />
        <Dialog open={this.state.delDialog}>
          <DialogTitle id="alert-dialog-title">
            {"Delete this Ticket?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want delete this ticket ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ delDialog: false })}
              color="primary"
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                this.handleDel(data.id);
                this.setState({ delDialog: false });
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
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
  userList: state.adminUser,
});
const mapDispatchToProps = (dispatch) => ({
  changeStatus: (payload) => {
    dispatch(changeStatus(payload));
  },
  addTicketFile: (payload) => {
    dispatch(addTicketFile(payload));
  },
  delTicket: (ticketID) => {
    dispatch(delTicket(ticketID));
  },
  getAllUser: (url) => {
    dispatch(getAllUser(url));
  },
  updateTicketById: (payload) => {
    dispatch(updateTicketById(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TicketInfo);
const style = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  marginBottom: "10px",
};
