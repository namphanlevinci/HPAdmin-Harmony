import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import axios from "axios";
import URL from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";
import Popup from "reactjs-popup";
// import SearchIcon from "@material-ui/icons/Search";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: true
    };
  }

  getProduct = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/product/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        this.setState({ data: res.data.data, loading: false });
      });
  };

  componentDidMount() {
    this.getProduct();
  }

  viewDetail = e => {
    this.props.VIEW_SERVICE(e);
    this.props.history.push("/app/merchants/profile/product/detail");
  };

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };

  handleArchive = ID => {
    axios
      .put(URL + "/product/archive/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {});
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getProduct();
    }, 1500);
  };

  handleRestore = ID => {
    axios
      .put(URL + "/product/restore/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {});
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
        productList = productList.filter(e => {
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
        Header: "Product",
        id: "product",
        width: 250,
        accessor: "name",
        Cell: row => {
          return (
            <div>
              <img
                height={100}
                width={100}
                src={row.original.imageUrl}
                alt="product"
                style={{ objectFit: "contain" }}
              />
              &nbsp;
              {row.original.name}
            </div>
          );
        }
      },
      {
        id: "SKU",
        Header: "SKU Number",
        accessor: "sku",
        Cell: e => (
          <div>
            <p>{e.value}</p>
          </div>
        ),
        width: 160
      },
      {
        Header: "Categories",
        id: "Categories",
        accessor: "categoryName",
        Cell: e => (
          <div>
            <span>{e.value}</span>
          </div>
        ),
        width: 160
      },
      {
        id: "Quantity",
        Header: "Quantity",
        accessor: "quantity",
        Cell: e => (
          <div>
            <p>{e.value}</p>
          </div>
        ),
        width: 120
      },
      {
        id: "Need To Order",
        Header: "Need To Order",
        accessor: "needToorDer",
        Cell: e => (
          <div>
            <p>{e.value}</p>
          </div>
        ),
        width: 150
      },
      {
        id: "Actions",
        sortable: false,
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        Cell: row => {
          return (
            <div style={{ textAlign: "center" }}>
              <Button
                className="btn"
                onClick={() => this.viewDetail(row.original)}
                style={{
                  backgroundColor: "#0764b0",
                  color: "white",
                  padding: "10px 20px"
                }}
              >
                Detail
              </Button>
              {row.original.isDisabled !== 1 ? (
                <Popup
                  trigger={
                    <Button
                      className="btn"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px 20px"
                      }}
                    >
                      {" "}
                      Archive{" "}
                    </Button>
                  }
                  modal
                  closeOnDocumentClick
                >
                  <div className="Disable-Popup">
                    <h2 className="title">
                      Do you want to Archire this Product?
                    </h2>
                    <div className="Disable-Button">
                      <Button
                        type="submit"
                        className="btn btn-red"
                        onClick={this.handleCloseReject}
                      >
                        BACK
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-green"
                        onClick={() =>
                          this.handleArchive(row.original.productId)
                        }
                      >
                        COMFIRM
                      </Button>
                    </div>
                  </div>
                </Popup>
              ) : (
                // handle Restore
                <Popup
                  trigger={
                    <Button
                      className="btn"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        padding: "10px 20px"
                      }}
                    >
                      {" "}
                      Restore{" "}
                    </Button>
                  }
                  modal
                  closeOnDocumentClick
                >
                  <div className="Disable-Popup">
                    <h2 className="title">
                      Do you want to Restore this Product?
                    </h2>
                    <div className="Disable-Button">
                      <Button
                        type="submit"
                        className="btn btn-red"
                        onClick={this.handleCloseReject}
                      >
                        BACK
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-green"
                        onClick={() =>
                          this.handleRestore(row.original.productId)
                        }
                      >
                        COMFIRM
                      </Button>
                    </div>
                  </div>
                </Popup>
              )}
            </div>
          );
        }
      }
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
                  onChange={e => this.setState({ search: e.target.value })}
                />
              </form>
            </div>
            <div>
              <Button
                className="btn btn-green"
                onClick={() =>
                  this.props.history.push("/app/merchants/profile/product/add")
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});
const mapDispatchToProps = dispatch => ({
  VIEW_SERVICE: payload => {
    dispatch(VIEW_SERVICE(payload));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);
