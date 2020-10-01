import React from "react";
import { connect } from "react-redux";
import {
  ViewProfile_Merchants,
  GET_MERCHANT_BY_ID,
} from "../../../../actions/merchants/actions";
import { Helmet } from "react-helmet";
import { config } from "../../../../url/url";
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  Typography,
} from "@material-ui/core";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";

import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ScaleLoader from "../../../../util/scaleLoader";
import CheckPermissions from "../../../../util/checkPermission";

import "react-table/react-table.css";
import "./merchantsList.css";
import "../MerchantsRequest/MerchantReqProfile.css";

const URL = config.url.URL;

class Merchants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      // Pages
      page: 0,
      pageCount: 0,
      data: [],
      pageLoading: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ pageLoading: true });
  }

  fetchData = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    this.setState({ loading: true });

    await axios
      .get(
        URL +
          `/merchant/search?key=${this.state.search}&page=${
            page === 0 ? 1 : page + 1
          }&row=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.userLogin.token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        if (Number(res.data.codeNumber) === 200) {
          this.setState({
            page,
            pageCount: res.data.pages,
            data: data,
            loading: false,
            pageSize: 5,
          });
        } else {
          this.setState({ data: [] });
        }
        this.setState({ loading: false });
      });
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  addMerchant = () => {
    this.props.history.push("/app/merchants/add");
  };
  MerchantProfilePage = (ID) => {
    this.setState({ loading: true });
    const payload = { ID, path: "/app/merchants/profile/general" };
    this.props.GET_MERCHANT_BY_ID(payload);
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      this.fetchData();
    }
  };

  _SearchMerchants = async (e) => {
    await this.setState({ search: e.target.value });
  };
  render() {
    const { page, pageCount, data, pageSize } = this.state;
    const columns = [
      {
        Header: "ID",
        id: "merchantId",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.merchantId}
          </Typography>
        ),
        width: 60,
      },
      {
        Header: "MID",
        id: "mid",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.merchantCode}
          </Typography>
        ),
      },
      {
        Header: "DBA",
        id: "general",
        accessor: "general",
        Cell: (e) => (
          <Typography variant="subtitle1">
            {e?.value ? e.value.doBusinessName : null}
          </Typography>
        ),
      },
      {
        id: "principals",
        Header: "Owner",
        accessor: (e) => e?.principals?.[0],
        Cell: (e) => (
          <Typography variant="subtitle1">
            {e?.value ? e.value.firstName + " " + e.value.lastName : null}
          </Typography>
        ),
      },
      {
        Header: "Email",
        id: "email",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.email}
          </Typography>
        ),
      },
      {
        Header: "Store Phone",
        id: "phone",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.phone}
          </Typography>
        ),
      },
      {
        Header: "Contact Phone",
        id: "contactPhone",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.general?.phoneContact}
          </Typography>
        ),
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: (e) => (
          <Typography variant="subtitle1">
            {e.value === 0 ? "Active" : "Inactive"}
          </Typography>
        ),
        width: 100,
      },
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this.MerchantProfilePage(rowInfo.original.merchantId);
          }
        },
      };
    };
    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Merchant | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.MList" />}
        />
        <div className="MerList page-heading " style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <FormControl variant="outlined">
                <OutlinedInput
                  inputProps={{
                    style: {
                      padding: 14,
                    },
                  }}
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._SearchMerchants}
                  onKeyPress={this.keyPressed}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={0}
                />
              </FormControl>
            </div>

            <div>
              {CheckPermissions("add-new-merchant") && (
                <Button
                  style={{
                    backgroundColor: "#4251af",
                    color: "white",
                    marginTop: "10px",
                  }}
                  className="btn btn-red"
                  onClick={this.addMerchant}
                >
                  ADD MERCHANT
                </Button>
              )}
            </div>
          </div>
          <ScaleLoader isLoading={this.state.isLoading} />
          <div className="merchant-list-container">
            <ReactTable
              manual
              sortable={false}
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              // You should also control this...
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchData(state)}
              defaultPageSize={20}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
              columns={columns}
              getTdProps={onRowClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
  GET_MERCHANT_BY_ID: (ID) => {
    dispatch(GET_MERCHANT_BY_ID(ID));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
