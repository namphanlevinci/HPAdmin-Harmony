import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Typography } from "@material-ui/core";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { getMerchantByID } from "../../../../actions/merchantActions";
import { debounce } from "lodash";
import {
  Button,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import NewButton from "../../../../components/Button/Search";
import ReactTable from "react-table";
import SearchComponent from "../../../../util/searchComponent";
import CheckPermissions from "../../../../util/checkPermission";
import { reloadUrl } from '../../../../util/reload';

import "../Merchants.css";
import "../PendingList/MerchantReqProfile.css";
import "react-table/react-table.css";

class Merchants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      statusValue: -1,
    };
    this.refTable = React.createRef();
  }

  componentDidMount() {
    this.setState({ pageLoading: true });
    const { statusAddMerchant } = this.props;
    if(statusAddMerchant == true){
      this.resetFirstPage();
      this.props.updateStatusAddMerchant(false);
    }
  }

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const { search, statusValue } = this.state;
    const url = `merchant/search?key=${search}&page=${page === 0 ? 1 : page + 1
      }&row=${pageSize}&isDisabled=${statusValue}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };
  handleReset = debounce((e) => {
    this.setState({ statusValue: -1, search: "" });
    this.fetchApi();
  }, 1000);
  handleStatus = debounce((e) => {
    this.setState({ statusValue: e.target.value });
    this.fetchApi();
  }, 1000);

  addMerchant = () => {
    this.props.history.push("/app/merchants/add");
  };
  MerchantProfilePage = (ID) => {
    const path = "/app/merchants/profile/general";
    this.props.getMerchantByID(ID, path);
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      // event.preventDefault();
      this.setState({ loading: true });
      this.fetchApi();
    }
  };

  searchMerchant = debounce((query) => {
    this.fetchApi();
  }, 1000);

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  resetFirstPage = () => {
    this.changePage(0);
    if (this.refTable && this.refTable.current)
      this.refTable.current.onPageChange(0);
    const els = document.getElementsByClassName('-pageJump');
    const inputs = els[0].getElementsByTagName('input');
    inputs[0].value = 1;
    reloadUrl('app/merchants/list');
  }


  render() {
    const { page, statusValue } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const columns = [
      {
        Header: <CustomTableHeader value="ID" />,
        id: "merchantId",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.merchantId}
          </Typography>
        ),
        width: 60,
      },
      {
        Header: <CustomTableHeader value="MID" />,
        id: "mid",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.merchantCode}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="DBA" />,
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
        Header: <CustomTableHeader value="Owner" />,
        accessor: (e) => e?.principals?.[0],
        Cell: (e) => (
          <Typography variant="subtitle1">
            {e?.value ? e.value.firstName + " " + e.value.lastName : null}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Email" />,
        id: "email",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.email}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Store Phone" />,
        id: "phone",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.phone}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Contact Phone" />,
        id: "contactPhone",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.general?.phoneContact}
          </Typography>
        ),
      },
      {
        Header: (
          <div style={{ textAlign: "center" }}>
            <CustomTableHeader value="Status" />
          </div>
        ),
        accessor: "isDisabled",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <Typography variant="subtitle1">
              {e.value === 0 ? "Active" : "Inactive"}
            </Typography>{" "}
          </div>
        ),
        width: 100,
      },
    ];
    const onRowClick = (state, rowInfo) => {
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
          disableBreadcrumb
        />
        <div className="MerList page-heading " style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Tooltip
                title="Must enter correct MID to search by MID"
                aria-label="add"
              >
                <SearchComponent
                  placeholder="Search by ID, MID, DBA, Email"
                  value={this.state.search}
                  onChange={this.handleChange}
                  onKeyPress={this.keyPressed}
                  onClickIcon={this.fetchApi}
                />
              </Tooltip>
              <NewButton style={{ marginLeft: "15px" }} onClick={this.fetchApi}>
                Search
              </NewButton>
            </div>
            <FormControl style={{ width: "20%", marginLeft: "15px" }}>
              <InputLabel>Status</InputLabel>
              <Select onChange={this.handleStatus} value={statusValue}>
                <MenuItem value={-1}>All</MenuItem>
                <MenuItem value={0}>Active</MenuItem>
                <MenuItem value={1}>Inactive</MenuItem>
              </Select>
            </FormControl>
            <div>
              {CheckPermissions("add-new-merchant") && (
                <Button
                  style={{
                    backgroundColor: "#0764B0",
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
          <NewButton style={{ marginTop: "10px" }} onClick={this.handleReset}>
            Reset
          </NewButton>
          <div className="merchant-list-container">
            <ReactTable
              ref={this.refTable}
              manual
              sortable={false}
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchApi(state)}
              defaultPageSize={20}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
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
  apiData: state.fetchApi,
  statusAddMerchant : state.addMerchant.statusAddMerchant,
});
const mapDispatchToProps = (dispatch) => ({
  getMerchantByID: (ID, path) => {
    dispatch(getMerchantByID(ID, path));
  },
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  updateStatusAddMerchant : (payload) => {
    dispatch({ 
      type : 'UPDATE_STATUS_ADD_MERCHANT',
      payload
    })
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
