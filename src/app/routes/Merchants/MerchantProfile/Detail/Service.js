import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import axios from "axios";
import URL from "../../../../../url/url";
import Button from "@material-ui/core/Button";
import { VIEW_SERVICE } from "../../../../../actions/merchants/actions";
import Popup from "reactjs-popup";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import "react-table/react-table.css";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "../../MerchantsList/merchantsList.css";
import "./Detail.css";
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

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };

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
      .then(res => {
        let message = res.data.message;
        if (res.codeNumber === "200") {
          NotificationManager.success(message, null, 800);
        } else {
          NotificationManager.error(message, null, 800);
        }
      });
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getService();
    }, 1500);
  };
  render() {
    const columns = [
      {
        Header: "No.",
        accessor: "serviceId",
        width: 80
      },
      {
        Header: "Service Name",
        id: "Service Name",
        width: 250,
        accessor: "name",
        Cell: row => {
          return (
            <div>
              <img
                height={80}
                width={120}
                src={row.original.imageUrl}
                alt="servicepic"
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
        )
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
        Header: "Actions",
        id: "Actions",
        sortable: false,
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
                      onClick={() => this.handleArchive(row.original.serviceId)}
                    >
                      COMFIRM
                    </Button>
                  </div>
                </div>
              </Popup>
            </div>
          );
        }
      }
    ];

    return (
      <div className="content GeneralContent react-transition swipe-up Staff">
        <NotificationContainer />
        <div className="MerList" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              className="btn btn-green"
              onClick={() =>
                this.props.history.push("/app/merchants/profile/service/add")
              }
            >
              ADD SERVICE
            </Button>
          </div>

          <div className="MListContainer">
            <ReactTable
              data={this.state.data}
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
