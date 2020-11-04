import React, { Component } from "react";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import {
  GET_USER_REQUEST,
  VIEW_PROFILE_USER,
} from "../../../../actions/user/actions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { config } from "../../../../url/url";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { Button, Typography } from "@material-ui/core";

import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
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
  componentDidMount() {
    const User = localStorage.getItem("User_login");
    this.setState({ User: JSON.parse(User) });
  }
  _SearchUsers = async (e) => {
    await this.setState({ search: e.target.value });
  };

  _userProfile = async (e) => {
    this.setState({ loading: true });
    const ID = e?.waUserId;

    await axios
      .get(URL + "/adminuser/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        this.props.VIEW_PROFILE_USER(res.data.data);

        this.props.history.push("/app/accounts/admin/profile");
      })
      .catch((err) => {
        console.log(err);
      });
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
          this._userProfile(rowInfo.original);
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
                  onChange={this._SearchUsers}
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
  GET_USER_REQUEST: () => {
    dispatch(GET_USER_REQUEST());
  },
  VIEW_PROFILE_USER: (payload) => {
    dispatch(VIEW_PROFILE_USER(payload));
  },

  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
