import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProductByID,
  viewProduct,
  archiveProductById,
  restoreProductById,
} from "../../../../../../actions/merchantActions";

import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import defaultImage from "../Extra/hpadmin2.png";
import CheckPermissions from "../../../../../../util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveSVG from "../../../../../../assets/images/archive.svg";
import EditSVG from "../../../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../../../assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";

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

  componentDidMount() {
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.getProductByID(merchantId);
  }

  viewDetail = (payload) => {
    this.props.viewProduct({
      ...payload,
      path: "/app/merchants/profile/product/profile",
    });
    this.props.history.push(payload);
  };

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };

  handleArchive = (productId) => {
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.archiveProductById(productId, merchantId);
    this.setState({ isOpenReject: false, loading: true });
  };

  handleRestore = (productId) => {
    const merchantId = this.props.MerchantProfile.merchantId;
    this.props.restoreProductById(productId, merchantId);
    this.setState({ isOpenReject: false, loading: true });
  };
  render() {
    let { productList, loading } = this.props.product;

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
        Cell: (e) => (
          <p style={{ fontWeight: "500" }}>
            {e.value === 0 ? "Active" : "Inactive"}
          </p>
        ),
        width: 120,
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
                <img
                  alt=""
                  src={RestoreSVG}
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
              {CheckPermissions("active-product") && actionsBtn}

              {CheckPermissions("edit-product") && (
                <span style={{ paddingLeft: "20px" }}>
                  <Tooltip title="Edit">
                    <img
                      alt="product_image"
                      src={EditSVG}
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
              {CheckPermissions("add-new-product") && (
                <Button
                  className="btn btn-green"
                  style={{ marginRight: "0px" }}
                  onClick={() =>
                    this.props.history.push(
                      "/app/merchants/profile/product/add"
                    )
                  }
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
              loading={loading}
            />
          </div>

          {/* ARCHIVE */}
          <Dialog open={this.state.dialog}>
            <DialogTitle>{"Archive this Product?"}</DialogTitle>
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
            <DialogTitle>{"Restore this Product?"}</DialogTitle>
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
  MerchantProfile: state.merchant.merchant,
  userLogin: state.userReducer.User,
  product: state.product,
});
const mapDispatchToProps = (dispatch) => ({
  viewProduct: (payload) => {
    dispatch(viewProduct(payload));
  },
  getProductByID: (merchantId) => {
    dispatch(getProductByID(merchantId));
  },
  archiveProductById: (productId, merchantId) => {
    dispatch(archiveProductById(productId, merchantId));
  },
  restoreProductById: (productId, merchantId) => {
    dispatch(restoreProductById(productId, merchantId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);

const styles = {
  span: {
    fontWeight: "400",
    color: "black",
  },
};
