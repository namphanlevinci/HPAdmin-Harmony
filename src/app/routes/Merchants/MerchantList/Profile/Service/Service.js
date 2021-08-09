import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getServiceByID,
  viewService,
  archiveServiceById,
  restoreServiceById,
  setPage,
  setSize,
  delService,
} from "@/actions/merchantActions";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactTable from "react-table";
import defaultImage from "../Extra/hpadmin2.png";
import AddService from "./AddService";
import CheckPermissions from "@/util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";
import SearchComponent from "@/util/searchComponent";
import ArchiveSVG from "@/assets/images/archive.svg";
import DelSVG from "@/assets/images/del.svg";
import EditSVG from "@/assets/images/edit.svg";
import RestoreSVG from "@/assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import Pagination from "@/components/Pagination";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: true,
      // Archive & Restore
      dialog: false,
      delDialog: false,
      restoreDialog: false,
      // Service ID
      serviceId: "",
      row: 5,
      page: 1,
    };
    this.refTable = React.createRef();
    this.pagination = React.createRef();
  }

  getService = () => { };

  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    this.props.getServiceByID(ID);
  }

  handleEdit = async (e) => {
    await this.props.viewService(e);
    this.props.history.push("/app/merchants/profile/service/edit");
  };

  changePage = async (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
    await this.props.setPage(pageIndex);
  };

  changePageSize = async (size) => {
    await this.props.setSize(size);
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };

  goBackEdit = () => {
    this.setState({ openEdit: false });
    this.props.history.push("/app/merchants/profile/service");
  };

  handleClickOpenEdit = () => {
    this.setState({ openEdit: !this.state.openEdit });
  };

  handleArchive = (serviceId) => {
    const MerchantId = this.props.MerchantProfile.merchantId;
    this.props.archiveServiceById(serviceId, MerchantId);
    this.setState({ isOpenReject: false });
  };

  handleDel = (serviceId) => {
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.delService(serviceId, merchantId);
  };

  handleRestore = (serviceId) => {
    const MerchantId = this.props.MerchantProfile.merchantId;
    this.props.restoreServiceById(serviceId, MerchantId);
    this.setState({ isOpenReject: false });
  };

  gotoLastPage = () => {
    const { row } = this.state;
    const pageCount = Math.ceil(this.props.service.serviceList.length / row);
    this.pagination.current.changePage(pageCount);
    this.setState({ page: pageCount });
  }

  updatePagination = () => {
    const page = this.pagination.current.state.page;
    const row = this.pagination.current.state.rowSelected;
    console.log({ page , row });
    this.setState({ page, row });
  }

  render() {
    let { serviceList, loading } = this.props.service;
    const { row, page } = this.state;
    console.log({ row, page })
    serviceList = serviceList.slice((page - 1) * row, (page - 1) * row + row);
    const pageCount = Math.ceil(this.props.service.serviceList.length / row);

    if (serviceList) {
      if (this.state.search) {
        serviceList = serviceList.filter((e) => {
          if (e !== null) {
            return (
              e.name
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              e.categoryName
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          }
          return null;
        });
      }
    }

    console.log({ serviceList })

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
        Header: "Service Name",
        accessor: "name",
        width: 230,
        Cell: (e) => <p style={{ fontWeight: 400 }}>{e.value}</p>,
      },
      {
        Header: "Image ",
        id: "Image",
        accessor: "name",
        Cell: (row) => {
          const image =
            row.original.imageUrl !== "" ? row.original.imageUrl : defaultImage;
          return (
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "50px",
                height: "50px",
              }}
            />
          );
        },
      },
      {
        id: "Categories",
        Header: "Categories",
        accessor: "categoryName",
        Cell: (e) => <p>{e.value}</p>,
      },
      {
        id: "duration",
        Header: "Duration",
        accessor: "duration",
        Cell: (e) => <p>{e.value} Min</p>,
      },
      {
        id: "price",
        Header: "Price",
        accessor: "price",
        Cell: (e) => <p>$ {e.value}</p>,
      },
      {
        Header: "Status",
        id: "status",
        accessor: "isDisabled",
        Cell: (e) => (
          <p style={{ fontWeight: 400 }}>
            {e.value === 0 ? "Active" : "Inactive"}
          </p>
        ),
      },
      {
        id: "Actions",
        sortable: false,
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        Cell: (row) => {
          const actionsBtn =
            row.original.isDisabled !== 1 ? (
              <Tooltip title="Archive">
                <img
                  alt=""
                  src={ArchiveSVG}
                  onClick={() => [
                    this.setState({
                      categoryId: row.original.serviceId,
                      dialog: true,
                    }),
                  ]}
                />
              </Tooltip>
            ) : (
                <Tooltip title="Restore">
                  <img
                    alt=""
                    src={RestoreSVG}
                    onClick={() =>
                      this.setState({
                        categoryId: row.original.serviceId,
                        restoreDialog: true,
                      })
                    }
                  />
                </Tooltip>
              );
          return (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {CheckPermissions("active-service") && actionsBtn}

              {CheckPermissions("edit-service") && (
                <span style={{ paddingLeft: "20px" }}>
                  <Tooltip title="Edit">
                    <img
                      alt=""
                      src={EditSVG}
                      onClick={() => this.handleEdit(row.original)}
                    />
                  </Tooltip>
                </span>
              )}
              {CheckPermissions("edit-service") && (
                <span style={{ paddingLeft: "20px" }}>
                  <Tooltip title="Delete">
                    <img
                      alt=""
                      src={DelSVG}
                      onClick={() =>
                        this.setState({
                          delDialog: true,
                          categoryId: row.original.serviceId,
                        })
                      }
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
            <SearchComponent
              type="text"
              className="textBox"
              placeholder="Search.."
              value={this.state.search}
              onChange={(e) => this.setState({ search: e.target.value })}
              onClickIcon={() => this.setState({ search: "" })}
            />
            <div>
              {CheckPermissions("add-new-service") && (
                <AddService
                  reload={this.getService}
                  gotoLastPage={this.gotoLastPage}
                />
              )}
            </div>
          </div>

          <div className="merchant-list-container">
            <ReactTable
              ref={this.refTable}
              data={serviceList}
              columns={columns}
              minRows={5}
              defaultPageSize={200}
              noDataText="NO DATA!"
              loading={loading}
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
                {"Archive this Service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This service will not appear on the app. You can restore this
                  service by clicking the Restore button.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ dialog: false, categoryId: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => [
                    this.handleArchive(this.state.categoryId),
                    this.setState({ dialog: false, categoryId: "" }),
                  ]}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            {/* DELETE */}

            <Dialog open={this.state.delDialog}>
              <DialogTitle id="alert-dialog-title">
                {"Delete this Service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want delete this service ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ delDialog: false, categoryId: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => {
                    this.handleDel(this.state.categoryId);
                    this.setState({ delDialog: false, categoryId: "" });
                  }}
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
                {"Restore this Service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This service will appear on the app as well as the related
                  lists.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ restoreDialog: false, categoryId: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => [
                    this.handleRestore(this.state.categoryId),
                    this.setState({ restoreDialog: false, categoryId: "" }),
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
  service: state.service,
  page: state.updateService.page,
  size: state.updateService.size,
});
const mapDispatchToProps = (dispatch) => ({
  setPage: (payload) => {
    dispatch(setPage(payload));
  },
  setSize: (payload) => {
    dispatch(setSize(payload));
  },
  viewService: (payload) => {
    dispatch(viewService(payload));
  },
  getServiceByID: (MerchantId) => {
    dispatch(getServiceByID(MerchantId));
  },
  archiveServiceById: (serviceId, MerchantID) => {
    dispatch(archiveServiceById(serviceId, MerchantID));
  },
  restoreServiceById: (serviceId, MerchantID) => {
    dispatch(restoreServiceById(serviceId, MerchantID));
  },
  delService: (serviceId, merchantId) => {
    dispatch(delService(serviceId, merchantId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Service);
