import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import axios from "axios";
import URL from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";

// import SearchIcon from "@material-ui/icons/Search";

import { FaTrashRestoreAlt, FaTrash, FaRegEdit } from "react-icons/fa";
import { GoFile } from "react-icons/go";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import defaultImage from "../Extra/hpadmin2.png";
import "react-table/react-table.css";
import ProductAdd from "./productAdd";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: true,
      dialog: false,
      restoreDialog: false,
      productId: "",
      isPopupAddProduct: false,
    };
  }

  getProduct = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/product/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {
        this.setState({ data: res.data.data, loading: false });
      });
  };

  componentDidMount() {
    this.getProduct();
  }

  viewDetail = (e) => {
    this.props.VIEW_SERVICE(e);
    this.props.history.push("/app/merchants/profile/product/detail");
  };

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };

  handleArchive = (ID) => {
    axios
      .put(URL + "/product/archive/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {});
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getProduct();
    }, 1500);
  };

  handleRestore = (ID) => {
    axios
      .put(URL + "/product/restore/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {});
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getProduct();
    }, 1500);
  };
  render() {
    // Search
    let productList = this.state.data;
    if (productList) {
      if (this.state.search) {
        productList = productList.filter((e) => {
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
        Header: "Product Name",
        id: "product",
        width: 150,
        accessor: "name",
        Cell: (e) => (
          <div>
            <span style={styles.span}>{e.value}</span>
          </div>
        ),
      },
      {
        Header: "Image",
        id: "image",
        width: 150,
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
        Header: "Categories",
        id: "Categories",
        accessor: "categoryName",
        Cell: (e) => (
          <div>
            <span style={styles.span}>{e.value}</span>
          </div>
        ),
        width: 160,
      },
      {
        id: "Items in Stock",
        Header: "Quantity",
        accessor: "quantity",
        Cell: (e) => (
          <div>
            <span style={styles.span}>{e.value}</span>
          </div>
        ),
        width: 120,
      },
      {
        Header: "Price",
        id: "stocks",
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
            {e.value === 0 ? "Active" : "Disable"}
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
                <FaTrash
                  size={20}
                  onClick={() => [
                    this.setState({
                      productId: row.original.productId,
                      dialog: true,
                    }),
                  ]}
                />
              ) : (
                <FaTrashRestoreAlt
                  size={20}
                  onClick={() =>
                    this.setState({
                      productId: row.original.productId,
                      restoreDialog: true,
                    })
                  }
                />
              )}
              <span style={{ paddingLeft: "20px" }}>
                <FaRegEdit
                  size={20}
                  onClick={() => this.viewDetail(row.original)}
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
            <div>
              <Button
                className="btn btn-green"
                onClick={() =>
                  // this.props.history.push("/app/merchants/profile/product/add")
                  this.setState({ isPopupAddProduct: true })
                }
              >
                NEW PRODUCT
              </Button>
            </div>
          </div>

          <div className="MListContainer">
            <ReactTable
              data={productList}
              columns={columns}
              defaultPageSize={5}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
            />
          </div>

          <Dialog
            fullScreen
            open={this.state.isPopupAddProduct}
            onClose={this.handleClickOpen}
            TransitionComponent={Transition}
          >
            <DialogContent>
              <ProductAdd
                getProduct={this.getProduct}
                closePopup={() => this.setState({ isPopupAddProduct: false })}
              />
            </DialogContent>
          </Dialog>

          {/* ARCHIVE */}
          <Dialog
            open={this.state.dialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Archive this product ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This product will not appear on the app. You can restore this
                product by clicking the Restore button.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ dialog: false, productId: "" })}
                color="primary"
              >
                Disagree
              </Button>
              <Button
                onClick={() => [
                  this.handleArchive(this.state.productId),
                  this.setState({ dialog: false, productId: "" }),
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
              {"Restore this product ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This product will appear on the app as well as the related
                lists.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({ restoreDialog: false, productId: "" })
                }
                color="primary"
              >
                Disagree
              </Button>
              <Button
                onClick={() => [
                  this.handleRestore(this.state.productId),
                  this.setState({ restoreDialog: false, productId: "" }),
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
export default connect(mapStateToProps, mapDispatchToProps)(Product);

const styles = {
  span: {
    fontWeight: "500",
    color: "black",
  },
};
