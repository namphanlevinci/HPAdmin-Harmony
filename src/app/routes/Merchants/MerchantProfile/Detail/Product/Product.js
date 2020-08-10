import React, { Component } from "react";
import { connect } from "react-redux";
import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { config } from "../../../../../../url/url";

import ReactTable from "react-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import defaultImage from "../Extra/hpadmin2.png";
import ProductAdd from "./productAdd";
import Slide from "@material-ui/core/Slide";
import CheckPermissions from "../../../../../../util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import PageviewOutlinedIcon from "@material-ui/icons/PageviewOutlined";
import "react-table/react-table.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const URL = config.url.URL;
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
          Authorization: `Bearer ${this.props.userLogin.token}`,
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
          Authorization: `Bearer ${this.props.userLogin.token}`,
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
          Authorization: `Bearer ${this.props.userLogin.token}`,
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
            <p style={styles.span}>{e.value}</p>
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
            <p>{e.value}</p>
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
            <p>{e.value}</p>
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
            <p>$ {e.value}</p>
          </div>
        ),
        width: 150,
      },
      {
        Header: "Status",
        id: "status",
        accessor: "isDisabled",
        Cell: (e) => <p>{e.value === 0 ? "Active" : "Inactive"}</p>,
        width: 120,
      },
      {
        id: "Actions",
        sortable: false,
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        Cell: (row) => {
          const actionsBtn =
            row.original.isDisabled !== 1 ? (
              <Tooltip title="Delete">
                <ArchiveOutlinedIcon
                  size={21}
                  onClick={() => [
                    this.setState({
                      productId: row.original.productId,
                      dialog: true,
                    }),
                  ]}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Restore">
                <UnarchiveOutlinedIcon
                  onClick={() =>
                    this.setState({
                      productId: row.original.productId,
                      restoreDialog: true,
                    })
                  }
                />
              </Tooltip>
            );
          return (
            <div style={{ textAlign: "center" }}>
              {CheckPermissions(25) && actionsBtn}

              {CheckPermissions(26) && (
                <span style={{ paddingLeft: "20px" }}>
                  <Tooltip title="Edit">
                    <PageviewOutlinedIcon
                      onClick={() => this.viewDetail(row.original)}
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
              {CheckPermissions(24) && (
                <Button
                  className="btn btn-green"
                  style={{ marginRight: "0px" }}
                  onClick={() => this.setState({ isPopupAddProduct: true })}
                >
                  NEW PRODUCT
                </Button>
              )}
            </div>
          </div>

          <div className="merchant-list-container">
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
          <Dialog open={this.state.dialog}>
            <DialogTitle>{"Archive this product ?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
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
          <Dialog open={this.state.restoreDialog}>
            <DialogTitle>{"Restore this product ?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
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
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  VIEW_SERVICE: (payload) => {
    dispatch(VIEW_SERVICE(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);

const styles = {
  span: {
    fontWeight: "400",
    color: "black",
  },
};
