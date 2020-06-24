import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_TEMPLATE,
  VIEW_DETAIL,
} from "../../../../actions/gift-card/actions";
import { GoInfo } from "react-icons/go";
import { GET_GIFTCARD_CODE_LOG_BY_ID } from "../../../../actions/gift-card/actions";
import { store } from "react-notifications-component";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "../delete-generation";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import URL from "../../../../url/url";
import moment from "moment";
import Select from "react-select";
import CodeLog from "../generation/code_log";

import "../generation/generation.styles.scss";
import "react-table/react-table.css";

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
      isActive: 1,
      isPhysical: -1,
      isUsed: -1,
    };
  }

  // logs
  _handleLogs = (Data) => {
    this.setState({ open: true, serialNumber: Data?.serialNumber });
    this.props.getCodeLog(Data?.giftCardId);
  };

  _handleClose = () => {
    this.setState({ open: false });
  };

  handleSearch = () => {
    const { search, isActive, isPhysical, isUsed, page } = this.state;
    this.setState({ loading: true });
    axios
      .get(
        URL +
          `/giftcard/search?keySearch=${search}&isActive=${isActive}&isPhysical=${isPhysical}&isUsed=${isUsed}&page=1&row=10`,
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
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
          });
        } else {
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
          this.setState({ loading: false });
        }
      });
  };

  fetchData = async (state) => {
    const { page, pageSize } = state;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/giftcard/search?keySearch=&isActive=0&isPhysical=-1&isUsed=-1&page=${
            page === 0 ? 1 : page + 1
          }&row=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        this.setState({
          page,
          pageCount: res.data.pages,
          data: data,
          loading: false,
        });
      });
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  handleChange = (name) => (value) => {
    this.setState({
      [name]: value.value,
    });
  };

  render() {
    let defaultDate = "2019-12-31T10:53:00.424248+07:00";
    const { page, pageCount, data } = this.state;

    const columns = [
      {
        Header: "ID",
        accessor: "giftCardId",
        Cell: (e) => (
          <div style={{ fontWeight: "600", textAlign: "center" }}>
            {e.value}
          </div>
        ),
        width: 70,
      },
      {
        Header: "Serial",
        accessor: "serialNumber",
        Cell: (e) => <span style={{ fontWeight: "600" }}>{e.value}</span>,
        width: 200,
      },
      {
        id: "Pincode",
        Header: "Pincode",
        accessor: "pincode",
        Cell: (e) => (
          <span style={{ fontWeight: "600", textAlign: "center" }}>
            {e.value}
          </span>
        ),
        width: 100,
      },
      {
        Header: "Created Date",
        accessor: "createdDate",
        Cell: (e) => moment(e.value).format("MM/DD/YYYY"),
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
        id: "Actived",
        Header: () => <div style={{ textAlign: "center" }}>Actived</div>,
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
                  onClick={() => this._handleLogs(row.original)}
                />
              </div>
            </Tooltip>
          );
        },
      },
    ];

    const isPhysical = [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ];

    const isActive = [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ];

    const isUsed = [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ];
    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.giftcard-template" />}
        />
        <div className="giftcard">
          <div className="giftcard_search">
            <div>
              <form>
                <SearchIcon className="button" title="Search" />
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search"
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
              </form>
            </div>
            <Button className="btn btn-green" onClick={this.handleSearch}>
              Search
            </Button>
          </div>
          <div className="row">
            <div className="col-4">
              <label style={styles.label}>Physical Card</label>
              <Select
                // value={this.state.isPhysical}
                onChange={(e) => this.setState({ isPhysical: e.value })}
                name="isPhysical"
                options={isPhysical}
              />
            </div>
            <div className="col-4">
              <label style={styles.label}>Active</label>
              <Select
                // value={this.state.isActive}
                onChange={this.handleChange("isActive")}
                name="isActive"
                options={isActive}
              />
            </div>
            <div className="col-4">
              <label style={styles.label}>Used</label>
              <Select
                // value={this.state.isUsed}
                onChange={this.handleChange("isUsed")}
                name="isUsed"
                options={isUsed}
              />
            </div>
          </div>
          <div className="giftcard_content">
            <CodeLog
              open={this.state.open}
              handleClose={this._handleClose}
              Serial={this.state.serialNumber}
            />
            <Delete
              handleCloseDelete={this._handleCloseDelete}
              open={this.state.openDelete}
              deleteGeneration={this._Delete}
              text={"Template"}
            />
            <ReactTable
              manual
              page={page}
              pages={pageCount}
              data={data}
              // You should also control this...
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchData(state)}
              defaultPageSize={10}
              minRows={0}
              noDataText="NO DATA!"
              loading={this.state.loading}
              columns={columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Template: state.GiftCardData.template,
  InfoUser_Login: state.User,
});

const mapDispatchToProps = (dispatch) => ({
  GET_TEMPLATE: () => {
    dispatch(GET_TEMPLATE());
  },
  VIEW_DETAIL: (payload) => {
    dispatch(VIEW_DETAIL(payload));
  },
  getCodeLog: (ID) => {
    dispatch(GET_GIFTCARD_CODE_LOG_BY_ID(ID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Codes);

const styles = {
  label: {
    fontSize: "16px",
    padding: "15px 0px 3px 5px",
  },
};
