import React, { Component } from "react";
import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
import SearchIcon from "@material-ui/icons/Search";
// import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import axios from "axios";
import { config } from "../../../url/url";

import "react-table/react-table.css";
import "../Merchants/MerchantsList/merchantsList.css";
import "../Merchants/MerchantsRequest/MerchantReqProfile.css";

const URL = config.url.URL;

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: false,
    };
  }

  componentDidMount = async () => {
    try {
      let res = await axios.get(`${URL}/package`);
      this.setState({ data: res.data.data }, () =>
        this.setState({ loading: true })
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const columns = [
      {
        id: "id",
        Header: "ID",
        accessor: (e) => <span>#{e?.packageId}</span>,
        width: 100,
      },
      {
        id: "name",
        Header: "Title",
        accessor: (e) => <span>{`Pricing package ${e?.packageId}`}</span>,
      },
      {
        Header: "Subtitle",
        accessor: "packageName",
        Cell: (props) => <span>{props.value}</span>,
      },
      {
        id: "price",
        Header: "Pricing",
        accessor: (e) => <span>$ {e.pricing}</span>,
      },
      {
        id: "status",
        Header: "Status", // Custom header components!
        accessor: (e) => (
          <span>{e?.isDisabled === 0 ? "Active" : "Disable"}</span>
        ),
      },
    ];

    return (
      <div className="app-wrapper ">
        <div className=" react-transition swipe-right container-fluid">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.pricingPlan" />}
          />
        </div>
        <div className="container-fluid">
          <div className="page-heading MerList">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* SEARCH */}
              <div className="search">
                <form>
                  <SearchIcon className="button" title="Search" />
                  <input
                    type="text"
                    className="textBox"
                    placeholder="Search.."
                    value={this.state.search}
                    onChange={this._SearchMerchants}
                  />
                </form>
              </div>
              {/* <div>
                <Button
                  style={{
                    backgroundColor: "#4251af",
                    color: "white",
                    marginTop: "0px",
                  }}
                  className="btn btn-red"
                  onClick={this.addMerchant}
                >
                  ADD MERCHANT
                </Button>
              </div> */}
            </div>
            <div className="merchant-list-container">
              {this.state.loading && (
                <ReactTable
                  defaultPageSize={10}
                  minRows={1}
                  noDataText="NO DATA!"
                  // loading={this.state.loading}
                  columns={columns}
                  // getTdProps={onRowClick}
                  data={this.state.data}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pricing;
