import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_GIFT_CARD_BY_ID,
  GET_GIFT_CARD_CODE_LOG_BY_ID,
} from "../../../../actions/gift-card/actions";
import { GoInfo } from "react-icons/go";
import { store } from "react-notifications-component";
import { config } from "../../../../url/url";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import SearchIcon from "@material-ui/icons/Search";
import CodeLog from "./code-log/code-log";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import Delete from "../delete-generation";
import Select from "react-select";
import ScaleLoader from "../../../../util/scaleLoader";
import CheckPermissions from "../../../../util/checkPermission";

import "./generation.styles.scss";
import "react-table/react-table.css";
import "react-notifications-component/dist/theme.css";

const URL = config.url.URL;

class Generation_Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      search: "",
      open: false,
      serialNumber: "",
      loading: false,
      deleteID: "",
      openDelete: false,
      loadingData: false,
      typeExport: { value: "excel", label: "Excel" },
      isLoading: false,
    };
  }

  componentDidMount() {
    const ID = this.props.Detail;
    this.setState({ deleteID: ID, loadingData: true });
    this.getGiftCardById(ID);
  }

  // logs
  handleLogs = (Data) => {
    this.setState({ open: true, serialNumber: Data?.serialNumber });
    this.props.getCodeLog(Data?.giftCardId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getGiftCardById(ID) {
    this.props.getGenerationCode(ID);
  }

  handleGenerate = () => {
    const giftCardGeneralId = this.props.Detail;
    const quantity = this.state.quantity;
    if (quantity === 0) {
      store.addNotification({
        title: "WARNING!",
        message: "Please enter the Quantity!",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true,
        },
        width: 250,
      });
    } else {
      this.setState({ loading: true });
      axios
        .post(
          URL + "/giftcardgeneral/general",
          { giftCardGeneralId, quantity },
          {
            headers: {
              Authorization: `Bearer ${this.props.userLogin.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Success") {
            this.setState({ quantity: 0, loading: false, search: "" });
            store.addNotification({
              title: "Success!",
              message: `${res.data.message}`,
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 3500,
                onScreen: true,
              },
              width: 250,
            });
            this.fetchData();
            this.getGiftCardById(this.state.deleteID);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // Delete
  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  fetchData = async (state) => {
    const ID = this.props.Detail;
    const page = state?.page ? state?.page : 0;
    const pageSize = state?.pageSize ? state?.pageSize : 10;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/giftcard/getByGeneral/${ID}?keySearch=${this.state.search}&page=${
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
          this.setState({
            data: [],
          });
        }

        this.setState({ loading: false });
      });
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchData();
    }
  };

  Delete = () => {
    const deleteID = this.state.deleteID;
    axios
      .put(URL + "/giftcardgeneral/disabled/" + deleteID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          store.addNotification({
            title: "Success!",
            message: `${res.data.message}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
            width: 250,
          });
          this.setState({ openDelete: false });
          setTimeout(() => {
            this.props.history.push("/app/giftcard/generation");
          }, 1100);
        }
      })
      .catch((error) => console.log(error));
  };

  getExport = () => {
    this.setState({ isLoading: true });
    const ID = this.props.Detail?.giftCardGeneralId;
    axios
      .get(
        URL +
          `/giftcard/getByGeneral/export/${ID}?keySearch=${this.state.search}&type=${this.state.typeExport.value}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.userLogin.token}`,
          },
        }
      )
      .then((res) => {
        if (Number(res.data.codeNumber) === 400 || res.data.data === null) {
          store.addNotification({
            title: "ERROR!",
            message: `${res.data.message}`,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });
          this.setState({ isLoading: false });
        } else {
          setTimeout(() => {
            window.open(res.data.data.path);
            this.setState({ isLoading: false });
          }, 1000);
        }
      });
  };

  render() {
    let defaultDate = "2019-12-31T10:53:00.424248+07:00";
    const Detail = this.props.GenerationByID;
    const { page, pageCount, data } = this.state;

    const columns = [
      {
        Header: "ID",
        accessor: "giftCardId",
        Cell: (e) => (
          <div style={{ fontWeight: "500" }}>
            <p>{e.value}</p>
          </div>
        ),
        width: 70,
      },
      {
        Header: "Serial",
        accessor: "serialNumber",
        Cell: (e) => <p style={{ fontWeight: "400" }}>{e.value}</p>,
        width: 200,
      },
      {
        id: "Pincode",
        Header: "Pin Code",
        accessor: "pincode",
        Cell: (e) => <p style={{ fontWeight: "400" }}>{e.value}</p>,
        width: 100,
      },
      {
        Header: "Created Date",
        accessor: "createdDate",
        Cell: (e) => <p>{moment(e.value).format("MM/DD/YYYY")}</p>,
        width: 160,
      },
      {
        Header: () => <div style={{ textAlign: "center" }}>Physical</div>,
        accessor: "isPhysical",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#4251af" }}
            />
          </div>
        ),
      },
      {
        id: "Activated",
        Header: () => <div style={{ textAlign: "center" }}>Activated</div>,
        accessor: "isActive",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#4251af" }}
            />
          </div>
        ),
      },
      {
        id: "Used",
        Header: () => <div style={{ textAlign: "center" }}>Used</div>,
        accessor: "isUsed",
        Cell: (e) => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#4251af" }}
            />
          </div>
        ),
      },
      {
        id: "Time",
        Header: "Time Used",
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
        Header: () => <div style={{ textAlign: "center" }}>Actions</div>,
        Cell: (row) => {
          return (
            <Tooltip title="Info" arrow>
              <div style={{ color: "#4251af", textAlign: "center" }}>
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
    const typeExport = [
      { value: "excel", label: "Excel" },
      // { value: "pdf", label: "Pdf" },
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
              <Button
                className="btn btn-red"
                onClick={() => this.setState({ openDelete: true })}
              >
                DELETE
              </Button>
            </div>
          </div>
          <div className="information container-fluid">
            <h3 className="title">General Information</h3>
            <div className="row">
              <div className="col-4">
                <label>Gift Card Name</label>
                <p>{Detail?.name}</p>
              </div>
              <div className="col-4">
                <label>Value</label>
                <p>$ {Detail?.amount}</p>
              </div>
              <div className="col-4">
                <label>Date Created</label>
                <p>{moment(Detail?.createdDate).format("MM/DD/YYYY")}</p>
              </div>
              <div className="col-4">
                <label>Unused Gift Codes</label>
                <p>{Detail?.unUsed}</p>
              </div>
              <div className="col-4">
                <label>Gift Card Quantity*</label>
                <p>{Detail?.quantity}</p>
              </div>
              <div className="col-4">
                <label>Template</label>
                <p style={{ color: "#4251af" }}>
                  {Detail?.giftCardTemplateName}
                </p>
              </div>

              {CheckPermissions(39) && (
                <div className="col-12">
                  <h3 className="title">Add Gift Codes</h3>
                  <label>Quantity*</label> <br />
                  <input
                    type="number"
                    name="amount"
                    className="add-codes"
                    onChange={(e) =>
                      this.setState({ quantity: e.target.value })
                    }
                    style={{ width: "20%" }}
                    value={this.state.quantity}
                  />
                  <br />
                  <Button
                    className="btn btn-red"
                    style={{ marginTop: "10px" }}
                    onClick={this.handleGenerate}
                  >
                    Generate
                  </Button>
                </div>
              )}
            </div>
            <div style={{ zIndex: "9999" }}>
              <ScaleLoader isLoading={this.state.isLoading} />
            </div>
            <div className="giftcard_content">
              <h3 className="title">Gift Card Codes</h3>
              <div className="giftCard_search" style={{ marginBottom: "20px" }}>
                <form>
                  <SearchIcon
                    className="button"
                    title="Search"
                    style={{ marginTop: "4px" }}
                  />
                  <input
                    type="text"
                    className="textBox"
                    placeholder="Search by ID, Serial, Pin Code"
                    style={{ paddingTop: "6px" }}
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                    onKeyPress={this.keyPressed}
                  />
                </form>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
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
                    <Select
                      value={this.state.typeExport}
                      options={typeExport}
                      onChange={(e) => this.setState({ typeExport: e })}
                    />
                  </div>
                  <Button style={styles.btn} onClick={this.getExport}>
                    Export
                  </Button>
                </div>
              </div>

              <Delete
                handleCloseDelete={this.handleCloseDelete}
                open={this.state.openDelete}
                deleteGeneration={this.Delete}
                text={"Gift Card"}
              />
              <CodeLog
                open={this.state.open}
                handleClose={this.handleClose}
                Serial={this.state.serialNumber}
              />
              {this.state.loadingData && (
                <ReactTable
                  manual
                  page={page}
                  pages={pageCount}
                  data={data}
                  onPageChange={(pageIndex) => this.changePage(pageIndex)}
                  onFetchData={(state) => this.fetchData(state)}
                  minRows={1}
                  noDataText="NO DATA!"
                  loading={this.state.loading}
                  columns={columns}
                  defaultPageSize={10}
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
  userLogin: state.userReducer.User,
  Detail: state.GiftCardReducer.detail,
  GenerationByID: state.GiftCardReducer.GenerationByID,
});

const mapDispatchToProps = (dispatch) => ({
  getGenerationCode: (ID) => {
    dispatch(GET_GIFT_CARD_BY_ID(ID));
  },
  getCodeLog: (ID) => {
    dispatch(GET_GIFT_CARD_CODE_LOG_BY_ID(ID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation_Detail);

const styles = {
  label: {
    fontSize: "16px",
    padding: "15px 0px 3px 5px",
  },
  h2: {
    color: "#4251af",
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
  },
};
