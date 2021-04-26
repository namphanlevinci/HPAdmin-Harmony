import React, { Component } from "react";
import { getUserByID } from "../../../../actions/userActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import {  Typography } from "@material-ui/core";
import { debounce } from "lodash";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@material-ui/core";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import CheckPermissions from "../../../../util/checkPermission";
import SearchComponent from "../../../../util/searchComponent";
import NewButton from "../../../../components/Button/Search";
import { reloadUrl } from '../../../../util/reload';

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
    this.refTable = React.createRef();
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

    const url = `adminuser?key=${search}&page=${page === 0 ? 1 : page + 1
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

  resetFirstPage = () => {
    this.changePage(0);
    if (this.refTable && this.refTable.current)
      this.refTable.current.onPageChange(0);
    const els = document.getElementsByClassName('-pageJump');
    const inputs = els[0].getElementsByTagName('input');
    inputs[0].value = 1;
    reloadUrl('app/accounts/admin');
  }

  componentDidMount() {
    const { statusAddUser } = this.props;
    if (statusAddUser == true) {
      this.props.updateStatusAddUser(false);
      this.resetFirstPage();
    }
  }

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
        <div className="MerList page-heading" style={{ padding: "22px 26px" }}>
          <div className="UserSearchBox">
            <Grid
              container
              spacing={0}
              className="search"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <SearchComponent
                    placeholder="Search by Name, Group"
                    value={this.state.search}
                    onChange={this.handleChange}
                    onKeyPress={this.keyPressed}
                    onClickIcon={this.fetchApi}
                  />
                </Grid>
                <NewButton
                  onClick={this.fetchApi}
                  style={{ marginLeft: "10px" }}
                >
                  Search
                </NewButton>
              </Grid>
              <Grid
                container
                spacing={0}
                className="TransactionSearch"
                style={{ marginTop: 20 }}
              >
                <Grid item xs={2}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel>Status</InputLabel>
                    <Select onChange={this.handleStatus} value={statusValue}>
                      <MenuItem value={-1}>All</MenuItem>
                      <MenuItem value={0}>Active</MenuItem>
                      <MenuItem value={1}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {CheckPermissions("add-new-user") && (
              <NewButton
                onClick={this.addAdmin}
                style={{ margin: "0px", minWidth: 160, padding: 10 }}
                blue
              >
                Add new user
              </NewButton>
            )}
          </div>
          <ResetButton style={{ marginTop: "10px" }} onClick={this.handleReset}>
            Reset filter
          </ResetButton>
          <div className="merchant-list-container user_table">
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
  statusAddUser: state.addUser.statusAddUser
});
const mapDispatchToProps = (dispatch) => ({
  getUserByID: (ID, path) => {
    dispatch(getUserByID(ID, path));
  },
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  updateStatusAddUser: (payload) => {
    dispatch({ type: 'UPDATE_STATUS_ADD_USER', payload });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
