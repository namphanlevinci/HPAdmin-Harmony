import React, { Component } from "react";
import { getUserByID } from "../../../../actions/userActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { Button, Typography } from "@material-ui/core";
import { debounce } from "lodash";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import CheckPermissions from "../../../../util/checkPermission";
import SearchComponent from "../../../../util/searchComponent";
import NewButton from "../../../../components/Button/Search";

import "../../Merchants/Merchants.css";
import "./User.css";
import "react-table/react-table.css";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
      statusValue: -1,
    };
  }

  searchUser = debounce((query) => {
    this.fetchApi();
  }, 1000);

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };
  handleReset = debounce((e) => {
    this.setState({ statusValue: -1, search: "" });
    this.fetchApi();
  }, 1000);
  handleStatus = debounce((e) => {
    this.setState({ statusValue: e.target.value });
    this.fetchApi();
  }, 1000);

  goToUserProfile = async (e) => {
    const ID = e?.waUserId;
    const path = "/app/accounts/admin/profile";
    await this.props.getUserByID(ID, path);
  };

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;
    const { statusValue, search } = this.state;

    const url = `adminuser?key=${search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}&isDisabled=${statusValue}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };
  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchApi();
    }
  };

  addAdmin = () => {
    this.props.history.push("/app/accounts/admin/add");
  };
  render() {
    const { page, statusValue } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const columns = [
      {
        Header: <CustomTableHeader value="ID" />,
        id: "id",
        accessor: (row) => (
          <div className="tr">
            <Typography
              variant="subtitle1"
              className="table__light"
            >{`${row.waUserId}`}</Typography>
          </div>
        ),
        width: 70,
      },
      {
        id: "image",
        Header: "",
        accessor: (row) => (
          <div style={{ textAlign: "center" }}>
            <img src={`${row.imageUrl}`} alt="Avatar" className="avatar" />
          </div>
        ),
        width: 100,
      },
      {
        id: "Name",
        Header: <CustomTableHeader value="Full name" />,
        accessor: (row) => (
          <div className="tr">
            <Typography
              variant="subtitle1"
              className="table__light"
            >{`${row.firstName} ${row.lastName}`}</Typography>
          </div>
        ),
      },
      {
        id: "email",
        Header: <CustomTableHeader value="Email" />,
        accessor: (row) => (
          <div className="tr">
            <Typography
              variant="subtitle1"
              className="table__light"
            >{`${row.email}`}</Typography>
          </div>
        ),
      },
      {
        id: "phoneNumber",
        Header: <CustomTableHeader value="Phone number" />,
        accessor: (row) => (
          <div className="tr">
            <Typography
              variant="subtitle1"
              className="table__light"
            >{`${row.phone}`}</Typography>
          </div>
        ),
      },
      {
        id: "Role",
        Header: <CustomTableHeader value="Role" />,
        accessor: (row) => (
          <div className="tr">
            <Typography
              variant="subtitle1"
              className="table__light"
            >{`${row.roleName}`}</Typography>
          </div>
        ),
      },
      {
        Header: (
          <div style={{ textAlign: "center" }}>
            <CustomTableHeader value="Status" />
          </div>
        ),
        accessor: "isDisabled",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <Typography variant="subtitle1">
              {e.value === 0 ? "Active" : "Inactive"}
            </Typography>
          </div>
        ),
        width: 100,
      },
    ];

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          this.goToUserProfile(rowInfo.original);
        },
      };
    };

    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Admin User | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUsers" />}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div className="UserSearchBox">
            <div
              className="search"
              style={{ display: "flex", alignItems: "center" }}
            >
              <SearchComponent
                placeholder="Search by Name, Group"
                value={this.state.search}
                onChange={this.handleChange}
                onKeyPress={this.keyPressed}
                onClickIcon={this.fetchApi}
              />
              <NewButton onClick={this.fetchApi} style={{ marginLeft: "10px" }}>
                Search
              </NewButton>
            </div>
            <FormControl style={{ width: "20%", marginLeft: "15px" }}>
              <InputLabel>Status</InputLabel>
              <Select onChange={this.handleStatus} value={statusValue}>
                <MenuItem value={-1}>All</MenuItem>
                <MenuItem value={0}>Active</MenuItem>
                <MenuItem value={1}>Inactive</MenuItem>
              </Select>
            </FormControl>
            {CheckPermissions("add-new-user") && (
              <Button
                className="btn btn-green"
                onClick={this.addAdmin}
                style={{ margin: "0px" }}
              >
                ADD NEW USER
              </Button>
            )}
          </div>
          <NewButton style={{ marginTop: "10px" }} onClick={this.handleReset}>
            Reset
          </NewButton>
          <div className="merchant-list-container user_table">
            <ReactTable
              manual
              sortable={false}
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchApi(state)}
              defaultPageSize={10}
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
  getUserByID: (ID, path) => {
    dispatch(getUserByID(ID, path));
  },
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
