import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { Helmet } from "react-helmet";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  CustomTitle,
  CustomTextLabel,
  CustomText,
} from "../../../../util/CustomText";
import { getAllUser } from "../../../../actions/userActions";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Pagination from "@material-ui/lab/Pagination";
import IntlMessages from "../../../../util/IntlMessages";
import FormControl from "@material-ui/core/FormControl";

import "./Logs.css";
import "react-datepicker/dist/react-datepicker.css";
import "moment/locale/it";
import "bootstrap/js/src/collapse.js";

class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 5,
      search_user: "",
      page: 1,
      adminId: 0,
      timeStart: moment().startOf("month").format("YYYY-MM-DD"),
      timeEnd: moment().endOf("month").format("YYYY-MM-DD"),
    };
  }

  handleResetClick = () => {
    this.setState({
      search: "",
      timeStart: moment().startOf("month").format("YYYY-MM-DD"),
      timeEnd: moment().endOf("month").format("YYYY-MM-DD"),
    });
  };
  componentDidMount() {
    this.fetchApi();
    this.props.getAllUser();
  }

  fetchApi = async () => {
    const { page, adminId, timeStart, timeEnd } = this.state;
    const url = `merchantapprovallog?userId=${adminId}&page=${page}&row=20&timeStart=${timeStart}&timeEnd=${timeEnd}`;
    await this.props.fetchApiByPage(url);
  };

  handlePageChange = async (e, page) => {
    await this.setState({ page });
    await this.fetchApi();
  };

  handleSelect = async (e) => {
    await this.setState({
      adminId: e.target.value,
    });
    await this.fetchApi();
  };

  handleDateChange = async (e, name) => {
    const value = moment(e).format("MM/DD/YYYY");
    await this.setState({
      [name]: value,
    });
    await this.fetchApi();
  };

  handleReset = async () => {
    await this.setState({
      adminId: 0,
      timeStart: moment().startOf("month").format("YYYY-MM-DD"),
      timeEnd: moment().endOf("month").format("YYYY-MM-DD"),
    });
    await this.fetchApi();
  };

  render() {
    const { data, loading, pageCount } = this.props.apiData;
    const { userList } = this.props.adminUser;

    const renderUser = userList?.map((e) => {
      return (
        <MenuItem key={e?.waUserId} value={`${e?.waUserId}`}>
          {`${e?.firstName} ${e?.lastName}`}
        </MenuItem>
      );
    });

    const logList = data?.map((e, index) => {
      const day = moment.utc(e?.createdDate).local().format("MM/DD/YYYY");
      const time = moment.utc(e?.createdDate).local().format("hh:mm A");
      const status =
        e?.isRejected === 1
          ? "Rejected"
          : e?.isApproved === 1
          ? "Approved"
          : "Handling";
      const rejectReason = e?.reasonReject;
      const user = `${e?.adminUser?.firstName} ${e?.adminUser?.lastName}`;
      const merchantEmail = e?.merchant?.email;
      return (
        <Grid container spacing={6} key={index}>
          <Grid item xs={3} style={{ margin: "auto" }} className="first">
            <CustomText value={`${day} ${time}`} />
          </Grid>
          <Grid item xs={3}>
            <CustomText value="Merchant Request Status" />

            <CustomTextLabel value={`${status} `} />

            {rejectReason && (
              <CustomTextLabel value={`Reason: ${rejectReason}`} />
            )}
          </Grid>
          <Grid item xs={3} className="">
            <CustomText value="Merchant Request From" />
            <CustomTextLabel value={`  ${merchantEmail}`} />
          </Grid>
          <Grid item xs={3} className="">
            <CustomText value="User" />
            <CustomTextLabel value={user} />
          </Grid>
        </Grid>
      );
    });

    return (
      <div className="react-transition swipe-right">
        <Helmet>
          <title>Log | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Logs" />}
        />
        <Grid container spacing={0} className="page-heading">
          <Grid item xs={12}>
            <CustomTitle value="Filter" />
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={4}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="From"
                name="timeStart"
                value={this.state.timeStart}
                onChange={(e) => this.handleDateChange(e, "timeStart")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                autoOk={true}
              />
            </Grid>
            <Grid item xs={4}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="To"
                value={this.state.timeEnd}
                name="timeEnd"
                onChange={(e) => this.handleDateChange(e, "timeEnd")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                autoOk={true}
              />
            </Grid>
            <Grid item xs={2} style={{ marginTop: "16px" }}>
              <FormControl style={{ width: "80%" }}>
                <InputLabel>User</InputLabel>
                <Select value={this.state.adminId} onChange={this.handleSelect}>
                  <MenuItem value={0}>All User</MenuItem>
                  {renderUser}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2} className="reset_btn">
              <Button className="btn btn-red" onClick={this.handleReset}>
                RESET
              </Button>
            </Grid>
          </MuiPickersUtilsProvider>

          <Grid item xs={12} style={{ padding: "20px 0px" }}>
            <CustomTitle value={`Server Time`} />
          </Grid>

          {loading ? (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <CircularProgress />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} className="LogContainerBody">
                {logList}
              </Grid>
              <Grid item xs={12}>
                <Pagination
                  count={pageCount}
                  className="log_pagination"
                  onChange={this.handlePageChange}
                />
              </Grid>
            </>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.fetchApi,
  adminUser: state.adminUser,
});
const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  getAllUser: (url) => {
    dispatch(getAllUser(url));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
