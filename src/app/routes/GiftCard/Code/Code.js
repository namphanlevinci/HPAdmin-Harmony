import React, { Component } from "react";
import { connect } from "react-redux";
import { GoInfo } from "react-icons/go";
import { Helmet } from "react-helmet";
import { config } from "../../../../url/url";
// import { DebounceInput } from "react-debounce-input";
import { CustomTableHeader } from "../../../../util/CustomText";
import { Grid, Button, Typography, Tooltip, Checkbox } from "@material-ui/core";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import {
  getCodeLog,
  exportGiftCardGeneral,
} from "../../../../actions/giftCardActions";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import ReactTable from "react-table";
import Delete from "../DeleteGeneration";
import moment from "moment";
// import Select from "react-select";
import CodeLog from "../Generation/CodeLog/CodeLog";
import ScaleLoader from "../../../../util/scaleLoader";
import CheckPermissions from "../../../../util/checkPermission";
import SearchComponent from "../../../../util/searchComponent";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "../Generation/generation.styles.scss";
import "react-table/react-table.css";
const URL = config.url.URL;
class Codes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      loading: true,
      open: false,
      serialNumber: "",
      // Pages
      page: 0,
      pageCount: 0,
      data: [],
      // Search
      search: "",
      isLoading: false,
      typeExport: "excel",
      isPhysical: -1,
      isActive: -1,
      isUsed: -1,
    };
  }

  // logs
  handleLogs = (e) => {
    this.setState({ open: true, serialNumber: e?.serialNumber });
    this.props.getCodeLog(e?.giftCardId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;

    const { isPhysical, isActive, isUsed, search } = this.state;

    const url = `${URL}/giftcard/search?keySearch=${search}&isActive=${isActive}&isPhysical=${isPhysical}&isUsed=${isUsed}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  handleSelect = async (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });

    await this.fetchApi();
  };

  handEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.fetchApi();
    }
  };

  handleSearchInput = async (e) => {
    this.setState({ search: e.target.value });
  };

  getExport = (e) => {
    const url = `${URL}/giftcard/search/export/${this.state.typeExport}?keySearch=&isActive=${this.state.isActive}&isPhysical=${this.state.isPhysical}&isUsed=${this.state.isUsed}`;
    this.props.exportGiftCardGeneral(url);
  };

  render() {
    let defaultDate = "2019-12-31T10:53:00.424248+07:00";
    const { page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const columns = [
      {
        Header: <CustomTableHeader value="ID" />,
        accessor: "giftCardId",
        Cell: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e.value}
          </Typography>
        ),
        width: 70,
      },
      {
        Header: <CustomTableHeader value="Serial" />,
        accessor: "serialNumber",
        Cell: (e) => <Typography variant="subtitle1">{e.value}</Typography>,
        width: 200,
      },
      {
        id: "Pincode",
        Header: <CustomTableHeader value="Pin Code" />,
        accessor: "pincode",
        Cell: (e) => <Typography variant="subtitle1">{e.value}</Typography>,
        width: 100,
      },
      {
        Header: <CustomTableHeader value="Created Date" />,
        accessor: "createdDate",
        Cell: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(e.value).format("MM/DD/YYYY")}
          </Typography>
        ),
        width: 160,
      },
      {
        Header: (
          <CustomTableHeader
            styles={{ textAlign: "center" }}
            value="Physical"
          />
        ),
        accessor: "isPhysical",
        Cell: (e) => (
          <div>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#4251af" }}
            />
          </div>
        ),
      },
      {
        id: "Actived",
        Header: (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Actived" />
        ),
        accessor: "isActive",
        Cell: (e) => (
          <div>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#4251af" }}
            />
          </div>
        ),
      },
      {
        id: "Used",
        Header: (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Used" />
        ),
        accessor: "isUsed",
        Cell: (e) => (
          <div>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#4251af" }}
            />
          </div>
        ),
      },
      {
        id: "Time",
        Header: <CustomTableHeader value="Time Used" />,
        accessor: "usedDate",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <p>
              {moment(e.value) > moment(defaultDate)
                ? moment(e.value).format("MM/DD/YYYY")
                : "--"}
            </p>
          </div>
        ),
      },
      {
        id: "actions",
        Header: (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Actions" />
        ),
        Cell: (row) => {
          return (
            <Tooltip title="Info" arrow>
              <div
                style={{
                  color: "#4251af",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <GoInfo
                  size={22}
                  onClick={() => this.handleLogs(row.original)}
                />
              </div>
            </Tooltip>
          );
        },
      },
    ];

    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Code | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.gift-card-codes" />}
        />
        <div className="giftcard">
          <Grid container spacing={3} className="giftCard_search">
            <Grid item xs={12}>
              <SearchComponent
                value={this.state.search}
                onKeyDown={this.handEnter}
                onChange={this.handleSearchInput}
              />
              {/* <form> */}
              {/* <SearchIcon className="button" title="Search" /> */}

              {/* <DebounceInput
                  debounceTimeout={500}
                  type="text"
                  name="search"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onKeyDown={this.handEnter}
                  onChange={this.handleSearchInput}
                /> */}
              {/* </form> */}
            </Grid>

            <Grid item xs={4} style={styles.div}>
              <FormControl style={{ width: "80%" }}>
                <InputLabel>Physical Card</InputLabel>
                <Select
                  value={this.state.isPhysical}
                  onChange={this.handleSelect}
                  name="isPhysical"
                  autoWidth={true}
                >
                  <MenuItem value={0}>False</MenuItem>
                  <MenuItem value={1}>True</MenuItem>
                  <MenuItem value={-1}>Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} style={styles.div}>
              <FormControl style={{ width: "80%" }}>
                <InputLabel>Active</InputLabel>
                <Select
                  value={this.state.isActive}
                  onChange={this.handleSelect}
                  name="isActive"
                  autoWidth={true}
                >
                  <MenuItem value={0}>False</MenuItem>
                  <MenuItem value={1}>True</MenuItem>
                  <MenuItem value={-1}>Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} style={styles.div}>
              <FormControl style={{ width: "80%" }}>
                <InputLabel>Used</InputLabel>
                <Select
                  value={this.state.isUsed}
                  onChange={this.handleSelect}
                  name="isUsed"
                  autoWidth={true}
                >
                  <MenuItem value={0}>False</MenuItem>
                  <MenuItem value={1}>True</MenuItem>
                  <MenuItem value={-1}>Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div className="giftcard_content">
            <CodeLog
              open={this.state.open}
              handleClose={this.handleClose}
              Serial={this.state.serialNumber}
            />
            <Delete
              handleCloseDelete={this._handleCloseDelete}
              open={this.state.openDelete}
              deleteGeneration={this._Delete}
              text={"Template"}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h2 style={styles.h2}>1</h2>

              {CheckPermissions("export-gift-card-code ") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <label style={styles.h4}>Export to:</label>
                  <div
                    style={{
                      width: "100px",
                      zIndex: "9999",
                      marginRight: "10px",
                    }}
                  >
                    <FormControl style={{ width: "100%" }}>
                      <Select
                        value={this.state.typeExport}
                        onChange={(e) => this.setState({ typeExport: e })}
                        autoWidth={true}
                      >
                        <MenuItem value="excel">CSV</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <Button style={styles.btn} onClick={this.getExport}>
                    Export
                  </Button>
                </div>
              )}
            </div>
            <ScaleLoader isLoading={this.state.isLoading} />

            <ReactTable
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
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.fetchApi,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },

  getCodeLog: (CodeId) => {
    dispatch(getCodeLog(CodeId));
  },

  exportGiftCardGeneral: (url) => {
    dispatch(exportGiftCardGeneral(url));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Codes);

const styles = {
  label: {
    fontSize: "16px",
    padding: "15px 0px 3px 5px",
  },
  h2: {
    color: "white",
    paddingBottom: "20px",
  },
  div: {
    zIndex: "99999",
  },
  h4: {
    margin: "5px 10px 0px 0px",
  },
  btn: {
    padding: "7px 25px",
    backgroundColor: "white",
    color: "#4251af",
  },
};
