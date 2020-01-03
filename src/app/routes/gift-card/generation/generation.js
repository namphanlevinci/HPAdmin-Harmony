import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_GIFTCARD,
  VIEW_DETAIL
} from "../../../../actions/gift-card/actions";
import { GoTrashcan } from "react-icons/go";
import { store } from "react-notifications-component";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import moment from "moment";
import DeleteGeneration from "./delete-generation";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import URL from "../../../../url/url";

import "./generation.styles.scss";
import "react-table/react-table.css";

class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      deleteID: "",
      loading: false
    };
  }

  componentDidMount() {
    this.props.GET_DATA();
  }

  _handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  _handleOpenDelete = ID => {
    this.setState({ openDelete: true, deleteID: ID });
  };

  _Delete = () => {
    const deleteID = this.state.deleteID;
    this.setState({ loading: true });
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
              duration: 2500,
              onScreen: true
            },
            width: 250
          });
          this.props.GET_DATA();
          this.setState({ loading: false, deleteID: "", openDelete: false });
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const GiftList = this.props.GiftList;

    const columns = [
      {
        Header: "ID",
        accessor: "giftCardGeneralId",
        width: 50
      },
      {
        Header: "Name",
        accessor: "name",
        width: 200
      },
      {
        id: "Value",
        Header: "Value",
        width: 100,
        accessor: row => `${row.amount}`,
        Cell: e => <span style={{ textAlign: "start" }}>$ {e.value}</span>
      },
      {
        Header: "Template",
        accessor: "giftCardTemplateId",
        Cell: e => (
          <span className="giftcard_template">
            Gift Card Template {e.value}
          </span>
        ),
        width: 200
      },
      {
        Header: "Date Created",
        accessor: "createdDate",
        Cell: e => moment(e.value).format("MM/DD/YYYY")
      },
      {
        id: "Quantity",
        Header: "Quantity",
        accessor: "quantity"
      },
      {
        id: "Unused",
        Header: "Used",
        accessor: "unUsed"
      },
      {
        id: "Actions",
        Header: () => <div style={{ textAlign: "center" }}>Actions</div>,
        accessor: "Action",
        Cell: row => {
          return (
            <Tooltip title="Delete" arrow>
              <div style={{ color: "#0764b0", textAlign: "center" }}>
                <GoTrashcan
                  size={22}
                  onClick={() =>
                    this._handleOpenDelete(row?.original?.giftCardGeneralId)
                  }
                />
              </div>
            </Tooltip>
          );
        }
      }
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: e => {
          if (column?.id !== "Actions") {
            this.props.VIEW_DETAIL(rowInfo.original);
            this.props.history.push("/app/giftcard/generation/detail");
          }
        }
      };
    };

    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.generation" />}
        />
        <div className="giftcard">
          <div className="giftcard_search">
            <form>
              <SearchIcon className="button" title="Search" />
              <input
                type="text"
                className="textbox"
                placeholder="Search.."
                value={this.state.search}
                onChange={this._SearchUsers}
              />
            </form>
            <Button
              className="giftcard_button"
              onClick={() =>
                this.props.history.push("/app/giftcard/generation/add")
              }
            >
              New Gift Card
            </Button>
          </div>
          <div className="giftcard_content">
            <DeleteGeneration
              handleCloseDelete={this._handleCloseDelete}
              open={this.state.openDelete}
              deleteGeneration={this._Delete}
            />
            <ReactTable
              data={GiftList}
              columns={columns}
              defaultPageSize={10}
              minRows={0}
              getTdProps={onRowClick}
              noDataText="NO DATA!"
              loading={this.state.loading}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  GiftList: state.GiftCardData.generation
});

const mapDispatchToProps = dispatch => ({
  GET_DATA: () => {
    dispatch(GET_GIFTCARD());
  },
  VIEW_DETAIL: payload => {
    dispatch(VIEW_DETAIL(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation);
