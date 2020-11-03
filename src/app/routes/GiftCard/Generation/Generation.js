import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_GIFT_CARD,
  VIEW_DETAIL,
} from "../../../../actions/gift-card/actions";

import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../../util/CustomText";
import { Typography, Button } from "@material-ui/core";

import EditSVG from "../../../../assets/images/edit.svg";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
// import Delete from "../delete-generation";
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

  // Delete = () => {
  //   const deleteID = this.state.deleteID;
  //   this.setState({ loading: true });
  //   axios
  //     .put(URL + "/giftcardgeneral/disabled/" + deleteID, null, {
  //       headers: {
  //         Authorization: `Bearer ${this.props.userLogin.token}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.message === "Success") {
  //         store.addNotification({
  //           title: "Success!",
  //           message: `${res.data.message}`,
  //           type: "success",
  //           insert: "top",
  //           container: "top-right",
  //           animationIn: ["animated", "fadeIn"],
  //           animationOut: ["animated", "fadeOut"],
  //           dismiss: {
  //             duration: 2500,
  //             onScreen: true,
  //           },
  //           width: 250,
  //         });
  //         this.fetchData();
  //         this.setState({ loading: false, deleteID: "", openDelete: false });
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  fetchData = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/giftcardgeneral?keySearch=${this.state.search}&page=${
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
      this.setState({ loading: true });
      this.fetchData();
    }
  };

  viewGeneration = (data) => {
    this.props.VIEW_DETAIL(data.giftCardGeneralId);
    this.props.history.push("/app/giftcard/generation/detail");
  };

  render() {
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
              {/* {CheckPermissions(37) && (
                <Tooltip title="Delete">
                  <ArchiveOutlinedIcon
                    style={style.icon}
                    onClick={() =>
                      this.handleOpenDelete(row?.original?.giftCardGeneralId)
                    }
                  />
                </Tooltip>
              )} */}
              {CheckPermissions("edit-gift-card") && (
                <Tooltip title="Edit" arrow>
                  <span style={{ paddingLeft: "10px" }}>
                    <img
                      alt=""
                      src={EditSVG}
                      style={style.icon}
                      onClick={() => this.viewGeneration(row.original)}
                    />
                  </span>
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ];

    const { page, pageCount, data } = this.state;

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
                New Gift Card
              </Button>
            )}
          </div>
          <div className="giftcard_content">
            {/* <Delete
              handleCloseDelete={this.handleCloseDelete}
              open={this.state.openDelete}
              deleteGeneration={this.Delete}
              text={"Gift Card"}
            /> */}
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
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
  GiftList: state.GiftCardReducer.generation,
});

const mapDispatchToProps = (dispatch) => ({
  GET_DATA: () => {
    dispatch(GET_GIFT_CARD());
  },
  VIEW_DETAIL: (payload) => {
    dispatch(VIEW_DETAIL(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation);

const style = {
  icon: {
    cursor: "pointer",
    fontWeight: "300",
  },
};