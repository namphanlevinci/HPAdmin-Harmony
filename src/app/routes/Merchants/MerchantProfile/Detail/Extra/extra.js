import React, { Component } from "react";
import { connect } from "react-redux";
import {
  VIEW_SERVICE,
  GET_MERCHANT_EXTRA,
  ARCHIVE_MERCHANT_EXTRA,
  RESTORE_MERCHANT_EXTRA,
} from "../../../../../../actions/merchants/actions";
import { config } from "../../../../../../url/url";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../../../../../../actions/notifications/actions";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactTable from "react-table";
import axios from "axios";
import defaultImage from "./hpadmin2.png";
import CheckPermissions from "../../../../../../util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveSVG from "../../../../../../assets/images/archive.svg";
import EditSVG from "../../../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../../../assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import EditExtra from "./edit-extra";

import "react-table/react-table.css";

const upFile = config.url.upFile;
class ExtraTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: false,
      // Archive & Restore
      dialog: false,
      restoreDialog: false,
      // Service ID
      serviceId: "",
      edit: false,
      // Extra
      duration: "",
      price: "",
      tax: 1,
      discount: 1,
      isDisabled: "",
      name: "",
      quantity: 0,
      extraId: "",
      imageUrl: "",
      fileId: "",
      // image
      imagePreviewUrl: null,
    };
  }

  handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFile, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    this.props.GET_MERCHANT_EXTRA(ID);
  }

  handleClose = (name, value) => {
    this.setState({ [name]: value });
  };
  handleEdit = (data) => {
    const {
      duration,
      extraId,
      isDisabled,
      name,
      price,
      quantity,
      description,
      imageUrl,
      fileId,
      supplyFee,
    } = data;
    this.setState({
      duration,
      extraId,
      isDisabled,
      name,
      price,
      quantity,
      description,
      imageUrl,
      fileId,
      supplyFee,
      edit: true,
    });
  };

  handleArchive = (extraId) => {
    const ID = this.props.MerchantProfile.merchantId;
    const payload = { ID, extraId };
    this.props.ARCHIVE_MERCHANT_EXTRA(payload);
  };

  handleRestore = (extraId) => {
    const ID = this.props.MerchantProfile.merchantId;
    const payload = { ID, extraId };
    this.props.RESTORE_MERCHANT_EXTRA(payload);
  };

  render() {
    // Search
    let extraList = this.props.ExtraData;
    if (extraList) {
      if (this.state.search) {
        extraList = extraList.filter((e) => {
          if (e !== null) {
            return (
              e.name
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
        Header: " Extra name",
        accessor: "name",
        Cell: (e) => (
          <div>
            <p style={{ fontWeight: 400 }}> {e.value} </p>
          </div>
        ),
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
        id: "duration",
        Header: "Duration",
        accessor: "duration",
        Cell: (e) => (
          <div>
            <p>{e.value} Min</p>
          </div>
        ),
      },
      {
        id: "price",
        Header: "Price",
        accessor: "price",
        Cell: (e) => (
          <div>
            <p>$ {e.value}</p>
          </div>
        ),
      },
      {
        Header: "Status",
        id: "status",
        accessor: "isDisabled",
        Cell: (e) => (
          <div>
            <p>{e.value === 0 ? "Active" : "Inactive"}</p>
          </div>
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
                      extraId: row.original.extraId,
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
                      extraId: row.original.extraId,
                      restoreDialog: true,
                    })
                  }
                />
              </Tooltip>
            );
          return (
            <div style={{ textAlign: "center" }}>
              {CheckPermissions("active-extra") && actionsBtn}

              {CheckPermissions("edit-extra") && (
                <span style={{ paddingLeft: "20px" }}>
                  <Tooltip title="Edit">
                    <img
                      alt=""
                      src={EditSVG}
                      onClick={() => [
                        this.handleEdit(row.original),
                        this.setState({ edit: true }),
                      ]}
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
            <div className="search">
              <form>
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
              </form>
            </div>
            <div></div>
          </div>
          <EditExtra
            getExtra={this.props.GET_MERCHANT_EXTRA}
            edit={this.state.edit}
            data={this.state}
            handleClose={this.handleClose}
            handleImageChange={this.handleImageChange}
            token={this.props.userLogin.token}
            merchantId={this.props.MerchantProfile.merchantId}
            SuccessNotify={this.props.SuccessNotify}
            FailureNotify={this.props.FailureNotify}
          />
          <div className="merchant-list-container">
            <ReactTable
              data={extraList}
              columns={columns}
              defaultPageSize={5}
              minRows={1}
              noDataText="NO DATA!"
              // loading={this.state.loading}
            />

            {/* ARCHIVE */}
            <Dialog open={this.state.dialog}>
              <DialogTitle>{"Archive this Extra?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This extra will not appear on the app. You can restore this
                  extra by clicking the Restore button.
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
              <DialogTitle>{"Restore this Extra?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This extra will appear on the app as well as the related
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
  userLogin: state.userReducer.User,
  ExtraData: state.MerchantReducer.ExtraData,
});
const mapDispatchToProps = (dispatch) => ({
  VIEW_SERVICE: (payload) => {
    dispatch(VIEW_SERVICE(payload));
  },
  GET_MERCHANT_EXTRA: (ID) => {
    dispatch(GET_MERCHANT_EXTRA(ID));
  },
  ARCHIVE_MERCHANT_EXTRA: (payload) => {
    dispatch(ARCHIVE_MERCHANT_EXTRA(payload));
  },
  RESTORE_MERCHANT_EXTRA: (payload) => {
    dispatch(RESTORE_MERCHANT_EXTRA(payload));
  },
  SuccessNotify: (payload) => {
    dispatch(SUCCESS_NOTIFICATION(payload));
  },
  FailureNotify: (payload) => {
    dispatch(FAILURE_NOTIFICATION(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ExtraTab);
