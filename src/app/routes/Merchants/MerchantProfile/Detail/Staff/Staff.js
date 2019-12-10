import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import URL from "../../../../../../url/url";
import axios from "axios";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      staff: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getStaff();
  }

  getStaff = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/staff/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        const data = res.data.data;
        this.setState({ staff: data, loading: false });
      });
  };

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };

  render() {
    let e = this.state.staff;
    if (e) {
      if (this.state.search) {
        e = e.filter(e => {
          if (e !== null) {
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
          }
          return null;
        });
      } else {
      }
    }

    const columns = [
      {
        Header: "ID",
        accessor: "staffId",
        width: 50
      },
      {
        Header: "Name",
        id: "fullname",
        width: 200,
        accessor: d => `${d.firstName} ${d.lastName}`
      },
      {
        id: "Display",
        Header: "Display Name",
        width: 200,
        accessor: "displayName"
      },
      {
        Header: "Phone",
        accessor: "phone",
        width: 200
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Role",
        accessor: "roleName"
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: e => <span>{e.value === 1 ? "Disabled" : "Active"}</span>
      }
    ];
    return (
      <div className="content GeneralContent react-transition swipe-up Staff">
        <div className="MerList" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* SEARCH */}
            <div className="search">
              <form>
                {/* <input title="Search" value="" className="button" readOnly /> */}
                <input
                  type="text"
                  className="textbox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._SearchMerchants}
                />
              </form>
            </div>
            <div>
              <Button
                className="btn btn-green"
                onClick={() =>
                  this.props.history.push("/app/merchants/profile/staff/add")
                }
              >
                NEW STAFF
              </Button>
            </div>
          </div>

          <div className="MListContainer">
            <ReactTable
              data={e}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
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
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});
export default connect(mapStateToProps)(Staff);
