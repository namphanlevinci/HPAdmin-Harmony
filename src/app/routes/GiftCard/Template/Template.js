import React, { Component } from "react";
import { connect } from "react-redux";
import { VIEW_DETAIL } from "../../../../actions/gift-card/actions";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../../../../actions/notifications/actions";
import { Helmet } from "react-helmet";
import { config } from "../../../../url/url";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import {
  viewTemplate,
  archiveTemplateByID,
  restoreTemplateByID,
} from "../../../../actions/giftCardActions";

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

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  handleOpenDelete = (ID) => {
    this.setState({ openDelete: true, deleteID: ID });
  };

  handleCloseRestore = () => {
    this.setState({ openRestore: false });
  };

  handleOpenRestore = (ID) => {
    this.setState({ openRestore: true, restoreID: ID });
  };

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;

    const url = `${URL}/giftcardTemplate?key=${this.state.search}&page=${
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

  deleteTemplate = () => {
    const templateId = this.state.deleteID;
    this.props.archiveTemplateByID(templateId);
    this.handleCloseDelete();
    this.fetchApi();
  };

  restoreTemplate = () => {
    const templateId = this.state.restoreID;
    this.props.restoreTemplateByID(templateId);
    this.handleCloseRestore();
    this.fetchApi();
  };

  editTemplate = (data) => {
    this.props.viewTemplate(data);
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
                        this.handleOpenDelete(row?.original?.giftCardTemplateId)
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

    const { page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

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
                NEW TEMPLATE
              </Button>
            )}
          </div>
          <div className="giftcard_content">
            <Delete
              handleCloseDelete={this.handleCloseDelete}
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
              row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchApi(state)}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
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
  userLogin: state.userReducer.User,
  apiData: state.fetchApi,
});

const mapDispatchToProps = (dispatch) => ({
  viewTemplate: (payload) => {
    dispatch(viewTemplate(payload));
  },
  archiveTemplateByID: (templateId) => {
    dispatch(archiveTemplateByID(templateId));
  },
  restoreTemplateByID: (templateId) => {
    dispatch(restoreTemplateByID(templateId));
  },
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);

const style = {
  icon: {
    cursor: "pointer",
    fontWeight: "300",
  },
};
