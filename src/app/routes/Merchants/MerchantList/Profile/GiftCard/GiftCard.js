import React, { Component } from "react";
import { connect } from "react-redux";
import {
  exportGiftCardByMerchantId,
  getGiftCardName,
} from "../../../../../../actions/merchantActions";
import { fetchApiByPage } from "../../../../../../actions/fetchApiActions";
import { debounce } from "lodash";
import { Button, Tooltip } from "@material-ui/core";
import { RiShareForwardBoxLine } from "react-icons/ri";

import CustomProgress from "../../../../../../util/CustomProgress";
import ReactTable from "react-table";
import SearchComponent from "../../../../../../util/searchComponent";
import moment from "moment";

import "./GiftCard.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
    };
  }

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const merchantId = this.props.MerchantProfile.merchantId;

    const url = `giftcardgeneral?keySearch=${
      this.state.search
    }&merchantId=${merchantId}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  searchMerchant = debounce((query) => {
    this.fetchApi();
  }, 1000);

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchApi();
    }
  };

  render() {
    const columns = [
      {
        Header: "Gift Card Label",
        id: "none",
        accessor: "name",
      },
      {
        Header: "Date Created",
        id: "createdDate",
        accessor: (e) => moment(e.createdDate).format("MM/DD/YYYY"),
      },
      {
        Header: <div style={{ textAlign: "center" }}> Value </div>,
        id: "amount",
        accessor: (e) => (
          <div style={{ textAlign: "center" }}>$ {e.amount}</div>
        ),
      },
      {
        Header: <div style={{ textAlign: "center" }}> Qty </div>,
        id: "qty",
        accessor: (e) => (
          <div style={{ textAlign: "center" }}>{e?.quantity}</div>
        ),
      },
      {
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        id: "action",
        accessor: (e) => (
          <Tooltip title="Export" arrow>
            <div
              style={{
                color: "#0764B0",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <RiShareForwardBoxLine size={20} />
            </div>
          </Tooltip>
        ),
      },
    ];
    const { page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;
    const { loading: exportLoading } = this.props.exportStatus;

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined && column.id === "action") {
            this.props.exportGiftCard(rowInfo?.original?.giftCardGeneralId);
          } else {
            this.props.getGiftCardName(rowInfo?.original?.name);
            this.props.history.push(
              `/app/merchants/profile/gift-card/${rowInfo.original.giftCardGeneralId}`
            );
          }
        },
      };
    };

    let dataList = data;

    if (data) {
      if (this.state.search) {
        dataList = data.filter((e) => {
          if (e !== null) {
            return (
              e.name.toString()
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
                e.createdDate.toString()
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
                e.amount.toString()
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
                e.quantity.toString()
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          }
          return null;
        });
      } else {
      
      }
    }

    return (
      <div className="content general-content Staff react-transition swipe-up">
        {exportLoading && <CustomProgress />}
        <div className="search_box">
          <SearchComponent
            value={this.state.search}
            onChange={this.handleChange}
            onKeyPress={this.keyPressed}
            onClickIcon = {()=>this.setState({ search : "" })}
          />
          <Button
            className="btn btn-green"
            style={styles.btn}
            onClick={() =>
              this.props.history.push("/app/merchants/profile/gift-card/add")
            }
          >
            Generate Code
          </Button>
        </div>

        <div className="merchant-list-container">
          <ReactTable
            manual
            page={page}
            pages={pageCount}
            data={dataList}
            row={pageSize}
            onPageChange={(pageIndex) => this.changePage(pageIndex)}
            onFetchData={(state) => this.fetchApi(state)}
            defaultPageSize={20}
            minRows={1}
            noDataText="NO DATA!"
            loading={loading}
            columns={columns}
            getTdProps={onRowClick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.fetchApi,
  MerchantProfile: state.merchant.merchant,
  exportStatus: state.exportGiftCard,
});
const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  exportGiftCard: (id) => {
    dispatch(exportGiftCardByMerchantId(id));
  },
  getGiftCardName: (name) => {
    dispatch(getGiftCardName(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);

const styles = {
  span: {
    fontWeight: "400",
    color: "black",
  },
  btn: {
    marginRight: "0px",
  },
};
