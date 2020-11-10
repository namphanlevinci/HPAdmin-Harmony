import React, { Component } from "react";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";

import { getUserByID } from "../../../../actions/userActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { config } from "../../../../url/url";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { Button, Typography } from "@material-ui/core";

import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import CheckPermissions from "../../../../util/checkPermission";

import "../../Merchants/Merchants.css";
import "./User.css";
import "react-table/react-table.css";

const URL = config.url.URL;
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
    };
  }

  searchUser = async (e) => {
    await this.setState({ search: e.target.value });
  };

  goToUserProfile = async (e) => {
    const ID = e?.waUserId;
    const path = "/app/accounts/admin/profile";
    await this.props.getUserByID(ID, path);
  };

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;

    const url = `${URL}/adminuser?key=${this.state.search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;

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
    const { page } = this.state;
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
            <div className="search">
              <form>
                <SearchIcon className="button" title="Search" />
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this.searchUser}
                  onKeyPress={this.keyPressed}
                />
              </form>
            </div>

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

          <div className="merchant-list-container user_table">
            <ReactTable
              manual
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
  userLogin: state.userReducer.User,
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
