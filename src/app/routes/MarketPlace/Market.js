import React, { Component } from "react";
import { config } from "../../../url/url";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../util/CustomText";
import { connect } from "react-redux";
import { fetchApiByPage } from "../../../actions/fetchApiActions";
import { getMarketInfoAction } from "../../../actions/marketActions";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  // Switch,
} from "@material-ui/core";
import { history } from "../../../store";
import { debounce } from "lodash";

import NewButton from "../../../components/Button/Search";
import CustomSwitch from "./components/Switch";
import SearchComponent from "../../../util/searchComponent";
import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
import ReactTable from "react-table";
import axios from "axios";
import { reloadUrl } from '../../../util/reload';

import "react-table/react-table.css";
import "../Merchants/Merchants.css";
import "../Merchants/PendingList/MerchantReqProfile.css";

const URL = config.url.URL;

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      statusValue: -1,
    };
    this.refTable = React.createRef();
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
    const { statusAddMarketPlace } = this.props;
    if (statusAddMarketPlace) {
      this.resetFirstPage();
      this.props.updateStatusAddMarketPlace(false);
    }
  };

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };
  handleResetClick = (e) => {
    this.setState({ statusValue: -1 });
    this.searchMarketPlace();
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  handleStatus = (e) => {
    this.setState({ statusValue: e.target.value });
    this.searchMarketPlace();
  };

  keyPressed = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchApi();
    }
  };

  searchMarketPlace = debounce((query) => {
    this.fetchApi();
  }, 800);

  addMarketPlace = () => history.push("/app/market-place/new-brand");

  fetchApi = async (state) => {
    const { search, range, statusValue } = this.state;
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const sortType = state?.sorted?.[0]?.desc ? "desc" : "asc";
    const sortValue = state?.sorted?.[0]?.id ? state?.sorted[0]?.id : "";
    const url = `MarketPlace/search?page=${page === 0 ? 1 : page + 1
      }&row=${pageSize}&quickFilter=${range}&key=${search}&sortValue=${sortValue}&sortType=${sortType}&isDisabled=${statusValue}`;

    this.props.fetchApiByPage(url);
  };

  resetFirstPage = () => {
    this.changePage(0);
    if (this.refTable && this.refTable.current)
      this.refTable.current.onPageChange(0);
    const els = document.getElementsByClassName('-pageJump');
    const inputs = els[0].getElementsByTagName('input');
    inputs[0].value = 1;
    reloadUrl('app/market-place/home');
  }

  render() {
    const { page, statusValue } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined && column?.id !== "link") {
            this.props.getMarketInfoAction(rowInfo?.original);
            history.push(
              `/app/market-place/${rowInfo?.original?.marketPlaceId}`
            );
          }
        },
      };
    };

    const columns = [
      {
        id: "name",
        Header: <CustomTableHeader value="Name" />,
        accessor: (e) => <Typography variant="subtitle1">{e?.name}</Typography>,
      },
      {
        id: "fileURL",
        Header: <CustomTableHeader value="Image" />,
        accessor: (e) => (
          <img
            src={e?.fileURL}
            alt={`market_place_${e?.name}`}
            width={75}
            height={75}
          />
        ),
        sortable: false,
      },
      {
        id: "link",
        Header: <CustomTableHeader value="URL" />,
        accessor: (e) => (
          <a href="/#" target="_blank" rel="noopener noreferrer">
            {e.link}
          </a>
        ),
      },
      {
        id: "isDisabled",
        Header: (
          <CustomTableHeader value="Status" styles={{ textAlign: "center" }} />
        ),
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className="table__light"
            style={{ textAlign: "center" }}
          >
            {e?.isDisabled === 0 ? "Active" : "Disable"}
          </Typography>
        ),
      },
      {
        id: "onTop",
        Header: (
          <CustomTableHeader value="On Top" styles={{ textAlign: "center" }} />
        ),
        accessor: (e) => (
          <div style={{ textAlign: "center" }}>
            <CustomSwitch
              // color="primary"
              // style={{ color: "#0764B0" }}
              checked={e?.onTop}
              disabled={!e?.onTop}
            />
          </div>
        ),
      },
    ];

    return (
      <div>
        <div className=" react-transition swipe-right container-fluid">
          <Helmet>
            <title>Market | Harmony Admin</title>
          </Helmet>
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.marketPlace" />}
          />
        </div>
        <div className="container-fluid">
          <div className="page-heading MerList">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {/* SEARCH */}
              <div
                className="search"
                style={{ width: "50%", display: "flex", alignItems: "center" }}
              >
                <SearchComponent
                  placeholder="Search"
                  value={this.state.search}
                  onChange={this.handleChange}
                  onKeyPress={this.keyPressed}
                  onClickIcon={this.fetchApi}
                />
                <NewButton
                  onClick={this.fetchApi}
                  style={{ marginLeft: "10px" }}
                >
                  Search
                </NewButton>
              </div>
              <div style={{ width: "50%", textAlign: "right" }}>
                <Button onClick={this.addMarketPlace} className="btn btn-green">
                  NEW BRAND
                </Button>
              </div>

              <div style={{ width: "45%", marginTop: "15px" }}>
                <FormControl style={{ width: "40%" }}>
                  <InputLabel>Status</InputLabel>
                  <Select onChange={this.handleStatus} value={statusValue}>
                    <MenuItem value={-1}>All Status</MenuItem>
                    <MenuItem value={0}>Active</MenuItem>
                    <MenuItem value={1}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <NewButton onClick={this.handleResetClick}>Reset</NewButton>
              {/* <Button
                style={{ color: "#0764B0", marginTop: "15px" }}
                onClick={this.handleResetClick}
                className="btn btn-red"
              >
                RESET
              </Button> */}
            </div>
            <div className="merchant-list-container">
              <ReactTable
                ref={this.refTable}
                manual
                page={page}
                pages={pageCount}
                data={data}
                row={pageSize}
                onPageChange={(pageIndex) => this.changePage(pageIndex)}
                onFetchData={(state) => this.fetchApi(state)}
                defaultPageSize={10}
                minRows={1}
                noDataText="NO DATA!"
                loading={loading}
                columns={columns}
                getTdProps={onRowClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  apiData: state.fetchApi,
  statusAddMarketPlace: state.addMarketPlace.statusAddMarketPlace,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  getMarketInfoAction: (value) => {
    dispatch(getMarketInfoAction(value));
  },
  updateStatusAddMarketPlace: (payload) => {
    dispatch({ type: 'UPDATE_STATUS_ADD_MARKET_PLACE', payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Market);
