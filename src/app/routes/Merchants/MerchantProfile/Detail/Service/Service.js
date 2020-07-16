import React, { Component } from "react";
import { connect } from "react-redux";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";
import { FiEdit } from "react-icons/fi";

import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";
import { config } from "../../../../../../url/url";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactTable from "react-table";
import axios from "axios";
import defaultImage from "../Extra/hpadmin2.png";
import AddService from "./add-service";

import "react-table/react-table.css";
const URL = config.url.URL;
class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: true,
      // Archive & Restore
      dialog: false,
      restoreDialog: false,
      // Service ID
      serviceId: "",
    };
  }

  getService = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/service/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        this.setState({ data: res.data.data, loading: false });
      });
  };

  componentDidMount() {
    this.getService();
  }

  handleEdit = async (e) => {
    await this.props.VIEW_SERVICE(e);
    // this.setState({ openEdit: true });
    this.props.history.push("/app/merchants/profile/service/edit");
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };

  // EDIT SERVICE
  goBackEdit = () => {
    this.setState({ openEdit: false });
    this.props.history.push("/app/merchants/profile/service");
  };

  handleClickOpenEdit = () => {
    this.setState({ openEdit: !this.state.openEdit });
  };

  handleArchive = (ID) => {
    axios
      .put(URL + "/service/archive/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {});
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getService();
    }, 1500);
  };

  handleRestore = (ID) => {
    axios
      .put(URL + "/service/restore/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {});
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getService();
    }, 1500);
  };
  render() {
    // Search
    let serviceList = this.state.data;
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

    const columns = [
      {
        Header: "Service Name",
        accessor: "name",
        width: 150,
        Cell: (e) => (
          <div>
            <span style={styles.span}>{e.value}</span>
          </div>
        ),
      },
      {
        Header: "Image ",
        id: "Image",
        width: 150,
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
            ></div>
          );
        },
      },
      {
        id: "Categories",
        Header: "Categories",
        accessor: "categoryName",
        Cell: (e) => (
          <div>
            <span style={styles.span}>{e.value}</span>
          </div>
        ),
        width: 150,
      },
      {
        id: "duration",
        Header: "Duration",
        accessor: "duration",
        Cell: (e) => (
          <div>
            <span style={styles.span}>{e.value} Min</span>
          </div>
        ),
        width: 100,
      },
      {
        id: "price",
        Header: "Price",
        accessor: "price",
        Cell: (e) => (
          <div>
            <span style={styles.span}>$ {e.value}</span>
          </div>
        ),
        width: 150,
      },
      {
        Header: "Status",
        id: "status",
        accessor: "isDisabled",
        Cell: (e) => (
          <span style={styles.span}>
            {e.value === 0 ? "Active" : "Inactive"}
          </span>
        ),
        width: 120,
      },
      {
        id: "Actions",
        sortable: false,
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        Cell: (row) => {
          return (
            <div style={{ textAlign: "center" }}>
              {row.original.isDisabled !== 1 ? (
                <GoTrashcan
                  size={22}
                  onClick={() => [
                    this.setState({
                      categoryId: row.original.serviceId,
                      dialog: true,
                    }),
                  ]}
                />
              ) : (
                <FaTrashRestoreAlt
                  size={20}
                  onClick={() =>
                    this.setState({
                      categoryId: row.original.serviceId,
                      restoreDialog: true,
                    })
                  }
                />
              )}
              <span style={{ paddingLeft: "20px" }}>
                <FiEdit
                  size={20}
                  onClick={() => this.handleEdit(row.original)}
                />
              </span>
            </div>
          );
        },
      },
    ];

    return (
      <div className="content general-content react-transition swipe-up Staff">
        <div className="MerList" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="search">
              <form>
                {/* <SearchIcon className="button" title="Search" /> */}
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
              </form>
            </div>
            <div>
              <AddService reload={this.getService} />
            </div>
          </div>

          <div className="merchant-list-container">
            <ReactTable
              data={serviceList}
              columns={columns}
              defaultPageSize={5}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
            />

            {/* ARCHIVE */}
            <Dialog open={this.state.dialog}>
              <DialogTitle id="alert-dialog-title">
                {"Archive this service ?"}
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
            {/* RESTORE */}
            <Dialog open={this.state.restoreDialog}>
              <DialogTitle id="alert-dialog-title">
                {"Restore this service ?"}
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
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  VIEW_SERVICE: (payload) => {
    dispatch(VIEW_SERVICE(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Service);

const styles = {
  span: {
    fontWeight: "400",
    color: "black",
  },
};
