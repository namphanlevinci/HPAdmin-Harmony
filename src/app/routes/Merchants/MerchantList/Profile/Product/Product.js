import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProductByID,
  viewProduct,
  archiveProductById,
  restoreProductById,
  setPageProduct,
  setSizeProduct,
} from "@/actions/merchantActions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import ReactTable from "react-table";
import defaultImage from "../Extra/hpadmin2.png";
import CheckPermissions from "@/util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveSVG from "@/assets/images/archive.svg";
import EditSVG from "@/assets/images/edit.svg";
import RestoreSVG from "@/assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import SearchComponent from "@/util/searchComponent";
import Pagination from "@/components/Pagination";
import { reloadUrl } from '@/util/reload';

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
      page: 1,
      row: 5,
    };
    this.refTable = React.createRef();
    this.pagination = React.createRef();
  }

  componentDidMount() {
    const merchantId = this.props.MerchantProfile.merchantId;
    const { statusAddProduct } = this.props;
    if (statusAddProduct == true) {
      this.gotoLastPage();
      this.props.updateStatusAddProduct(false);
    } else {
      this.props.getProductByID(merchantId);
    }
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

  handleChangePage = async (pageIndex) => {
    await this.props.setPageProduct(pageIndex);
  };

  handleChangeSize = async (pageSize) => {
    await this.props.setSizeProduct(pageSize);
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


  gotoLastPage = () => {
    const { row } = this.state;
    const pageCount = Math.ceil(this.props.product.productList.length / row);
    this.pagination.current.changePage(pageCount);
    this.setState({ page: pageCount });
  }

  updatePagination = () => {
    const page = this.pagination.current.state.page;
    const row = this.pagination.current.state.rowSelected;
    this.setState({ page, row });
  }

  render() {
    let { productList, loading } = this.props.product;

    const { row, page } = this.state;
    productList = productList?.slice((page - 1) * row, (page - 1) * row + row) || [];

    const pageCount =
      (this.props.product.productList && this.props.product.productList.length)
        ?
        Math.ceil(this.props.product.productList.length / row)
        : 1;

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
            <SearchComponent
              type="text"
              className="textBox"
              placeholder="Search.."
              value={this.state.search}
              onChange={(e) => this.setState({ search: e.target.value })}
              onClickIcon={() => this.setState({ search: "" })}
            />

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
              ref={this.refTable}
              data={productList}
              columns={columns}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
              defaultPageSize={200}
              PaginationComponent={() => <div />}
            />
            <Pagination
              ref={this.pagination}
              fetchApi={this.updatePagination}
              pageCount={pageCount}
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
  product: state.product,
  page: state.updateProduct.page,
  size: state.updateProduct.size,
  statusAddProduct: state.addProduct.statusAddProduct,
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
  setPageProduct: (page) => {
    dispatch(setPageProduct(page));
  },
  setSizeProduct: (size) => {
    dispatch(setSizeProduct(size));
  },
  updateStatusAddProduct: (payload) => {
    dispatch({
      type: 'UPDATE_STATUS_ADD_PRODUCT',
      payload
    })
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);

const styles = {
  span: {
    fontWeight: "400",
    color: "black",
  },
};
