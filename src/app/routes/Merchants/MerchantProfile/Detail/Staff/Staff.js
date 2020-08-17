import React, { Component } from "react";
import { connect } from "react-redux";
import { VIEW_STAFF } from "../../../../../../actions/merchants/actions";
import { config } from "../../../../../../url/url";

import ArchiveSVG from "../../../../../../assets/images/archive.svg";
import EditSVG from "../../../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../../../assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import formatPhone from "../../../../../../util/formatPhone";
import ScaleLoader from "../../../../../../util/scaleLoader";
import CheckPermissions from "../../../../../../util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";

import "react-table/react-table.css";
import "../Detail.css";

const URL = config.url.URL;

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      staff: [],
      loading: true,
      dialog: false,
      restoreDialog: false,
      goToList: false,
      isLoading: false,
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

  viewStaff = async (data) => {
    this.setState({ isLoading: true });
    await this.props.VIEW_STAFF(data);
    this.props.history.push("/app/merchants/staff/general");
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

    const columns = [
      {
        Header: "",
        id: "none",
        accessor: "none",
        Cell: (row) => {
          row.styles["paddingLeft"] = "0px";
          return <DragIndicatorOutlinedIcon />;
        },
        width: 40,
      },
      {
        Header: "Staff ID",
        id: "staffId",
        accessor: (d) => <p style={{ fontWeight: 500 }}>{`${d.staffId}`}</p>,
        width: 80,
      },
      {
        Header: "Name",
        id: "fullName",
        accessor: (d) => (
          <p style={{ fontWeight: 500 }}>{`${d.firstName} ${d.lastName}`}</p>
        ),
      },
      {
        id: "Display",
        Header: "Display Name",
        accessor: (d) => (
          <p style={{ fontWeight: 500 }}>{`${d.displayName}`}</p>
        ),
      },
      {
        Header: "Phone",
        id: "Phone",
        accessor: (row) => <p>{formatPhone(row?.phone)}</p>,
      },
      {
        Header: "Email",
        id: "email",
        accessor: (row) => <p>{formatPhone(row?.email)}</p>,
        width: 230,
      },
      {
        Header: "Role",
        id: "roleName",
        accessor: (row) => (
          <p style={{ fontWeight: 500 }}>{formatPhone(row?.roleName)}</p>
        ),
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: (e) => (
          <p style={{ fontWeight: 500 }}>
            {e.value === 1 ? "Inactive" : "Active"}
          </p>
        ),
      },
      {
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        sortable: false,
        accessor: "actions",
        Cell: (row) => {
          const actionsBtn =
            row.original.isDisabled !== 1 ? (
              <Tooltip title="Delete">
                <img
                  src={ArchiveSVG}
                  onClick={() => [
                    this.setState({
                      extraId: row.original.staffId,
                      dialog: true,
                    }),
                  ]}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Restore">
                <img
                  src={RestoreSVG}
                  onClick={() =>
                    this.setState({
                      extraId: row.original.staffId,
                      restoreDialog: true,
                    })
                  }
                />
              </Tooltip>
            );
          return (
            <div style={{ textAlign: "center" }}>
              {CheckPermissions(16) && actionsBtn}

              {CheckPermissions(17) && (
                <span style={{ paddingLeft: "15px" }}>
                  <Tooltip title="Edit">
                    <img
                      src={EditSVG}
                      size={20}
                      style={{ color: "#575757" }}
                      onClick={() => this.viewStaff(row.original)}
                    />
                  </Tooltip>
                </span>
              )}
            </div>
          );
        },
      },
    ];
    return (
      <div className="content general-content react-transition swipe-up Staff">
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
              {CheckPermissions(15) && (
                <Button
                  className="btn btn-green"
                  style={{ marginRight: "0px" }}
                  onClick={() =>
                    this.props.history.push("/app/merchants/profile/staff/add")
                  }
                >
                  NEW STAFF
                </Button>
              )}
            </div>
          </div>
          <ScaleLoader isLoading={this.state.isLoading} />
          <div className="merchant-list-container">
            <ReactTable
              data={e}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
            />

            {/* ARCHIVE */}
            <Dialog open={this.state.dialog}>
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
            <Dialog open={this.state.restoreDialog}>
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
