import React, { Component } from "react";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import {
  getAll_User,
  ViewProfile_User,
} from "../../../../actions/user/actions";
import { connect } from "react-redux";

import URL from "../../../../url/url";
import BounceLoader from "react-spinners/BounceLoader";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ProgressLoading from "../../../../util/progress";
import axios from "axios";

import "../../Merchants/MerchantsList/merchantsList.css";
import "./User.css";
import "react-table/react-table.css";
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

    this.props.getAll_User();
  }
  _SearchUsers = async (e) => {
    await this.setState({ search: e.target.value });
  };

  _userProfile = async (e) => {
    this.setState({ loading: true });
    const ID = e?.waUserId;
    const config = {
      headers: { Authorization: "bearer " + this.state.User.token },
    };

    await axios
      .get(URL + "/adminuser/" + ID, config)
      .then((res) => {
        this.props.ViewProfile_User(res.data.data);

        this.props.history.push("/app/accounts/admin/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addAdmin = () => {
    this.props.history.push("/app/accounts/admin/add");
  };
  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "waUserId",
        width: 50,
      },
      // {
      //   Header: "Status",
      //   accessor: "nope",
      //   width: 100,
      //   Cell: (e) => <span>Online</span>,
      // },
      {
        id: "Name",
        Header: "Full name",
        width: 200,
        accessor: (row) => `${row.firstName} ${row.lastName}`,
        Cell: (e) => <p>{e.value}</p>,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300,
      },
      {
        Header: "Phone number",
        accessor: "phone",
      },
      {
        id: "Role",
        Header: "Role",
        accessor: "roleName",
      },
    ];

    let UserList = this.props.UserList;
    if (UserList) {
      if (this.state.search) {
        UserList = UserList.filter((e) => {
          return (
            e.firstName
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            e.email
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            parseInt(e.merchantId) === parseInt(this.state.search)
          );
        });
      } else {
      }
    }
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          this._userProfile(rowInfo.original);
        },
      };
    };

    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUsers" />}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div className="UserSearchBox">
            {/* SEARCH */}
            <div className="search">
              <form>
                <SearchIcon className="button" title="Search" />
                <input
                  type="text"
                  className="textbox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._SearchUsers}
                />
              </form>
            </div>
            <Button className="btn btn-green" onClick={this.addAdmin}>
              ADD NEW USER
            </Button>
          </div>

          <div className="MListContainer">
            {this.state.loading && (
              <div className="spinning">
                <ProgressLoading loading={this.state.loading} size={50} />
              </div>
            )}

            <ReactTable
              data={UserList}
              columns={columns}
              defaultPageSize={10}
              minRows={0}
              getTdProps={onRowClick}
              noDataText="NO DATA!"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UserList: state.getAllUser,
});
const mapDispatchToProps = (dispatch) => ({
  getAll_User: () => {
    dispatch(getAll_User());
  },
  ViewProfile_User: (payload) => {
    dispatch(ViewProfile_User(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);

const styles = {
  spinner: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
