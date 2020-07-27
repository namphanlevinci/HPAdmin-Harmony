import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_TEMPLATE,
  VIEW_DETAIL,
} from "../../../../actions/gift-card/actions";
import { GoTrashcan } from "react-icons/go";
import { store } from "react-notifications-component";
import { FiEdit } from "react-icons/fi";
import { Helmet } from "react-helmet";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "../delete-generation";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { config } from "../../../../url/url";
import CheckPermissions from "../../../../util/checkPermission";

import "../generation/generation.styles.scss";
import "react-table/react-table.css";
const URL = config.url.URL;
class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      loading: false,
      search: "",
    };
  }

  _handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  _handleOpenDelete = (ID) => {
    this.setState({ openDelete: true, deleteID: ID });
  };

  fetchData = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/giftcardTemplate?key=${this.state.search}&page=${
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
        const filterTemplate = data.filter(
          (template) => Number(template.isDisabled) !== 1
        );
        if (Number(res.data.codeNumber) === 200) {
          this.setState({
            page,
            pageCount: res.data.pages,
            data: filterTemplate,
            loading: false,
            pageSize: 5,
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

  deleteTemplate = () => {
    const deleteID = this.state.deleteID;
    this.setState({ loading: true });
    axios
      .put(URL + "/giftcardtemplate/disabled/" + deleteID, null, {
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
              duration: 2500,
              onScreen: true,
            },
            width: 250,
          });
          this.setState({
            loading: false,
            deleteID: "",
            openDelete: false,
            search: "",
          });
          this.fetchData();
        }
      })
      .catch((error) => console.log(error));
  };

  editTemplate = (data) => {
    console.log("data", data);
    this.props.VIEW_DETAIL(data);
    this.props.history.push("/app/giftcard/template/edit");
  };

  render() {
    const columns = [
      {
        Header: "Thumbnail",
        accessor: "imageUrl",
        Cell: (row) => (
          <div
            style={{
              backgroundImage: `url(${row.original.imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100px",
              height: "50px",
            }}
          />
        ),
        // width: 130,
      },
      {
        Header: "Name",
        accessor: "giftCardTemplateName",
        // width: 180,
      },
      {
        id: "Group",
        Header: "Group",
        accessor: "giftCardType",
        // width: 180,
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: (e) => <span>{e.value === 0 ? "Active" : "Inactive"}</span>,
        // width: 150,
      },
      {
        Header: () => <div style={{ textAlign: "center" }}>Visible on App</div>,
        accessor: "isConsumer",
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
        id: "Actions",
        Header: () => <div style={{ textAlign: "center" }}>Actions</div>,
        accessor: "Action",
        Cell: (row) => {
          return (
            <div style={{ textAlign: "center" }}>
              {CheckPermissions(43) && (
                <Tooltip title="Delete">
                  <span>
                    <GoTrashcan
                      size={22}
                      onClick={() =>
                        this._handleOpenDelete(
                          row?.original?.giftCardTemplateId
                        )
                      }
                    />
                  </span>
                </Tooltip>
              )}
              {CheckPermissions(44) && (
                <Tooltip title="Edit" arrow>
                  <span style={{ paddingLeft: "10px" }}>
                    <FiEdit
                      size={21}
                      style={style.icon}
                      onClick={() => this.editTemplate(row.original)}
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
          <title>Template | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.giftCard-template" />}
        />
        <div className="giftcard">
          <div className="giftCard_search">
            <form>
              <SearchIcon className="button" title="Search" />
              <input
                type="text"
                className="textBox"
                placeholder="Search by Name, Group"
                value={this.state.search}
                onChange={(e) => this.setState({ search: e.target.value })}
                onKeyPress={this.keyPressed}
              />
            </form>

            {CheckPermissions(42) && (
              <Button
                className="btn btn-green"
                onClick={() =>
                  this.props.history.push("/app/giftcard/template/add")
                }
              >
                New Template
              </Button>
            )}
          </div>
          <div className="giftcard_content">
            <Delete
              handleCloseDelete={this._handleCloseDelete}
              open={this.state.openDelete}
              deleteGeneration={this.deleteTemplate}
              text={"Template"}
            />

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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Template: state.GiftCardReducer.template,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  GET_TEMPLATE: () => {
    dispatch(GET_TEMPLATE());
  },
  VIEW_DETAIL: (payload) => {
    dispatch(VIEW_DETAIL(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation);

const style = {
  icon: {
    cursor: "pointer",
  },
};
