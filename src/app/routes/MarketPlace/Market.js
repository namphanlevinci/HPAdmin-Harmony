import React, { Component } from "react";
import { config } from "../../../url/url";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../util/CustomText";
import { connect } from "react-redux";
import {
  Button,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@material-ui/core";

import SearchComponent from "../../../util/searchComponent";
import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
import ReactTable from "react-table";
import axios from "axios";

import "react-table/react-table.css";
import "../Merchants/Merchants.css";
import "../Merchants/PendingList/MerchantReqProfile.css";

const URL = config.url.URL;

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: false,
      statusValue: -1,
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
    const { page, statusValue } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

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
            title={<IntlMessages id="sidebar.dashboard.marketPlace" />}
          />
        </div>
        <div className="container-fluid">
          <div className="page-heading MerList">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* SEARCH */}
              <div className="search">
                <SearchComponent
                  placeholder="Search"
                  value={this.state.search}
                  onChange={this.handleChange}
                  onKeyPress={this.keyPressed}
                  onClickIcon={this.fetchApi}
                />
              </div>
              <FormControl style={{ width: "20%", marginLeft: "15px" }}>
                <InputLabel>Status</InputLabel>
                <Select onChange={this.handleStatus} value={statusValue}>
                  <MenuItem value={-1}>All</MenuItem>
                  <MenuItem value={0}>Active</MenuItem>
                  <MenuItem value={1}>Inactive</MenuItem>
                </Select>
              </FormControl>
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
const mapStateToProps = (state) => ({
  apiData: state.fetchApi,
});

export default connect(mapStateToProps, null)(Market);
