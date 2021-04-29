import React from "react";
import { connect } from "react-redux";
import { getConsumerByID } from "../../../actions/consumerActions";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../util/CustomText";
import {
  Typography,
  Checkbox,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { fetchApiByPage } from "../../../actions/fetchApiActions";
import { debounce } from "lodash";

import NewButton from "../../../components/Button/Search";
import ResetButton from "../../../components/Button/Reset";
import IntlMessages from "../../../util/IntlMessages";
import CustomProgress from "../../../util/CustomProgress";
import ContainerHeader from "../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchComponent from "../../../util/searchComponent";
import moment from "moment";

import "../Merchants/Merchants.css";
import "./ConsumerProfile/Detail/Consumer.css";
import "react-table/react-table.css";
// import "../Reports/Transactions/Transactions.css";

class Consumers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      // Pages
      page: 0,
      pageCount: 0,
      data: [],
      isVerify: -1,
      sortValue: "",
      sortType: "desc",
    };
  }

  fetchApi = async (state) => {
    const sortType = state?.sorted?.[0]?.desc ? "desc" : "asc";
    const sortValue = state?.sorted?.[0]?.id ? state?.sorted[0]?.id : "";

    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;

    const { search, isVerify } = this.state;

    const url = `user/?key=${search}&isVerify=${isVerify}&sortValue=${sortValue}&sortType=${sortType}&page=${page === 0 ? 1 : page + 1
      }&row=${pageSize}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };
  handleReset = debounce((query) => {
    this.setState({ search: "", isVerify: -1 });
    this.fetchApi();
  }, 1000);
  searchCustomer = debounce((query) => {
    this.fetchApi();
  }, 1000);

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  keyPressed = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchApi();
    }
  };

  handleSelect = (e) => {
    this.setState({ isVerify: e.target.value });
    this.searchCustomer();
  };

  render() {
    const { page } = this.state;
    const {
      data,
      loading,
      pageSize,
      pageCount,
      totalRow,
      summary,
    } = this.props.apiData;
    const { loading: loadingConsumer } = this.props.consumerById;

    const columns = [
      {
        Header: <CustomTableHeader value="Harmony ID" />,
        id: "accountId",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.accountId}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            Total Rows: {totalRow}
          </Typography>
        ),
        width: 180,
      },
      {
        Header: <CustomTableHeader value=" First Name" />,
        id: "firstName",
        accessor: (row) => (
          <Typography variant="subtitle1">{row?.firstName}</Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Last Name" />,
        id: "lastName",
        accessor: (row) => (
          <Typography variant="subtitle1">{row?.lastName}</Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Phone number" />,
        id: "phone",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.phone}
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
        Header: (
          <CustomTableHeader value="Balance" styles={{ textAlign: "center" }} />
        ),
        id: "credit",
        accessor: (e) => e.credit,
        Cell: (e) => (
          <Typography
            variant="subtitle1"
            className="table__light"
            style={{ textAlign: "center" }}
          >
            ${e.value}
          </Typography>
        ),
        Footer: (
          <Typography
            variant="subtitle1"
            className="table__light"
            style={{ textAlign: "center" }}
          >
            ${summary?.credit}
          </Typography>
        ),
      },
      {
        id: "totalAmount",
        Header: <CustomTableHeader value="Money spent/Daily" />,
        accessor: (e) => Number(e.totalAmount).toFixed(2),
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: (e) => (
          <Typography
            style={{ textAlign: "center" }}
            variant="subtitle1"
            className={Number(e.value) > 10000 ? "BIG" : ""}
          >
            ${e.value}
          </Typography>
        ),
        Footer: (
          <Typography
            variant="subtitle1"
            className="table__light"
            style={{ textAlign: "center" }}
          >
            ${summary?.totalAmount}
          </Typography>
        ),
      },
      {
        id: "isVerified",
        Header: (
          <CustomTableHeader value="Verify" styles={{ textAlign: "center" }} />
        ),
        accessor: (e) => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e?.isVerified === 1}
              style={{ color: "#0764B0", paddingTop: 0 }}
            />
          </div>
        ),
      },
      {
        id: "lastActivity",
        Header: <CustomTableHeader value="Last Active" />,
        accessor: (e) => {
          return (
            <Typography
              variant="subtitle1"
              className={Number(e.value) > 10000 ? "BIG" : ""}
            >
              {e?.lastActivity && moment(e?.lastActivity).format("MM/DD/YYYY hh:mm A")}
            </Typography>
          )
        },
        width: 180,
      },
      {
        accessor: "stateName",
        show: false,
      },
      {
        accessor: "isDisabled",
        show: false,
      },
    ];

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            const path = "/app/consumers/profile/general";
            this.props.getConsumerByID(rowInfo.row._original.userId, path);
          }
        },
      };
    };
    return (
      <>
        <div className="container-fluid">
          {loadingConsumer && <CustomProgress />}
          <Helmet>
            <title>Consumer | Harmony Admin</title>
          </Helmet>
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.consumers" />}
          />
          <div className="MerList page-heading" style={{ padding: "10px" }}>
            <div style={styles.div}>
              {/* SEARCH */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <SearchComponent
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

              <FormControl style={styles.select}>
                <InputLabel>Is Verify</InputLabel>
                <Select
                  onChange={this.handleSelect}
                  value={this.state.isVerify}
                >
                  <MenuItem value="-1">All</MenuItem>
                  <MenuItem value="1">True</MenuItem>
                  <MenuItem value="0">False</MenuItem>
                </Select>
              </FormControl>
            </div>
            <ResetButton style={{ marginTop: "10px" }} onClick={this.handleReset}>
              Reset filter
            </ResetButton>
            <div className="merchant-list-container">
              <ReactTable
                manual={true}
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerList: state.getConsumerUsers,
  apiData: state.fetchApi,
  consumerById: state.consumerById,
});
const mapDispatchToProps = (dispatch) => ({
  getConsumerByID: (ID, path) => {
    dispatch(getConsumerByID(ID, path));
  },
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Consumers);

const styles = {
  div: {
    display: "flex",
    justifyContent: "space-between",
  },
  select: {
    width: "20%",
  },
};
