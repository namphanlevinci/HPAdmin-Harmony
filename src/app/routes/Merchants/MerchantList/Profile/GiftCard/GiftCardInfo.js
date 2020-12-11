import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Checkbox } from "@material-ui/core";
import { fetchApiByPage } from "../../../../../../actions/fetchApiActions";
import { exportGiftCardByMerchantId } from "../../../../../../actions/merchantActions";
import { BsInfoCircle } from "react-icons/bs";

import CustomProgress from "../../../../../../util/CustomProgress";

import moment from "moment";
import ReactTable from "react-table";

class GiftCardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      id: "",
      loadingComp: false,
    };
  }

  componentDidMount() {
    const pageUrl = window.location.pathname;
    const id = pageUrl.substring(pageUrl.lastIndexOf("/") + 1);
    this.setState({ id, loadingComp: true });
  }

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;

    const url = `giftcard/getByGeneral?generalId=${this.state.id}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  exportGiftCard = () => {
    this.props.exportGiftCard(this.state.id);
  };

  render() {
    const columns = [
      {
        Header: "ID",
        id: "none",
        accessor: "giftCardId",
      },
      {
        Header: "Serial",
        id: "createdDate",
        accessor: "serialNumber",
      },
      {
        Header: "Created On",
        id: "date",
        accessor: (e) => moment(e.createdDate).format("MM/DD/YYYY"),
      },
      {
        Header: <div style={{ textAlign: "center" }}> Value </div>,
        id: "amount",
        accessor: (e) => (
          <div style={{ textAlign: "center" }}>$ {e?.amount}</div>
        ),
      },
      {
        Header: <div style={{ textAlign: "center" }}> Is Active </div>,
        id: "isActive",
        accessor: (e) => (
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={e.isActive === 1 ? true : false}
              style={{ color: "#0764B0" }}
            />
          </div>
        ),
      },
      {
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        id: "action",
        accessor: (e) => (
          <div style={{ textAlign: "center" }}>
            <BsInfoCircle size={20} />
          </div>
        ),
      },
    ];

    const { page, loadingComp } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;
    const { loading: exportLoading } = this.props.exportStatus;

    return (
      <div className="content general-content Staff react-transition swipe-up">
        {exportLoading && <CustomProgress />}

        <div className="search_box">
          <Button
            className="btn btn-green"
            onClick={() =>
              this.props.history.push("/app/merchants/profile/gift-card")
            }
          >
            BACK TO LIST
          </Button>
          <Button
            className="btn btn-green"
            style={styles.btn}
            onClick={this.exportGiftCard}
          >
            EXPORT
          </Button>
        </div>
        <div className="merchant-list-container">
          {loadingComp && (
            <ReactTable
              manual
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchApi(state)}
              defaultPageSize={20}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
              columns={columns}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  apiData: state.fetchApi,
  exportStatus: state.exportGiftCard,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  exportGiftCard: (id) => {
    dispatch(exportGiftCardByMerchantId(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftCardInfo);
const styles = {
  btn: {
    marginRight: "0px",
  },
};
