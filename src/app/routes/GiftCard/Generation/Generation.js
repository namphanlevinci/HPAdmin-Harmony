import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../../util/CustomText";
import { Typography, Button } from "@material-ui/core";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { getGiftCardGeneral } from "../../../../actions/giftCardActions";

import EditSVG from "../../../../assets/images/edit.svg";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import CheckPermissions from "../../../../util/checkPermission";

import "./generation.styles.scss";
import "react-table/react-table.css";
const URL = config.url.URL;
class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      deleteID: "",
      loading: false,
      search: "",
    };
  }

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  handleOpenDelete = (ID) => {
    this.setState({ openDelete: true, deleteID: ID });
  };

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;

    const url = `${URL}/giftcardgeneral?keySearch=${this.state.search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;

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
      this.setState({ loading: true });
      this.fetchData();
    }
  };

  viewGeneration = (giftCardGeneralId) => {
    const path = "/app/giftcard/generation/detail";
    this.props.getGiftCardGeneral(giftCardGeneralId, path);
  };

  render() {
    const { page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const columns = [
      {
        Header: <CustomTableHeader value="ID" />,
        accessor: "giftCardGeneralId",
        Cell: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {`${e.value}`}
          </Typography>
        ),
        width: 50,
      },
      {
        Header: <CustomTableHeader value="Name" />,
        accessor: "name",
        Cell: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e.value}
          </Typography>
        ),
      },
      {
        id: "Value",
        Header: <CustomTableHeader value="Value" />,
        accessor: (row) => `${row.amount}`,
        Cell: (e) => <Typography variant="subtitle1">$ {e.value}</Typography>,
      },
      {
        Header: <CustomTableHeader value="Template" />,
        accessor: "giftCardTemplateName",
        Cell: (e) => (
          <Typography variant="subtitle1" className="giftcard-template">
            {e.value}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Date Created" />,
        accessor: "createdDate",
        Cell: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(e.value).format("MM/DD/YYYY")}
          </Typography>
        ),
      },
      {
        id: "Quantity",
        Header: () => (
          <CustomTableHeader
            styles={{ textAlign: "center" }}
            value="Quantity"
          />
        ),
        accessor: (row) => (
          <Typography
            variant="subtitle1"
            className="table__light"
            style={{ textAlign: "center" }}
          >
            {row.quantity}
          </Typography>
        ),
      },
      {
        id: "Unused",
        Header: () => (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Unused" />
        ),
        accessor: (row) => (
          <Typography
            variant="subtitle1"
            className="table__light"
            style={{ textAlign: "center" }}
          >
            {row.unUsed}
          </Typography>
        ),
      },
      {
        id: "Actions",
        Header: () => (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Actions" />
        ),
        accessor: "Action",
        Cell: (row) => {
          return (
            <div style={{ textAlign: "center" }}>
              {CheckPermissions("edit-gift-card") && (
                <Tooltip title="Edit" arrow>
                  <span style={{ paddingLeft: "10px" }}>
                    <img
                      alt=""
                      src={EditSVG}
                      style={style.icon}
                      onClick={() =>
                        this.viewGeneration(row.original.giftCardGeneralId)
                      }
                    />
                  </span>
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ];

    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Generation | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.generation" />}
        />
        <div className="giftcard">
          <div className="giftCard_search">
            <form>
              <SearchIcon className="button" title="Search" />
              <input
                type="text"
                className="textBox"
                placeholder="Search by ID, Name, Template"
                value={this.state.search}
                onChange={(e) => this.setState({ search: e.target.value })}
                onKeyPress={this.keyPressed}
              />
            </form>
            {CheckPermissions("add-new-gift-card") && (
              <Button
                className="btn btn-green"
                onClick={() =>
                  this.props.history.push("/app/giftcard/generation/add")
                }
              >
                NEW GIFT CARD
              </Button>
            )}
          </div>
          <div className="giftcard_content">
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
  getGiftCardGeneral: (giftCardGeneralId, path) => {
    dispatch(getGiftCardGeneral(giftCardGeneralId, path));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation);

const style = {
  icon: {
    cursor: "pointer",
    fontWeight: "300",
  },
};
