import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_GIFT_CARD,
  VIEW_DETAIL,
} from "../../../../actions/gift-card/actions";
import { GoTrashcan } from "react-icons/go";
import { store } from "react-notifications-component";
import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";
import { FiEdit } from "react-icons/fi";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
// import Delete from "../delete-generation";
import CheckPermissions from "../../../../util/checkPermission";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import PageviewOutlinedIcon from "@material-ui/icons/PageviewOutlined";

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
        Header: "ID",
        accessor: "giftCardGeneralId",
        Cell: (e) => <p>{`${e.value}`}</p>,
        width: 50,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: (e) => <p className="giftcard-name">{e.value}</p>,
      },
      {
        id: "Value",
        Header: "Value",
        // width: 100,
        accessor: (row) => `${row.amount}`,
        Cell: (e) => (
          <p style={{ textAlign: "start", fontWeight: 400 }}>$ {e.value}</p>
        ),
      },
      {
        Header: "Template",
        accessor: "giftCardTemplateName",
        Cell: (e) => <p className="giftcard-template">{e.value}</p>,
      },
      {
        Header: "Date Created",
        accessor: "createdDate",
        Cell: (e) => <p>{moment(e.value).format("MM/DD/YYYY")}</p>,
      },
      {
        id: "Quantity",
        Header: () => <div style={{ textAlign: "center" }}>Quantity</div>,
        accessor: (row) => (
          <p style={{ textAlign: "center" }}>{row.quantity}</p>
        ),
      },
      {
        id: "Unused",
        Header: () => <div style={{ textAlign: "center" }}>Used</div>,
        accessor: "unUsed",
        accessor: (row) => <p style={{ textAlign: "center" }}>{row.unUsed}</p>,
      },
      {
        id: "Actions",
        Header: () => <div style={{ textAlign: "center" }}>Actions</div>,
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
              {CheckPermissions(38) && (
                <Tooltip title="Edit" arrow>
                  <span style={{ paddingLeft: "10px" }}>
                    <PageviewOutlinedIcon
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
            {CheckPermissions(36) && (
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
