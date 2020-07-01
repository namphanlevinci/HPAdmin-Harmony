import React, { Component } from "react";
import { connect } from "react-redux";
import { FaTrashRestore } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";

import { VIEW_STAFF } from "../../../../../../actions/merchants/actions";

import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import URL from "../../../../../../url/url";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "react-table/react-table.css";
import "../Detail.css";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      staff: [],
      loading: true,
      dialog: false,
      restoreDialog: false,
    };
  }

  componentDidMount() {
    this.getStaff();
  }

  getStaff = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/staff/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        this.setState({ staff: data, loading: false });
      });
  };

  handleArchive = (ID) => {
    const MerchantID = this.props.MerchantProfile.merchantId;
    axios
      .put(URL + "/staff/archive/" + ID + "?merchantId=" + MerchantID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {});
    this.setState({ loading: true });
    setTimeout(() => {
      this.getStaff();
    }, 1500);
  };

  handleRestore = (ID) => {
    const MerchantID = this.props.MerchantProfile.merchantId;
    axios
      .put(URL + "/staff/restore/" + ID + "?merchantId=" + MerchantID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {});
    this.setState({ loading: true });
    setTimeout(() => {
      this.getStaff();
    }, 1500);
  };

  _SearchMerchants = async (e) => {
    await this.setState({ search: e.target.value });
  };

  render() {
    let e = this.state.staff;
    if (e) {
      if (this.state.search) {
        e = e.filter((e) => {
          if (e !== null) {
            return (
              e.email
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              e.displayName
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              parseInt(e.staffId) === parseInt(this.state.search)
            );
          }
          return null;
        });
      } else {
      }
    }
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (column.id !== "roleName") {
            this.props.history.push("/app/merchants/staff/general");
            this.props.VIEW_STAFF(rowInfo.original);
          } else {
          }
        },
      };
    };

    const columns = [
      {
        Header: "ID",
        accessor: "staffId",
        width: 50,
      },
      {
        Header: "Name",
        id: "fullName",
        width: 150,
        accessor: (d) => (
          <span
            style={{ fontWeight: 500 }}
          >{`${d.firstName} ${d.lastName}`}</span>
        ),
      },
      {
        id: "Display",
        Header: "Display Name",
        width: 150,
        accessor: (d) => (
          <span style={{ fontWeight: 500 }}>{`${d.displayName}`}</span>
        ),
      },
      {
        Header: "Phone",
        accessor: "phone",
        width: 150,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 240,
      },
      {
        Header: "Role",
        accessor: "roleName",
        width: 100,
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: (e) => <span>{e.value === 1 ? "Disabled" : "Active"}</span>,
        width: 100,
      },
      {
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        sortable: false,
        accessor: "roleName",
        Cell: (row) => {
          return (
            <div style={{ textAlign: "center" }}>
              {row.original.isDisabled !== 1 ? (
                <GoTrashcan
                  size={21}
                  onClick={() => [
                    this.setState({
                      extraId: row.original.staffId,
                      dialog: true,
                    }),
                  ]}
                />
              ) : (
                <FaTrashRestore
                  size={20}
                  onClick={() =>
                    this.setState({
                      extraId: row.original.staffId,
                      restoreDialog: true,
                    })
                  }
                />
              )}
            </div>
          );
        },
      },
    ];
    return (
      <div className="content GeneralContent react-transition swipe-up Staff">
        <div className="MerList" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* SEARCH */}
            <div className="search">
              <form>
                {/* <input title="Search" value="" className="button" readOnly /> */}
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._SearchMerchants}
                />
              </form>
            </div>
            <div>
              <Button
                className="btn btn-green"
                style={{ marginRight: "0px" }}
                onClick={() =>
                  this.props.history.push("/app/merchants/profile/staff/add")
                }
              >
                NEW STAFF
              </Button>
            </div>
          </div>
          <div className="MListContainer">
            <ReactTable
              data={e}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
              getTdProps={onRowClick}
            />

            {/* ARCHIVE */}
            <Dialog
              open={this.state.dialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Archive this Staff ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This Staff will not appear on the app. You can restore this
                  Staff by clicking the Restore button.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.setState({ dialog: false, extraId: "" })}
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => [
                    this.handleArchive(this.state.extraId),
                    this.setState({ dialog: false, extraId: "" }),
                  ]}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            {/* RESTORE */}
            <Dialog
              open={this.state.restoreDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Restore this Staff ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This Staff will appear on the app as well as the related
                  lists.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ restoreDialog: false, extraId: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => [
                    this.handleRestore(this.state.extraId),
                    this.setState({ restoreDialog: false, extraId: "" }),
                  ]}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  VIEW_STAFF: (payload) => {
    dispatch(VIEW_STAFF(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Staff);
