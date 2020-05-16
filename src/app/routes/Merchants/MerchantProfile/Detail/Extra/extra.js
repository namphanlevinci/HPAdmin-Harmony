import React, { Component } from "react";
import { connect } from "react-redux";
import { FaRegEdit, FaTrash, FaTrashRestoreAlt } from "react-icons/fa";
import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactTable from "react-table";
import axios from "axios";
import EditExtra from "./edit-extra";

import URL, { upFileUrl } from "../../../../../../url/url";
import defaultImage from "./hpadmin2.png";
import "react-table/react-table.css";

class ExtraTab extends Component {
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

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    // handle upload image
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFileUrl, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getExtra = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/extra/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {
        this.setState({ data: res.data.data, loading: false });
      });
  };

  componentDidMount() {
    this.getExtra();
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
    });
  };

  handleArchive = (ID) => {
    axios
      .put(URL + "/extra/archive/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {});
    this.setState({ loading: true });
    setTimeout(() => {
      this.getExtra();
    }, 1500);
  };

  handleRestore = (ID) => {
    axios
      .put(URL + "/extra/restore/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {});
    this.setState({ loading: true });
    setTimeout(() => {
      this.getExtra();
    }, 1500);
  };
  render() {
    // Search
    let extraList = this.state.data;
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
        Header: " Extra name",
        accessor: "name",
        width: 150,
        Cell: (e) => (
          <div>
            <span style={styles.span}> {e.value} </span>
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
        id: "duration",
        Header: "Duration",
        accessor: "duration",
        Cell: (e) => (
          <div>
            <span style={styles.span}>{e.value} Min</span>
          </div>
        ),
        width: 150,
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
          <div>
            <span style={styles.span}>
              {e.value === 0 ? "Active" : "Disable"}
            </span>
          </div>
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
                <FaTrash
                  size={20}
                  onClick={() => [
                    this.setState({
                      extraId: row.original.extraId,
                      dialog: true,
                    }),
                  ]}
                />
              ) : (
                <FaTrashRestoreAlt
                  size={20}
                  onClick={() =>
                    this.setState({
                      extraId: row.original.extraId,
                      restoreDialog: true,
                    })
                  }
                />
              )}
              <span style={{ paddingLeft: "20px" }}>
                <FaRegEdit
                  size={20}
                  onClick={() => [
                    this.handleEdit(row.original),
                    this.setState({ edit: true }),
                  ]}
                />
              </span>
            </div>
          );
        },
      },
    ];

    return (
      <div className="content GeneralContent react-transition swipe-up Staff">
        <div className="MerList" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="search">
              <form>
                {/* <SearchIcon className="button" title="Search" /> */}
                <input
                  type="text"
                  className="textbox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
              </form>
            </div>
            <div></div>
          </div>
          <EditExtra
            getExtra={this.getExtra}
            edit={this.state.edit}
            data={this.state}
            handleClose={this.handleClose}
            handleImageChange={this.handleImageChange}
            token={this.props.InfoUser_Login.User.token}
            merchantId={this.props.MerchantProfile.merchantId}
          />
          <div className="MListContainer">
            <ReactTable
              data={extraList}
              columns={columns}
              defaultPageSize={5}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
            />

            {/* ARCHIVE */}
            <Dialog
              open={this.state.dialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Archive this extra ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
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
            <Dialog
              open={this.state.restoreDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Restore this extra ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
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
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
});
const mapDispatchToProps = (dispatch) => ({
  VIEW_SERVICE: (payload) => {
    dispatch(VIEW_SERVICE(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ExtraTab);

const styles = {
  span: {
    fontWeight: "500",
    color: "black",
  },
};
