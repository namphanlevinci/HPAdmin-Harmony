import React, { Component } from "react";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import {
  GET_USER_REQUEST,
  VIEW_PROFILE_USER,
} from "../../../../actions/user/actions";
import { connect } from "react-redux";
import { store } from "react-notifications-component";

import URL from "../../../../url/url";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
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

    // this.props.GET_USER_REQUEST();
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
        this.props.VIEW_PROFILE_USER(res.data.data);

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
        console.log("USER ADMIN", data);
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
        .get(URL + `/adminuser?key=${this.state.search}&page=1`, {
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
        id: "id",
        accessor: (row) => <div style={styles.text}>{`${row.waUserId}`}</div>,
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
        accessor: (row) => (
          <div>
            <img src={`${row.imageUrl}`} alt="Avatar" class="avatar" />
            {`${row.firstName} ${row.lastName}`}
          </div>
        ),
      },
      {
        id: "email",
        Header: "Email",
        accessor: (row) => <div className="tr">{`${row.email}`}</div>,
        width: 300,
      },
      {
        id: "phoneNumber",
        Header: "Phone number",
        accessor: (row) => <div className="tr">{`${row.phone}`}</div>,
      },
      {
        id: "Role",
        Header: "Role",
        accessor: (row) => <div className="tr">{`${row.roleName}`}</div>,
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
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._SearchUsers}
                  onKeyPress={this.keyPressed}
                />
              </form>
            </div>
            <Button className="btn btn-green" onClick={this.addAdmin}>
              ADD NEW USER
            </Button>
          </div>

          <div className="MListContainer user-table">
            <ReactTable
              manual
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchData(state)}
              defaultPageSize={10}
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
  GET_USER_REQUEST: () => {
    dispatch(GET_USER_REQUEST());
  },
  VIEW_PROFILE_USER: (payload) => {
    dispatch(VIEW_PROFILE_USER(payload));
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
  text: {
    marginTop: "37%",
  },
};
