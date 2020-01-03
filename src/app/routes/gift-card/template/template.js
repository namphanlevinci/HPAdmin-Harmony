import React, { Component } from "react";
import { connect } from "react-redux";
import { GET_TEMPLATE } from "../../../../actions/gift-card/actions";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import moment from "moment";

import "../generation/generation.styles.scss";
import "react-table/react-table.css";

class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.GET_TEMPLATE();
  }

  render() {
    const TemplateList = this.props.Template;

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
          ></div>
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
        //   accessor: row => `${row.firstName} ${row.lastName}`,
        //   Cell: e => <p>{e.value}</p>
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: e => <p>{e.value === 0 ? "Active" : "Disable"}</p>,
        width: 200
      },
      {
        Header: "Visible on App"
        // accessor: "createdDate",
        // Cell: e => moment(e.value).format("MM/DD/YYYY A")
      },
      {
        id: "Action",
        Header: "Action",
        accessor: "Action"
      }
    ];
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
            <Button className="giftcard_button">New Template</Button>
          </div>
          <div className="giftcard_content">
            <ReactTable
              data={TemplateList}
              columns={columns}
              defaultPageSize={10}
              minRows={0}
              //   getTdProps={onRowClick}
              noDataText="NO DATA!"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Template: state.GiftCardData.template
});

const mapDispatchToProps = dispatch => ({
  GET_TEMPLATE: () => {
    dispatch(GET_TEMPLATE());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Generation);
