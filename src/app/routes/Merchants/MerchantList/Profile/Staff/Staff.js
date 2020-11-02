import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import {
  archiveStaffById,
  restoreStaffById,
  getStaff,
  getStaffByID,
} from "../../../../../../actions/merchantActions";
import ArchiveSVG from "../../../../../../assets/images/archive.svg";
import EditSVG from "../../../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../../../assets/images/restore.svg";

import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import ReactTable from "react-table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ScaleLoader from "../../../../../../util/scaleLoader";
import CheckPermissions from "../../../../../../util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";

import CustomProgress from "../../../../../../util/CustomProgress";

import "../Detail.css";
import "react-table/react-table.css";

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
    this.props.getStaff(this.props.MerchantProfile.merchantId);
  }

  handleArchive = (ID) => {
    const MerchantID = this.props.MerchantProfile.merchantId;
    this.props.archiveStaffById(ID, MerchantID);
  };

  handleRestore = (ID) => {
    const MerchantID = this.props.MerchantProfile.merchantId;
    this.props.restoreStaffById(ID, MerchantID);
  };

  searchMerchant = async (e) => {
    await this.setState({ search: e.target.value });
  };

  viewStaff = async (data) => {
    const StaffId = data?.staffId;
    const MerchantId = this.props.MerchantProfile.merchantId;
    const path = "/app/merchants/staff/general";

    await this.props.getStaffByID(StaffId, MerchantId, path);
  };

  render() {
    let { loading, data } = this.props.staff;
    const { loading: loadingArchive } = this.props.archiveStaff;
    const { loading: loadingRestore } = this.props.restoreStaff;
    const { loading: loadingStaff } = this.props.staffById;
    if (data) {
      if (this.state.search) {
        data = data.filter((e) => {
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
      console.log("rowInfo", rowInfo);

      // console.log("bruh", rowInfo?.row?.actions);
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            const StaffId = rowInfo?.original?.staffId;

            const MerchantID = this.props.MerchantProfile.merchantId;
            const path = "/app/merchants/staff/general";

            this.setState({ isLoading: true });
            this.props.getStaffByID(StaffId, MerchantID, path);
          }
        },
      };
    };

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
        accessor: (d) => (
          <Typography variant="subtitle1" className="table__light">
            {`${d.staffId}`}
          </Typography>
        ),
        width: 80,
      },
      {
        Header: "Name",
        id: "fullName",
        accessor: (d) => (
          <Typography variant="subtitle1">
            {`${d.firstName} ${d.lastName}`}
          </Typography>
        ),
      },
      {
        id: "Display",
        Header: "Display Name",
        accessor: (d) => (
          <Typography variant="subtitle1" className="table__light">
            {`${d.displayName}`}
          </Typography>
        ),
      },
      {
        Header: "Phone",
        id: "Phone",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.phone}
          </Typography>
        ),
      },
      {
        Header: "Email",
        id: "email",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.email}
          </Typography>
        ),
        width: 220,
      },
      {
        Header: "Role",
        id: "roleName",
        accessor: (row) => (
          <Typography variant="subtitle1">{row?.roleName}</Typography>
        ),
        width: 80,
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: (e) => (
          <Typography variant="subtitle1">
            {e.value === 1 ? "Inactive" : "Active"}
          </Typography>
        ),
        width: 80,
      },
      {
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        sortable: false,
        accessor: "actions",
        Cell: (row) => {
          const actionsBtn =
            row.original.isDisabled !== 1 ? (
              <Tooltip title="Archive">
                <img
                  alt="archive"
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
                  alt="restore"
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
              {CheckPermissions("active-staff") && actionsBtn}

              {CheckPermissions("edit-staff") && (
                <span style={{ paddingLeft: "15px" }}>
                  <Tooltip title="Edit">
                    <img
                      alt="edit"
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
        {loadingArchive && <CustomProgress />}
        {loadingRestore && <CustomProgress />}
        <div className="MerList" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="search">
              <form>
                {/* <input title="Search" value="" className="button" readOnly /> */}
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this.searchMerchant}
                />
              </form>
            </div>
            <div>
              {CheckPermissions("add-new-staff") && (
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
          <ScaleLoader isLoading={loadingStaff} />
          <div className="merchant-list-container">
            <ReactTable
              data={data}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
              getTdProps={onRowClick}
            />

            {/* ARCHIVE */}
            <Dialog open={this.state.dialog}>
              <DialogTitle id="alert-dialog-title">
                {"Archive this Staff?"}
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
                {"Restore this Staff?"}
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
  MerchantProfile: state.MerchantReducer.MerchantData,
  staff: state.staff,
  restoreStaff: state.restoreStaff,
  archiveStaff: state.archiveStaff,
  staffById: state.staffById,
});

const mapDispatchToProps = (dispatch) => ({
  archiveStaffById: (ID, MerchantID) => {
    dispatch(archiveStaffById(ID, MerchantID));
  },
  restoreStaffById: (ID, MerchantID) => {
    dispatch(restoreStaffById(ID, MerchantID));
  },
  getStaff: (MerchantID) => {
    dispatch(getStaff(MerchantID));
  },
  getStaffByID: (StaffID, MerchantId, path) => {
    dispatch(getStaffByID(StaffID, MerchantId, path));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Staff);
