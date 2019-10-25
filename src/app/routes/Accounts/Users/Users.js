import React, { Component } from "react";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import {
  getAll_User,
  ViewProfile_User
} from "../../../../actions/user/actions";
import { connect } from "react-redux";
import "../../Merchants/MerchantsList/merchantsList.css";
import "./User.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  componentDidMount() {
    this.props.getAll_User();
  }
  _SearchUsers = async e => {
    await this.setState({ search: e.target.value });
  };
  _userProfile = e => {
    this.props.ViewProfile_User(e);
    this.props.history.push("/app/accounts/admin-user-profile");
  };
  addAdmin = () => {
    this.props.history.push("/app/accounts/add-admin-user");
  };
  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "waUserId",
        width: 50
      },
      {
        Header: "Status",
        accessor: "nope",
        width: 100,
        Cell: e => <span>Online</span>
      },
      {
        id: "Name",
        Header: "Full name",
        width: 200,
        accessor: row => `${row.firstName} ${row.lastName}`,
        Cell: e => <p>{e.value}</p>
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300
      },
      {
        Header: "Phone number",
        accessor: "phone"
      },
      {
        id: "Role",
        Header: "Role",
        accessor: "roleName"
      }
    ];

    let UserList = this.props.UserList;
    // console.log(UserList);
    if (UserList) {
      if (this.state.search) {
        UserList = UserList.filter(e => {
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
        onClick: e => {
          this._userProfile(rowInfo.original);
        }
      };
    };

    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUsers" />}
        />
        <div className="MerList" style={{ padding: "10px" }}>
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
            <Button className="addAdmin" onClick={this.addAdmin}>
              ADD NEW USER
            </Button>
          </div>

          <div className="MListContainer">
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

const mapStateToProps = state => ({
  UserList: state.getAllUser
});
const mapDispatchToProps = dispatch => ({
  getAll_User: () => {
    dispatch(getAll_User());
  },
  ViewProfile_User: payload => {
    dispatch(ViewProfile_User(payload));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
