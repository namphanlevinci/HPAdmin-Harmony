import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_GIFTCARD_BY_ID,
  GET_GIFTCARD_CODE_LOG_BY_ID
} from "../../../../actions/gift-card/actions";
import { GoInfo } from "react-icons/go";
import { store } from "react-notifications-component";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import SearchIcon from "@material-ui/icons/Search";
import CodeLog from "./code_log";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import URL from "../../../../url/url";
import Delete from "../delete-generation";

import "./generation.styles.scss";
import "react-table/react-table.css";
import "react-notifications-component/dist/theme.css";

class Generation_Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: null,
      search: "",
      open: false,
      serialNumber: "",
      loading: false,
      deleteID: "",
      openDelete: false
    };
  }

  componentDidMount() {
    const ID = this.props.Detail?.giftCardGeneralId;
    this.props.getGenerationCode(ID);
    this.setState({ deleteID: ID });
  }

  // logs
  _handleLogs = Data => {
    this.setState({ open: true, serialNumber: Data?.serialNumber });
    this.props.getCodeLog(Data?.giftCardId);
  };

  _handleClose = () => {
    this.setState({ open: false });
  };

  handleGenerate = () => {
    const giftCardGeneralId = this.props.Detail?.giftCardGeneralId;
    const { quantity } = this.state;
    this.setState({ loading: true });
    axios
      .post(
        URL + "/giftcardgeneral/general",
        { giftCardGeneralId, quantity },
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
          }
        }
      )
      .then(res => {
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
              duration: 2500,
              onScreen: true
            },
            width: 250
          });
          this.props.getGenerationCode(giftCardGeneralId);
          this.setState({ loading: false, quantity: "" });
        }
      })
      .catch(error => console.log(error));
  };

  // Delete
  _handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  _Delete = () => {
    const deleteID = this.state.deleteID;
    axios
      .put(URL + "/giftcardgeneral/disabled/" + deleteID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
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
              duration: 1000,
              onScreen: true
            },
            width: 250
          });
          this.setState({ openDelete: false });
          setTimeout(() => {
            this.props.history.push("/app/giftcard/generation");
          }, 1100);
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    let defaultDate = "2019-12-31T10:53:00.424248+07:00";
    const Detail = this.props.Detail;
    let GenerationCode = this.props.GenerationCode;

    if (GenerationCode) {
      if (this.state.search) {
        GenerationCode = GenerationCode.filter(e => {
          if (e !== null) {
            return (
              e?.serialNumber
                .trim()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              e?.pincode
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              parseInt(e?.giftCardId) === parseInt(this.state.search)
            );
          }
          return null;
        });
      }
    }

    const columns = [
      {
        Header: "ID",
        accessor: "giftCardId",
        Cell: e => (
          <div style={{ fontWeight: "600", textAlign: "center" }}>
            {e.value}
          </div>
        ),
        width: 70
      },
      {
        Header: "Serial",
        accessor: "serialNumber",
        Cell: e => <span style={{ fontWeight: "600" }}>{e.value}</span>,
        width: 200
      },
      {
        id: "Pincode",
        Header: "Pincode",
        accessor: "pincode",
        Cell: e => (
          <span style={{ fontWeight: "600", textAlign: "center" }}>
            {e.value}
          </span>
        ),
        width: 100
      },
      {
        Header: "Created Date",
        accessor: "createdDate",
        Cell: e => moment(e.value).format("MM/DD/YYYY"),
        width: 160
      },
      {
        Header: () => <div style={{ textAlign: "center" }}>Physical</div>,
        accessor: "isPhysical",
        Cell: e => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#0764b0" }}
            />
          </div>
        )
      },
      {
        id: "Actived",
        Header: () => <div style={{ textAlign: "center" }}>Actived</div>,
        accessor: "isActive",
        Cell: e => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#0764b0" }}
            />
          </div>
        )
      },
      {
        id: "Used",
        Header: () => <div style={{ textAlign: "center" }}>Used</div>,
        accessor: "isUsed",
        Cell: e => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.value === 1 ? true : false}
              style={{ color: "#0764b0" }}
            />
          </div>
        )
      },
      {
        id: "Time",
        Header: "Time Used",
        accessor: "usedDate",
        Cell: e => (
          <div style={{ textAlign: "center" }}>
            {moment(e.value) > moment(defaultDate)
              ? moment(e.value).format("MM/DD/YYYY")
              : "--"}
          </div>
        )
      },
      {
        id: "actions",
        Header: () => <div style={{ textAlign: "center" }}>Actions</div>,
        Cell: row => {
          return (
            <Tooltip title="Info" arrow>
              <div style={{ color: "#0764b0", textAlign: "center" }}>
                <GoInfo
                  size={22}
                  onClick={() => this._handleLogs(row.original)}
                />
              </div>
            </Tooltip>
          );
        }
      }
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
                onClick={() =>
                  this.props.history.push("/app/giftcard/generation")
                }
              >
                BACK
              </Button>
              <Button
                className="btn-red"
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
                <h4>Gift Card Name</h4>
                <p>{Detail?.name}</p>
              </div>
              <div className="col-4">
                <h4>Value</h4>
                <p>$ {Detail?.amount}</p>
              </div>
              <div className="col-4">
                <h4>Date Created</h4>
                <p>{moment(Detail?.createdDate).format("MM/DD/YYYY")}</p>
              </div>
              <div className="col-4">
                <h4>Unused Gift Codes</h4>
                <p>{Detail?.unUsed}</p>
              </div>
              <div className="col-4">
                <h4>Gift Card Quantity</h4>
                <p>{Detail?.quantity}</p>
              </div>
              <div className="col-4">
                <h4>Template</h4>
                <p>{Detail?.giftCardTemplateName}</p>
              </div>
              <div className="col-12">
                <h3 className="title">Add Gift Codes</h3>
                <h4>Quantity*</h4>
                <input
                  type="number"
                  name="amount"
                  className="add-codes"
                  onChange={e => this.setState({ quantity: e.target.value })}
                  style={{ width: "20%" }}
                />
                <br />
                <Button
                  className="generation-btn"
                  onClick={this.handleGenerate}
                >
                  Generate
                </Button>
              </div>
            </div>
            <div className="giftcard_content">
              <div className="giftcard_search" style={{ marginBottom: "20px" }}>
                <form>
                  <SearchIcon
                    className="button"
                    title="Search"
                    style={{ marginTop: "4px" }}
                  />
                  <input
                    type="text"
                    className="textbox"
                    placeholder="Search by ID, Serial, Pincode"
                    style={{ paddingTop: "6px" }}
                    value={this.state.search}
                    onChange={e => this.setState({ search: e.target.value })}
                  />
                </form>
                <h4>Export To </h4>
              </div>
              <Delete
                handleCloseDelete={this._handleCloseDelete}
                open={this.state.openDelete}
                deleteGeneration={this._Delete}
                text={"Gift Card"}
              />
              <CodeLog
                open={this.state.open}
                handleClose={this._handleClose}
                Serial={this.state.serialNumber}
              />
              <ReactTable
                data={GenerationCode}
                columns={columns}
                defaultPageSize={10}
                minRows={0}
                // getTdProps={onRowClick}
                noDataText="NO DATA!"
                loading={this.state.loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  Detail: state.GiftCardData.detail,
  GenerationCode: state.GiftCardData.generation_code
});

const mapDispatchToProps = dispatch => ({
  getGenerationCode: ID => {
    dispatch(GET_GIFTCARD_BY_ID(ID));
  },
  getCodeLog: ID => {
    dispatch(GET_GIFTCARD_CODE_LOG_BY_ID(ID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation_Detail);
