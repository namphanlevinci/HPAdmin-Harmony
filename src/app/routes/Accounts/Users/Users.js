import React, { Component } from "react";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import {
  getAll_User,
  ViewProfile_User,
} from "../../../../actions/user/actions";
import { connect } from "react-redux";
import { store } from "react-notifications-component";

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

    // this.props.getAll_User();
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
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {
        this.props.ViewProfile_User(res.data.data);

        this.props.history.push("/app/accounts/admin/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchData = async (state) => {
    const { page, pageSize } = state;
    this.setState({ loading: true });
    await axios
      .get(
        URL + `/adminuser/?page=${page === 0 ? 1 : page + 1}&row=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        this.setState({
          page,
          pageCount: res.data.pages,
          data: data,
          loading: false,
          pageSize: 5,
        });
      });
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };
  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      axios
        .get(URL + `/adminuser/search?key=${this.state.search}&page=1`, {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
          },
        })
        .then((res) => {
          const data = res.data.data;
          if (!data) {
            store.addNotification({
              title: "ERROR!",
              message: "That User doesn't exist.",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
              },
              width: 250,
            });
            this.setState({ loading: false });
          } else {
            this.setState({
              page: "0 ",
              pageCount: res.data.pages,
              data: data,
              loading: false,
            });
          }
        });
    }
  };

  addAdmin = () => {
    this.props.history.push("/app/accounts/admin/add");
  };
  render() {
    const { page, pageCount, data, pageSize } = this.state;

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
            <ReactTable
              manual
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              // You should also control this...
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchData(state)}
              defaultPageSize={20}
              minRows={0}
              noDataText="NO DATA!"
              loading={this.state.loading}
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
  InfoUser_Login: state.User,
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
