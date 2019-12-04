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
class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: true
    };
  }

  getService = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/service/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        this.setState({ data: res.data.data, loading: false });
      });
  };

  componentDidMount() {
    this.getService();
  }

  handleEdit = e => {
    this.props.VIEW_SERVICE(e);
    this.props.history.push("/app/merchants/profile/service/edit");
  };

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };

  handleArchive = ID => {
    axios
      .put(URL + "/service/archive/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {});
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getService();
    }, 1500);
  };

  handleRestore = ID => {
    axios
      .put(URL + "/service/restore/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {});
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
        serviceList = serviceList.filter(e => {
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
        Header: "No.",
        accessor: "serviceId",
        width: 80
      },
      {
        Header: "Service Name",
        id: "Service Name",
        width: 300,
        accessor: "name",
        Cell: row => {
          return (
            <div>
              <img
                height={80}
                width={120}
                src={row.original.imageUrl}
                alt="servicepic"
                style={{ objectFit: "contain" }}
              />
              &nbsp;
              {row.original.name}
            </div>
          );
        }
      },
      {
        id: "Categories",
        Header: "Categories",
        accessor: "categoryName",
        Cell: e => (
          <div>
            <p>{e.value}</p>
          </div>
        ),
        width: 220
      },
      {
        Header: "Status",
        id: "status",
        accessor: "isDisabled",
        Cell: e => (
          <div>
            <span>{e.value === 0 ? "Active" : "Disable"}</span>
          </div>
        ),
        width: 120
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
                onClick={() => this.handleEdit(row.original)}
                style={{
                  backgroundColor: "#0764b0",
                  color: "white",
                  padding: "10px 20px"
                }}
              >
                Edit
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
                      Do you want to Archire this Service?
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
                          this.handleArchive(row.original.serviceId)
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
                      Do you want to Restore this Service?
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
                          this.handleRestore(row.original.serviceId)
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
                  this.props.history.push("/app/merchants/profile/service/add")
                }
              >
                ADD SERVICE
              </Button>
            </div>
          </div>

          <div className="MListContainer">
            <ReactTable
              data={serviceList}
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
export default connect(mapStateToProps, mapDispatchToProps)(Service);
