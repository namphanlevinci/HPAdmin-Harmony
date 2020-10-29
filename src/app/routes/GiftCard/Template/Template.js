import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_TEMPLATE,
  VIEW_DETAIL,
} from "../../../../actions/gift-card/actions";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../../../../actions/notifications/actions";
import { Helmet } from "react-helmet";
import { config } from "../../../../url/url";
import { CustomTableHeader } from "../../../../util/CustomText";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import { Typography, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "../DeleteGeneration";
import axios from "axios";
import CheckPermissions from "../../../../util/checkPermission";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveSVG from "../../../../assets/images/archive.svg";
import EditSVG from "../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../assets/images/restore.svg";

import "../Generation/generation.styles.scss";
import "react-table/react-table.css";
const URL = config.url.URL;

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      openRestore: false,
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

  handleCloseRestore = () => {
    this.setState({ openRestore: false });
  };

  handleOpenRestore = (ID) => {
    this.setState({ openRestore: true, restoreID: ID });
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
        if (Number(res.data.codeNumber) === 200) {
          this.setState({
            page,
            pageCount: res.data.pages,
            data: data,
            loading: false,
            pageSize: 5,
          });
        } else {
          this.props.FailureNotify(res.data.message);
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
          this.props.SuccessNotify(res.data.message);
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

  restoreTemplate = () => {
    const { restoreID } = this.state;
    this.setState({ loading: true });
    axios
      .put(URL + "/giftcardtemplate/restore/" + restoreID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          this.props.SuccessNotify(res.data.message);

          this.setState({
            loading: false,
            restoreID: "",
            openRestore: false,
            search: "",
          });
          this.fetchData();
        }
      })
      .catch((error) => console.log(error));
  };

  editTemplate = (data) => {
    this.props.VIEW_DETAIL(data);
    this.props.history.push("/app/giftcard/template/edit");
  };

  render() {
    const columns = [
      {
        Header: <CustomTableHeader value="Thumbnail" />,
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
        Header: <CustomTableHeader value="Name" />,
        id: "giftCardTemplateName",
        accessor: (row) => (
          <Typography variant="subtitle1">
            {row?.giftCardTemplateName}
          </Typography>
        ),
        // width: 180,
      },
      {
        id: "Group",
        Header: <CustomTableHeader value="Group" />,
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.giftCardType}
          </Typography>
        ),
      },
      {
        Header: () => (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Status" />
        ),
        accessor: "isDisabled",
        Cell: (e) => (
          <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            {e.value === 0 ? "Active" : "Inactive"}
          </Typography>
        ),
      },
      {
        Header: () => (
          <CustomTableHeader
            styles={{ textAlign: "center" }}
            value="Visible on App"
          />
        ),
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
        Header: () => (
          <CustomTableHeader styles={{ textAlign: "center" }} value="Actions" />
        ),
        accessor: "Action",
        Cell: (row) => {
          return (
            <div style={{ textAlign: "center" }}>
              {CheckPermissions("active-template") &&
                (Number(row?.original?.isDisabled) === 0 ? (
                  <Tooltip title="Archive">
                    <img
                      src={ArchiveSVG}
                      style={style.icon}
                      alt=""
                      onClick={() =>
                        this._handleOpenDelete(
                          row?.original?.giftCardTemplateId
                        )
                      }
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Restore">
                    <img
                      alt=""
                      src={RestoreSVG}
                      style={style.icon}
                      onClick={() =>
                        this.handleOpenRestore(
                          row?.original?.giftCardTemplateId
                        )
                      }
                    />
                  </Tooltip>
                ))}
              {CheckPermissions("edit-template") && (
                <Tooltip title="Edit" arrow>
                  <span style={{ paddingLeft: "15px" }}>
                    <img
                      alt=""
                      src={EditSVG}
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

            {CheckPermissions("add-new-template") && (
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

            <Dialog open={this.state.openRestore}>
              <DialogTitle id="alert-dialog-title">
                {"Restore this Template ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to RESTORE this template?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ openRestore: false, restoreID: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => [
                    this.restoreTemplate(),
                    this.setState({ openRestore: false, restoreID: "" }),
                  ]}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>

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
  SuccessNotify: (message) => {
    dispatch(SUCCESS_NOTIFICATION(message));
  },
  FailureNotify: (message) => {
    dispatch(FAILURE_NOTIFICATION(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);

const style = {
  icon: {
    cursor: "pointer",
    fontWeight: "300",
  },
};
