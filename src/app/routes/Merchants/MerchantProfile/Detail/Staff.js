import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "../../MerchantsList/merchantsList.css";
import "./Detail.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    this.setState({
      totalRecords: this.props.MerchantProfile.staffs.length
    });
  }

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };

  render() {
    let e = this.props.MerchantProfile.staffs;
    if (e) {
      if (this.state.search) {
        e = e.filter(e => {
          return (
            e.email
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            e.displayName
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            parseInt(e.staffId) === parseInt(this.state.search)
          );
        });
      } else {
      }
    }

    const columns = [
      {
        Header: "Staff ID",
        accessor: "staffId",
        width: 150
      },
      {
        Header: "Name",
        id: "fullname",
        width: 250,
        accessor: d => `${d.firstName} ${d.lastName}`
      },
      {
        id: "Display",
        Header: "Display Name",
        width: 250,
        accessor: "displayName"
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "Email",
        accessor: "email"
      }
    ];
    return (
      <div className="content GeneralContent react-transition swipe-up">
        <div className="MerList" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* SEARCH */}
            <div className="search">
              <form>
                <input title="Search" value="" className="button" readOnly />
                <input
                  type="text"
                  className="textbox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._SearchMerchants}
                />
              </form>
            </div>
          </div>

          <div className="MListContainer">
            <ReactTable
              data={e}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              noDataText="NO DATA!"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});
export default connect(mapStateToProps)(Staff);
