import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../url/url";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../util/CustomText";
import { Typography } from "@material-ui/core";
import { fetchApiByPage } from "../../../actions/fetchApiActions";
import {
  getTicketByID,
  getTicketCommentById,
  getTicketLogById,
} from "../../../actions/ticketActions";

import {
  Button,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { debounce } from "lodash";

import NewButton from "../../../components/Button/Search";
import SearchComponent from "../../../util/searchComponent";
import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
import ReactTable from "react-table";
import axios from "axios";
import CheckPermissions from "../../../util/checkPermission";
import moment from "moment";

import "react-table/react-table.css";
import "../Merchants/Merchants.css";
import "../Merchants/PendingList/MerchantReqProfile.css";
import "./Ticket.css";
const URL = config.url.URL;

class Tiket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      statusValue: "all",
      data: "",
      loading: false,
    };
  }
  // componentDidMount = async () => {
  //   // this.props.fetchApiByPage(`ticket?status=all`);
  // };
  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const { search, statusValue } = this.state;
    const url = `ticket/?keySearch=${search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}&status=${statusValue}`;

    this.props.fetchApiByPage(url);
  };
  handleReset = debounce((e) => {
    this.setState({ search: "" });
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

  render() {
    const { statusValue, page } = this.state;
    console.log("apiData", this.props);
    const { data, loading, pageSize, pageCount } = this.props.apiData;
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
        Header: <CustomTableHeader value="Create By" />,
        id: "createBy",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.createdUserName}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Last Update" />,
        id: "lastUpdate",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(row?.modifiedDate).format("MM/DD/YYYY")}
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
            {row?.status}
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
            <div
              className="search"
              style={{ display: "flex", alignItems: "center" }}
            >
              <SearchComponent
                placeholder="Search by Name, Group"
                value={this.state.search}
                onChange={(e) => this.setState({ search: e.target.value })}
                onKeyPress={this.keyPressed}
              />
              <NewButton style={{ marginLeft: "10px" }} onClick={this.fetchApi}>
                Search
              </NewButton>
              <NewButton
                style={{ marginLeft: "10px" }}
                onClick={this.handleReset}
              >
                Reset
              </NewButton>
            </div>
            <div>
              {CheckPermissions("add-new-merchant") && (
                <Button
                  style={{
                    backgroundColor: "#0764B0",
                    color: "white",
                    marginTop: "10px",
                  }}
                  onClick={this.addTicket}
                  className="btn btn-red"
                >
                  New Ticket
                </Button>
              )}
            </div>
          </div>
          <FormControl style={{ width: "20%", marginTop: "20px" }}>
            <InputLabel>Status</InputLabel>
            <Select onChange={this.handleStatus} value={statusValue}>
              <MenuItem value="backlog">Backlog</MenuItem>
              <MenuItem value="waiting">Waiting</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
              <MenuItem value="inprogress">Inprogress</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </FormControl>
          <div className="merchant-list-container">
            <ReactTable
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Tiket);
