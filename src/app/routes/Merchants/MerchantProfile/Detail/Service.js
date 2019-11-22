import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "../../MerchantsList/merchantsList.css";
import "./Detail.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import URL from "../../../../../url/url";
import Button from "@material-ui/core/Button";
class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: []
    };
  }

  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/service/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        console.log("RES DATA", res);
        this.setState({ data: res.data.data });
      });
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        console.log("RES", res);
      });
  }

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
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
              <img height={80} src={row.original.imageUrl} alt="servicepic" />
              &nbsp;
              {row.original.name}
            </div>
          );
        }
      },
      {
        id: "Categories",
        Header: "Categories",
        width: 250,
        accessor: "categoryName"
      },
      {
        Header: "Status",
        id: "status",
        accessor: "status",
        Cell: e => <span>{e.value === 0 ? "Active" : "Disable"}</span>,
        width: 120
      },
      {
        Header: "Actions",
        id: "Actions",
        Cell: row => {
          return (
            <div>
              <Button>Edit</Button>
              <Button>Archive</Button>
            </div>
          );
        }
      }
    ];
    return (
      <div className="content GeneralContent react-transition swipe-up Staff">
        <div className="MerList" style={{ padding: "10px" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          ></div>

          <div className="MListContainer">
            <ReactTable
              data={this.state.data}
              columns={columns}
              defaultPageSize={10}
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
export default connect(mapStateToProps)(Service);
