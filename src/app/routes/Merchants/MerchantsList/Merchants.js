import React from "react";
import { connect } from "react-redux";
import {
  getAll_Merchants,
  SearchMerchants,
  ViewProfile_Merchants
} from "../../../../actions/merchants/actions";
import "./merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import ReactTable from "react-table";
import "react-table/react-table.css";
// import { MdDone } from "react-icons/md";

class Merchants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  componentWillMount() {
    this.props.getAll_Merchants();
  }

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };

  _merchantsProfile = merchant => {
    this.props.ViewProfile_Merchants(merchant);
    this.props.history.push("/app/merchants/merchant-profile/general");
  };
  render() {
    let MerList = this.props.Merchants_List;
    if (MerList) {
      if (this.state.search) {
        MerList = MerList.filter(e => {
          return (
            e.businessName
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            e.email
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            parseInt(e.merchantId) === parseInt(this.state.search)
          );
        });
      }
    }

    const columns = [
      {
        Header: "ID",
        accessor: "merchantId",
        width: 150
      },
      {
        id: "businessName",
        Header: "Bussiness name",
        accessor: e =>
          e.general !== null ? e.general.legalBusinessName : null,
        Cell: e => <span style={{ fontWeight: 600 }}>{e.value}</span>,
        width: 170
      },
      {
        id: "principals",
        Header: "Owner",
        width: 200,
        accessor: "principals",
        Cell: e => (
          <span>
            {e.value !== null
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
            this._merchantsProfile(rowInfo.original);
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
              data={MerList}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Merchants);
