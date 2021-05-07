import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../util/CustomText";
import { Typography } from "@material-ui/core";
import { fetchApiByPage } from "../../../actions/fetchApiActions";
import {
  getTicketByID,
  getTicketCommentById,
  getTicketLogById,
} from "../../../actions/ticketActions";
import { getAllUser } from "../../../actions/userActions";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { debounce } from "lodash";

import NewButton from "../../../components/Button/Search";
import ResetButton from "../../../components/Button/Reset";
import Status from "./components/Status";
import SearchComponent from "../../../util/searchComponent";
import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
import ReactTable from "react-table";
import CheckPermissions from "../../../util/checkPermission";
import moment from "moment";
import { reloadUrl } from '../../../util/reload';

import "react-table/react-table.css";
import "../Merchants/Merchants.css";
import "../Merchants/PendingList/MerchantReqProfile.css";
import "./Ticket.css";

class Tiket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      statusValue: "all",
      data: "",
      loading: false,
    };
    this.refTable = React.createRef();
  }
  // componentDidMount = async () => {
  //   // this.props.fetchApiByPage(`ticket?status=all`);
  // };
  componentDidMount = () => {
    this.props.getAllUser();
    const { statusAddTicket } = this.props;
    if (statusAddTicket == true) {
      this.resetFirstPage();
      this.props.updateStatusAddTicket(false);
    }
  };
  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const { search, statusValue } = this.state;
    const url = `ticket/?keySearch=${search}&page=${page === 0 ? 1 : page + 1
      }&row=${pageSize}&status=${statusValue}`;

    this.props.fetchApiByPage(url);
  };
  handleReset = debounce((e) => {
    this.setState({ search: "", statusValue: "all" });
    this.fetchApi();
  }, 1000);
  ticketInfo = (ID) => {
    const path = "/app/ticket/detail";
    this.props.getTicketByID(ID, path);
    this.props.getTicketCommentById(ID);
    this.props.getTicketLogById(ID);
  };
  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };
  keyPressed = (event) => {
    if (event.key === "Enter") {
      // event.preventDefault();
      this.setState({ loading: true });
      this.fetchApi();
    }
  };

  addTicket = () => {
    this.props.history.push("/app/ticket/add-ticket");
  };
  handleStatus = debounce((e) => {
    this.setState({ statusValue: e.target.value });
    this.fetchApi();
  }, 1000);

  resetFirstPage = () => {
    this.changePage(0);
    if (this.refTable && this.refTable.current)
      this.refTable.current.onPageChange(0);
    const els = document.getElementsByClassName('-pageJump');
    const inputs = els[0].getElementsByTagName('input');
    inputs[0].value = 1;
    reloadUrl('app/ticket');
  }

  render() {
    const { statusValue, page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    console.log({ data })

    const columns = [
      {
        Header: <CustomTableHeader value="ID" />,
        id: "id",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.id}
          </Typography>
        ),
        width: 60,
      },
      {
        Header: <CustomTableHeader value="Title" />,
        id: "title",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.title}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Application" />,
        id: "app",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.clientApp}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Client Name" />,
        id: "clientName",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.clientName}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Created by" />,
        id: "createBy",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.createdUserName}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Last Updated" />,
        id: "lastUpdate",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(row?.modifiedDate).format("MM/DD/YYYY") !== "01/01/0001" &&
              moment(row?.modifiedDate).format("MM/DD/YYYY")}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Modified by" />,
        id: "modifiedBy",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.modifiedUserName}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Status" />,
        id: "status",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            <Status status={row?.status}>{row?.status}</Status>
          </Typography>
        ),
      },
    ];
    const onRowClick = (state, rowInfo) => {
      return {
        onClick: (e) => {
          console.log(rowInfo);
          if (rowInfo !== undefined) {
            this.ticketInfo(rowInfo.original.id);
          }
        },
      };
    };
    return (
      <div className="container-fluid react-transition swipe-right ">
        <Helmet>
          <title>Ticket | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.ticket" />}
        />
        <div className="page-heading MerList">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* SEARCH */}
            <Grid
              container
              spacing={0}
              className="search"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <SearchComponent
                    placeholder="Search by ID, Title, Application, Client Name"
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                    onKeyPress={this.keyPressed}
                    onClickIcon={()=>this.setState({ search : "" })}
                  />
                </Grid>
                <NewButton
                  style={{ marginLeft: "10px" }}
                  onClick={this.fetchApi}
                >
                  Search
                </NewButton>
              </Grid>
              <Grid
                container
                spacing={0}
                className="TransactionSearch"
                style={{ marginTop: 5 }}
              >
                <Grid item xs={2}>
                  <FormControl style={{ width: "100%", marginTop: "20px" }}>
                    <InputLabel>Status</InputLabel>
                    <Select onChange={this.handleStatus} value={statusValue}>
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="backlog">Backlog</MenuItem>
                      <MenuItem value="inprogress">In Progress</MenuItem>
                      <MenuItem value="waiting">Waiting</MenuItem>
                      <MenuItem value="complete">Complete</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {CheckPermissions("add-new-merchant") && (
              <NewButton
                onClick={this.addTicket}
                blue
                style={{ minWidth: "160px" }}
              >
                New Ticket
              </NewButton>
            )}
          </div>

          <div>
            <ResetButton
              style={{ marginTop: "10px" }}
              onClick={this.handleReset}
            >
              Reset filter
            </ResetButton>
          </div>
          <div className="merchant-list-container">
            <ReactTable
              ref={this.refTable}
              manual
              sortable={false}
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchApi(state)}
              defaultPageSize={20}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
              columns={columns}
              getTdProps={onRowClick}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  apiData: state.fetchApi,
  userList: state.adminUser,
  statusAddTicket: state.addTicket.statusAddTicket,
});
const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  getTicketByID: (ID, path) => {
    dispatch(getTicketByID(ID, path));
  },
  getTicketCommentById: (ID, path) => {
    dispatch(getTicketCommentById(ID, path));
  },
  getTicketLogById: (ID, path) => {
    dispatch(getTicketLogById(ID, path));
  },
  getAllUser: () => {
    dispatch(getAllUser());
  },
  updateStatusAddTicket: (payload) => {
    dispatch({ type: 'UPDATE_STATUS_ADD_TICKET', payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Tiket);
