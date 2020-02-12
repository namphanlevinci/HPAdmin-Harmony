import React from "react";
import { connect } from "react-redux";
import {
  getAll_Merchants,
  SearchMerchants,
  ViewProfile_Merchants
} from "../../../../actions/merchants/actions";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import URL from "../../../../url/url";
import axios from "axios";

import "react-table/react-table.css";
import "./merchantsList.css";

class Merchants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true
    };
  }
  componentDidMount() {
    this.props.getAll_Merchants();
    this.setState({
      loading: false
    });
  }

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };
  addMerchant = () => {
    this.props.history.push("/app/merchants/add");
  };
  _merchantsProfile = ID => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        if (Number(res.data.codeNumber) === 200) {
          this.props.ViewProfile_Merchants(res.data.data);
          this.props.history.push("/app/merchants/profile/general");
        }
      });
  };
  render() {
    let MerList = this.props.Merchants_List;
    if (MerList) {
      if (this.state.search) {
        MerList = MerList.filter(e => {
          if (e.general !== null) {
            return (
              e.general.doBusinessName
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              e.email
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              parseInt(e.merchantId) === parseInt(this.state.search)
            );
          }
          return null;
        });
      }
    }

    const columns = [
      {
        Header: "ID",
        accessor: "merchantId",
        width: 100
      },
      {
        Header: "Bussiness name",
        id: "general",
        accessor: "general",
        Cell: e => (
          <span>{e.value !== null ? e.value.doBusinessName : null}</span>
        ),
        width: 230
      },
      {
        id: "principals",
        Header: "Owner",
        width: 200,
        accessor: e => e.principals[0],
        Cell: e => (
          <span>
            {e.value !== undefined
              ? e.value.firstName + " " + e.value.lastName
              : null}
          </span>
        )
      },
      {
        Header: "Email",
        accessor: "email",
        width: 350
      },
      {
        Header: "Phone number",
        accessor: "phone"
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: e => <span>{e.value === 0 ? "Available" : "Disable"}</span>
      }
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: e => {
          if (rowInfo !== undefined) {
            this._merchantsProfile(rowInfo.original.merchantId);
          }
        }
      };
    };
    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.MList" />}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* SEARCH */}
            <div className="search">
              <form>
                <SearchIcon className="button" title="Search" />
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
                style={{
                  backgroundColor: "#0764b0",
                  color: "white",
                  padding: "10px 20px",
                  fontWeight: "550"
                }}
                onClick={this.addMerchant}
              >
                ADD MERCHANT
              </Button>
            </div>
          </div>
          <div className="MListContainer">
            <ReactTable
              data={MerList}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
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
  Merchants_List: state.MerchantsList
});
const mapDispatchToProps = dispatch => ({
  getAll_Merchants: () => {
    dispatch(getAll_Merchants());
  },
  SearchMerchants: payload => {
    dispatch(SearchMerchants(payload));
  },
  ViewProfile_Merchants: payload => {
    dispatch(ViewProfile_Merchants(payload));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
