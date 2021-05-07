import React, { Component } from "react";
import { config } from "../../../url/url";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../util/CustomText";
import { Typography } from "@material-ui/core";

import SearchComponent from "../../../util/searchComponent";
import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
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
      search : "",
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
              <div className="search">
                <SearchComponent
                  placeholder="Search by Name, Group"
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                  onKeyPress={this.keyPressed}
                  onClickIcon = {()=>this.setState({ search : "" })}
                />
              </div>
            </div>
            <div className="merchant-list-container">
              {this.state.loading && (
                <ReactTable
                  defaultPageSize={10}
                  minRows={1}
                  noDataText="NO DATA!"
                  columns={columns}
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
