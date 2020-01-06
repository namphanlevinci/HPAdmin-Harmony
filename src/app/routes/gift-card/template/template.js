import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_TEMPLATE,
  VIEW_DETAIL
} from "../../../../actions/gift-card/actions";
import { GoTrashcan } from "react-icons/go";
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
import "../generation/generation.styles.scss";
import "react-table/react-table.css";

class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      loading: false,
      search: ""
    };
  }

  componentDidMount() {
    this.props.GET_TEMPLATE();
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
      .put(URL + "/giftcardtemplate/disabled/" + deleteID, null, {
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
    let TemplateList = this.props.Template;
    if (TemplateList) {
      if (this.state.search) {
        TemplateList = TemplateList.filter(e => {
          if (e !== null) {
            return (
              e.giftCardTemplateName
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              e.giftCardType
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              parseInt(e?.giftCardTemplateId) === parseInt(this.state.search)
            );
          }
          return null;
        });
      }
    }

    const columns = [
      {
        Header: "Thumbnail",
        accessor: "imageUrl",
        Cell: row => (
          <div
            style={{
              backgroundImage: `url(${row.original.imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100px",
              height: "100px"
            }}
          />
        ),
        width: 200
      },
      {
        Header: "Name",
        accessor: "giftCardTemplateName",
        width: 250
      },
      {
        id: "Group",
        Header: "Group",
        accessor: "giftCardType",
        width: 200
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: e => <span>{e.value === 0 ? "Active" : "Disable"}</span>,
        width: 200
      },
      {
        Header: () => <div style={{ textAlign: "center" }}>Visible on App</div>,
        accessor: "isConsumer",
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
                    this._handleOpenDelete(row?.original?.giftCardTemplateId)
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
            this.props.history.push("/app/giftcard/template/edit");
          }
        }
      };
    };
    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.giftcard-template" />}
        />
        <div className="giftcard">
          <div className="giftcard_search">
            <form>
              <SearchIcon className="button" title="Search" />
              <input
                type="text"
                className="textbox"
                placeholder="Search by ID, Name, Group"
                value={this.state.search}
                onChange={e => this.setState({ search: e.target.value })}
              />
            </form>
            <Button
              className="giftcard_button"
              onClick={() =>
                this.props.history.push("/app/giftcard/template/add")
              }
            >
              New Template
            </Button>
          </div>
          <div className="giftcard_content">
            <Delete
              handleCloseDelete={this._handleCloseDelete}
              open={this.state.openDelete}
              deleteGeneration={this._Delete}
              text={"Template"}
            />
            <ReactTable
              data={TemplateList}
              columns={columns}
              defaultPageSize={10}
              minRows={0}
              getTdProps={onRowClick}
              noDataText="NO DATA!"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Template: state.GiftCardData.template,
  InfoUser_Login: state.User
});

const mapDispatchToProps = dispatch => ({
  GET_TEMPLATE: () => {
    dispatch(GET_TEMPLATE());
  },
  VIEW_DETAIL: payload => {
    dispatch(VIEW_DETAIL(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation);
