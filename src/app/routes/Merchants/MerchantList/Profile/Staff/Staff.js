import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import {
  archiveStaffById,
  restoreStaffById,
  getStaff,
  getStaffByID,
} from "@/actions/merchantActions";

import SearchComponent from "@/util/searchComponent";
import ReactTable from "react-table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ScaleLoader from "@/util/scaleLoader";
import CheckPermissions from "@/util/checkPermission";

import CustomProgress from "@/util/CustomProgress";
import Pagination from "@/components/Pagination";
import columns from "./columns";

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
      page: 1,
      row: 5,
    };
    this.refTable = React.createRef();
    this.pagination = React.createRef();
  }

  componentDidMount() {
    const { statusAddStaff } = this.props.staff;
    const { MerchantProfile: { merchantId } } = this.props
    if (statusAddStaff == true) {
      this.props.updateStatusAddStaff(false);
      this.gotoLastPage();
    } else {
      this.props.getStaff(merchantId);
    }
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

  gotoLastPage = () => {
    const { row } = this.state;
    const pageCount = Math.ceil(this.props.staff.data.length / row);
    this.pagination.current.changePage(pageCount);
    this.setState({ page: pageCount });
  }

  updatePagination = () => {
    const page = this.pagination.current.state.page;
    const row = this.pagination.current.state.rowSelected;
    this.setState({ page, row });
  }


  onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        e.stopPropagation();
        if (rowInfo && column.id !== "actions") {
          this.viewStaff(rowInfo.original)
        }
      },
    };
  };


  render() {
    let { loading, data } = this.props.staff;
    const { loading: loadingArchive } = this.props.archiveStaff;
    const { loading: loadingRestore } = this.props.restoreStaff;
    const { loading: loadingStaff } = this.props.staffById;

    const { row, page } = this.state;
    data = data?.slice((page - 1) * row, (page - 1) * row + row) || [];
    const pageCount = this.props.staff.data && this.props.staff.data.length ? Math.ceil(this.props.staff.data.length / row) : 1;

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

    return (
      <div className="content general-content react-transition swipe-up Staff">
        {loadingArchive && <CustomProgress />}
        {loadingRestore && <CustomProgress />}
        <div className="MerList" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <SearchComponent
              className="textBox"
              placeholder="Search.."
              value={this.state.search}
              onChange={this.searchMerchant}
              onClickIcon={() => this.setState({ search: "" })}
            />

            <div>
              {
                CheckPermissions("add-new-staff") && (
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
              ref={this.refTable}
              data={data}
              columns={columns(this.viewStaff, (staffId) => this.setState({
                extraId: staffId,
                restoreDialog: true,
              }))}
              minRows={1}
              defaultPageSize={200}
              noDataText="NO DATA!"
              loading={loading}
              getTdProps={this.onRowClick}
              PaginationComponent={() => <div />}
            />

            <Pagination
              ref={this.pagination}
              fetchApi={this.updatePagination}
              pageCount={pageCount}
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
  MerchantProfile: state.merchant.merchant,
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
  updateStatusAddStaff: (payload) => {
    dispatch({ type: 'UPDATE_STATUS_ADD_STAFF', payload });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Staff);
