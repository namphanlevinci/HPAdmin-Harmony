import React, { Component } from "react";
import { config } from "../../../url/url";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../util/CustomText";
import { Typography } from "@material-ui/core";

import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import axios from "axios";

import "react-table/react-table.css";
import "../Merchants/Merchants.css";
import "../Merchants/PendingList/MerchantReqProfile.css";

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
        Header: <CustomTableHeader value="ID" />,
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            #{e?.packageId}
          </Typography>
        ),
        width: 100,
      },
      {
        id: "name",
        Header: <CustomTableHeader value="Title" />,
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {`Pricing package ${e?.packageId}`}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Subtitle" />,
        accessor: "packageName",
        Cell: (props) => (
          <Typography variant="subtitle1" className="table__light">
            {props.value}
          </Typography>
        ),
      },
      {
        id: "price",
        Header: <CustomTableHeader value="Pricing" />,
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            $ {e.pricing}
          </Typography>
        ),
      },
      {
        id: "status",
        Header: <CustomTableHeader value="Status" />,
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.isDisabled === 0 ? "Active" : "Disable"}
          </Typography>
        ),
      },
    ];

    return (
      <div className="app-wrapper ">
        <div className=" react-transition swipe-right container-fluid">
          <Helmet>
            <title>Pricing Plan | Harmony Admin</title>
          </Helmet>
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
