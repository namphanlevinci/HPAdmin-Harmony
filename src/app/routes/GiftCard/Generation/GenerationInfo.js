import React, { Component } from "react";
import { connect } from "react-redux";
import { GoInfo } from "react-icons/go";
import { addGiftCardGeneral } from "../../../../actions/giftCardActions";
import {
  CustomTextLabel,
  CustomTableHeader,
  CustomTitle,
  CustomText,
} from "../../../../util/CustomText";
import { Grid, Button, Typography, TextField } from "@material-ui/core";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import {
  getGiftCardGeneral,
  exportGiftCardGeneral,
  getCodeLog,
} from "../../../../actions/giftCardActions";
import { debounce } from "lodash";

import SearchComponent from "../../../../util/searchComponent";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import ReactTable from "react-table";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import CodeLog from "./CodeLog/CodeLog";
import Tooltip from "@material-ui/core/Tooltip";
import ScaleLoader from "../../../../util/scaleLoader";
import CheckPermissions from "../../../../util/checkPermission";
import InputCustom from "../../../../util/CustomInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./generation.styles.scss";
import "react-table/react-table.css";
import "react-notifications-component/dist/theme.css";

class Generation_Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "",
      search: "",
      open: false,
      serialNumber: "",
      loading: false,
      deleteID: "",
      openDelete: false,
      loadingData: false,
      typeExport: "excel",
      isLoading: false,

      //
      quantityError: false,
      errorMessage: "",
    };
  }

  handleLogs = (e) => {
    this.setState({ open: true, serialNumber: e?.serialNumber });
    this.props.getCodeLog(e?.giftCardId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleGenerate = () => {
    const { giftCardGeneralId } = this.props.giftCardGeneral;
    const quantity = this.state.quantity;

    if (Number(quantity) === 0) {
      this.setState({
        quantityError: true,
        errorMessage: "Please enter a valid quantity",
      });
    } else {
      this.props.addGiftCardGeneral(giftCardGeneralId, quantity);
      this.setState({
        quantity: 0,
        search: "",
        quantityError: false,
        errorMessage: "",
      });

      // ADD XONG CH??A C???P NH???T L???I CODE
      // setTimeout(() => {
      //   this.fetchApi();
      // }, 1000);
    }
  };

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const { giftCardGeneralId } = this.props.giftCardGeneral;

    const url = `giftcard/getByGeneral/${giftCardGeneralId}?keySearch=${
      this.state.search
    }&page=${page === 0 ? 1 : page + 1}&row=${pageSize}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchApi();
    }
  };

  searchCode = debounce((query) => {
    this.fetchApi();
  }, 1000);

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  getExport = () => {
    const { giftCardGeneralId } = this.props.giftCardGeneral;
    const url = `giftcard/getByGeneral/export/${giftCardGeneralId}?keySearch=${this.state.search}&type=${this.state.typeExport}`;
    this.props.exportGiftCardGeneral(url);
  };

  handleQuantity = (e) => {
    this.setState({ quantity: e.target.value });
  };

  render() {
    let defaultDate = "2019-12-31T10:53:00.424248+07:00";
    const Detail = this.props.giftCardGeneral;
    const { page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;
    const { loading: exportLoading } = this.props.exportGeneral;
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
        Header: () => (
          <CustomTableHeader
            styles={{ textAlign: "center" }}
            value="Physical"
          />
        ),
        accessor: "isPhysical",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#0764B0" }}
            />
          </div>
        ),
      },
      {
        id: "Activated",
        Header: (
          <CustomTableHeader
            styles={{ textAlign: "center" }}
            value="Activated"
          />
        ),
        accessor: "isActive",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#0764B0" }}
            />
          </div>
        ),
      },
      {
        id: "Used",
        Header: () => (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Used" />
        ),
        accessor: "isUsed",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#0764B0" }}
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
            {moment(e.value) > moment(defaultDate)
              ? moment(e.value).format("MM/DD/YYYY")
              : "--"}
          </div>
        ),
      },
      {
        id: "actions",
        Header: () => (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Actions" />
        ),
        Cell: (row) => {
          return (
            <Tooltip title="Info" arrow>
              <div style={{ color: "#0764B0", textAlign: "center" }}>
                <GoInfo
                  size={22}
                  onClick={() => this.handleLogs(row.original)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </Tooltip>
          );
        },
      },
    ];
    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.generation-detail" />}
        />
        <div className="giftcard">
          <div className="id-and-btn">
            <h3>{`HP${Detail?.giftCardGeneralId}`}</h3>
            <div>
              <Button
                className="btn btn-green"
                onClick={() =>
                  this.props.history.push("/app/giftcard/generation")
                }
              >
                BACK
              </Button>
            </div>
          </div>
          <Grid container spacing={3} className="information container-fluid">
            <Grid item xs={12}>
              <CustomTitle value="General Information" />
            </Grid>

            <Grid item xs={4}>
              <CustomTextLabel value="Gift Card Name" />
              <CustomText value={Detail?.name} />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="Value" />
              <CustomText value={`$ ${Detail?.amount}`} />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="Date Created" />
              <CustomText
                value={moment(Detail?.createdDate).format("MM/DD/YYYY")}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="Unused Gift Codes" />
              <CustomText value={Detail?.unUsed} />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="Gift Card Quantity*" />
              <CustomText value={Detail?.quantity} />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="Template" />
              <CustomText
                value={Detail?.giftCardTemplateName}
                styles={{ color: "#0764B0" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTitle value="Add Gift Codes" />

              <TextField
                InputLabelProps={{ shrink: true }}
                label="Quantity*"
                value={this.state.quantity}
                onChange={this.handleQuantity}
                name="amount"
                InputProps={{
                  inputComponent: InputCustom,
                }}
                inputProps={{
                  numericOnly: true,
                }}
                style={{ width: "15%" }}
                error={this.state.quantityError}
                helperText={this.state.errorMessage}
              />

              <br />
              <Button
                className="btn btn-red"
                style={{ marginTop: "10px" }}
                onClick={this.handleGenerate}
              >
                Generate
              </Button>
            </Grid>

            <Grid item xs={12} style={{ zIndex: "9999" }}>
              <ScaleLoader isLoading={exportLoading} />
            </Grid>
            <Grid item xs={12}>
              <CustomTitle value="Gift Card Codes" />
            </Grid>
            <Grid item xs={12} className="giftCard_search">
              <SearchComponent
                value={this.state.search}
                onChange={this.handleChange}
                onKeyPress={this.keyPressed}
                onClickIcon={this.fetchApi}
                placeholder="Search by ID, Serial, Pin Code"
              />

              {CheckPermissions("export-generation") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label style={styles.h4}>Export to:</label>
                  <div
                    style={{
                      width: "120px",
                      zIndex: "9999",
                      marginRight: "10px",
                    }}
                  >
                    <FormControl style={{ width: "100%" }}>
                      <Select
                        value={this.state.typeExport}
                        onChange={(e) => this.setState({ typeExport: e })}
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
            </Grid>

            <CodeLog
              open={this.state.open}
              handleClose={this.handleClose}
              Serial={this.state.serialNumber}
            />
            <Grid item xs={12}>
              <ReactTable
                manual
                page={page}
                pages={pageCount}
                data={data}
                row={pageSize}
                onPageChange={(pageIndex) => this.changePage(pageIndex)}
                onFetchData={(state) => this.fetchApi(state)}
                minRows={1}
                noDataText="NO DATA!"
                loading={loading}
                columns={columns}
                defaultPageSize={10}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.fetchApi,
  giftCardGeneral: state.getGiftCardGeneral.data,
  exportGeneral: state.exportGiftCardGeneral,
});

const mapDispatchToProps = (dispatch) => ({
  addGiftCardGeneral: (giftCardGeneralId, quantity) => {
    dispatch(addGiftCardGeneral(giftCardGeneralId, quantity));
  },
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  getGiftCardGeneral: (ID, path) => {
    dispatch(getGiftCardGeneral(ID, path));
  },
  exportGiftCardGeneral: (url) => {
    dispatch(exportGiftCardGeneral(url));
  },
  getCodeLog: (CodeId) => {
    dispatch(getCodeLog(CodeId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation_Detail);

const styles = {
  label: {
    fontSize: "16px",
    padding: "15px 0px 3px 5px",
  },
  h2: {
    color: "#0764B0",
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
    color: "#0764B0",
  },
};
