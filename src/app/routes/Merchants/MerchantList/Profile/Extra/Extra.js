import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getExtraByID,
  archiveExtraById,
  restoreExtraById,
  updateMerchantExtraById,
  setPageExtra,
  setSizeExtra,
  exportExtra,
  importExtra,
  delExtra,
} from "../../../../../../actions/merchantActions";
import { WARNING_NOTIFICATION } from "../../../../../../constants/notificationConstants";
import { config } from "../../../../../../url/url";

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
import DelSVG from "../../../../../../assets/images/del.svg";
import EditSVG from "../../../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../../../assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import EditExtra from "./EditExtra";
import SearchComponent from "../../../../../../util/searchComponent";

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
      delDialog: false,
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

  uploadImage = (e, setFieldValue) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      setFieldValue("isUpload", true);

      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setFieldValue(`imageUrl`, reader.result);
          };

          setFieldValue(`isUpload`, false);
          setFieldValue(`fileId`, res.data.data.fileId);
        })
        .catch((err) => {
          console.log(err);
          setFieldValue(`isUpload`, false);
        });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  componentDidMount() {
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.getExtraByID(merchantId);
  }
  handleDel = (extraID) => {
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.delExtra(extraID, merchantId);
  };
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
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.archiveExtraById(extraId, merchantId);
  };
  handleChangePage = (pageIndex) => {
    this.props.setPageExtra(pageIndex);
  };
  handleExport = () => {
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.exportExtra(merchantId);
  };
  handleChangeSize = (size) => {
    console.log("size", size);
    this.props.setSizeExtra(size);
  };
  handleRestore = (extraId) => {
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.restoreExtraById(extraId, merchantId);
  };

  handleAddTemplate = async (e) => {
    e.preventDefault();
    const merchantId = this.props.MerchantProfile.merchantId;
    let file = await e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(xlsx)$/)) {
      this.props.importExtra(merchantId, file);
    } else {
      this.props.warningNotify(
        "File type is not supported, Please choose another file "
      );
    }
  };

  render() {
    let { loading } = this.props.extra;
    let extraList = this.props.extra.extraList || [];

    // Search
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
        Header: () => (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Actions
          </div>
        ),
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
              {CheckPermissions("edit-extra") && (
                <span style={{ paddingLeft: "20px" }}>
                  <Tooltip title="Delete">
                    <img
                      alt=""
                      src={DelSVG}
                      onClick={() => {
                        this.setState({
                          delDialog: true,
                          extraId: row.original.extraId,
                        });
                      }}
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
              onClickIcon={()=>this.setState({ search : "" })}
            />
            <div>
              <Button
                className="btn btn-green"
                style={{ marginRight: "10px" }}
                onClick={() => this.handleExport()}
              >
                EXPORT
              </Button>
              <div id="upload_button">
                <label>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => this.handleAddTemplate(e)}
                  />
                  <span style={{ margin: "0px" }} className="btn btn-green">
                    IMPORT
                  </span>
                </label>
              </div>
            </div>
          </div>
          <EditExtra
            getExtra={this.props.getExtraByID}
            edit={this.state.edit}
            data={this.state}
            handleClose={this.handleClose}
            uploadImage={this.uploadImage}
            merchantId={this.props.MerchantProfile.merchantId}
            updateExtra={this.props.updateMerchantExtraById}
          />
          <div className="merchant-list-container">
            <ReactTable
              page={this.props.page || 0}
              pageSize={this.props.size || 5}
              onPageChange={(pageIndex) => this.handleChangePage(pageIndex)}
              onPageSizeChange={(size) => this.handleChangeSize(size)}
              data={extraList}
              columns={columns}
              defaultPageSize={5}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
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
            {/* DELETE */}
            <Dialog open={this.state.delDialog}>
              <DialogTitle>{"Delete this Extra?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Do you want delete this extra ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ delDialog: false, extraId: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => [
                    this.handleDel(this.state.extraId),
                    this.setState({ delDialog: false, extraId: "" }),
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
  MerchantProfile: state.merchant.merchant,
  extra: state.extra,
  page: state.updateMerchantExtra.page,
  size: state.updateMerchantExtra.size,
});
const mapDispatchToProps = (dispatch) => ({
  getExtraByID: (merchantId) => {
    dispatch(getExtraByID(merchantId));
  },
  archiveExtraById: (extraId, merchantId) => {
    dispatch(archiveExtraById(extraId, merchantId));
  },
  restoreExtraById: (extraId, merchantId) => {
    dispatch(restoreExtraById(extraId, merchantId));
  },
  updateMerchantExtraById: (payload) => {
    dispatch(updateMerchantExtraById(payload));
  },
  warningNotify: (message) => {
    dispatch({ type: WARNING_NOTIFICATION, payload: message });
  },
  setPageExtra: (page) => {
    dispatch(setPageExtra(page));
  },
  setSizeExtra: (size) => {
    dispatch(setSizeExtra(size));
  },
  exportExtra: (merchantId) => {
    dispatch(exportExtra(merchantId));
  },
  importExtra: (merchantId, file) => {
    dispatch(importExtra(merchantId, file));
  },
  delExtra: (extraId, merchantId) => {
    dispatch(delExtra(extraId, merchantId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ExtraTab);
