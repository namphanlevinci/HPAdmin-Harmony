import React, { Component } from "react";
import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import {
  // Area,
  // AreaChart,
  Bar,
  BarChart,
  // Line,
  // LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import SaleBox from "../../../components/SaleBox/index";
import _ from "lodash";
import DoughnutChart from "./DoughnutChart";
import ChartCard from "./ChartCard";
// import { increamentData, lineData } from "./data";
import Portfolio from "./Portfolio";
import { APPROVED_STATICS } from "../../../actions/static/actions";
import { connect } from "react-redux";
import moment from "moment";
import "./dashboard.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Dashboard: [],
    };
  }

  componentDidMount() {
    const fromDate = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    const toDate = moment()
      .endOf("month")
      .format("YYYY-MM-DD");
    const Data = { fromDate, toDate };
    this.props.APPROVED_STATICS(Data);

    setTimeout(() => {
      const Content = this.props.Approved.data;
      this.setState({
        Dashboard: Content,
        fromDate: fromDate,
        toDate: toDate,
      });
    }, 1000);
  }

  render() {
    const chartData = [
      { name: "J", amt: 600 },
      { name: "F", amt: 900 },
      { name: "M", amt: 1200 },
      { name: "A", amt: 800 },
    ];
    const chartNewUser = [
      {
        name: "Ios",
        amt: `${this.state.Dashboard.totalNumberDowloadOfAndroid}`,
      },
      {
        name: "Android",
        amt: `${this.state.Dashboard.totalNumberDowloadOfIOS}`,
      },
    ];
    const ApprovedMerchant = _.sum(
      _.map(this.state.Dashboard.approveMerchant, (d) => d.total)
    );
    const RejectedMerchant = _.sum(
      _.map(this.state.Dashboard.rejectMerchant, (d) => d.total)
    );
    const NewUser =
      this.state.Dashboard.totalNumberDowloadOfAndroid +
      this.state.Dashboard.totalNumberDowloadOfIOS;
    const HarmonyPayAccounts = this.state.Dashboard.totalNumberUserPaid;
    const MerchantAccounts = _.sum(
      _.map(this.state.Dashboard.totalMerchantAccounts, (d) => d.total)
    );
    return (
      <div className="app-wrapper">
        <div className="container-fluid">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.Template" />}
          />
          <div className="row">
            {/* //! total merchant account */}
            <div className="col-xl-4 col-sm-6">
              <SaleBox
                heading="Number of Merchant Account"
                title={MerchantAccounts}
                detail="this week"
              >
                <BarChart data={chartData}>
                  <Bar dataKey="amt" fill="#3f51b5" />
                  <XAxis stroke="#3f51b5" dataKey="name" />
                </BarChart>
              </SaleBox>
            </div>
            {/* // !!  new users this week */}
            <div className="col-xl-4 col-lg-6 col-sm-6">
              <SaleBox
                heading="New users this week"
                title={`${NewUser}`}
                detail="This week"
              >
                <BarChart data={chartNewUser}>
                  <Bar dataKey="amt" fill="#00FA9A" />
                  <XAxis stroke="#3CB371" dataKey="name" />
                </BarChart>
              </SaleBox>
            </div>
            {/* // Approved Merchant account this week */}
            <div className="col-xl-4 col-sm-6">
              <SaleBox
                heading="Approved Merchant account"
                title={`${ApprovedMerchant}`}
                detail="This week"
              >
                <BarChart data={chartData}>
                  <Bar dataKey="amt" fill="#00FA9A" />
                  <XAxis stroke="#3CB371" dataKey="name" />
                </BarChart>
              </SaleBox>
            </div>
            {/* //! HarmonyPay accounts*/}
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
              <ChartCard
                title="94"
                children={
                  <ResponsiveContainer
                    className="card-img-bottom overflow-hidden"
                    width="100%"
                    height={135}
                  >
                    <div className="middleBox">
                      <h2>
                        <span>{HarmonyPayAccounts} </span>
                        <br />
                        Total accounts
                      </h2>
                    </div>
                  </ResponsiveContainer>
                }
                styleName="up"
                desc="HarmonyPay Accounts"
              />
            </div>
            {/* //! user statistics */}
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
              <ChartCard
                title="38"
                children={
                  <ResponsiveContainer
                    className="card-img-bottom overflow-hidden"
                    width="100%"
                    height={135}
                  >
                    <div className="middleBox">
                      <h2>
                        <span>{NewUser} </span>
                        <br />
                        Number of users using HarmonyPay App
                      </h2>
                    </div>
                  </ResponsiveContainer>
                }
                styleName="up"
                desc="User Statistics"
              />
            </div>
            {/* //! time spent */}
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
              <ChartCard
                title="10"
                children={
                  <ResponsiveContainer
                    className="card-img-bottom overflow-hidden"
                    width="100%"
                    height={135}
                  >
                    <div className="middleBox">
                      <h2>
                        <span>{NewUser} </span>
                        <br />
                        Average amount of time spent per user
                      </h2>
                    </div>
                  </ResponsiveContainer>
                }
                styleName="down"
                desc="Time Statistics"
              />
            </div>
            {/* // !!  amount user by zipcode*/}
            <div className="col-xl-8 col-lg-5 col-md-12 col-12">
              <Portfolio />
            </div>
            {/* // !! number of request */}
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <div className="jr-card">
                <div className="jr-card-header">
                  <h3 className="card-heading">
                    Number of request (this week)
                  </h3>
                </div>
                <ResponsiveContainer width="100%">
                  <DoughnutChart
                    Approved={ApprovedMerchant}
                    rejected={RejectedMerchant}
                  />
                </ResponsiveContainer>
                <div className="row">
                  <div className="col-6">
                    <div className="media">
                      <i
                        className="zmdi zmdi-circle zmdi-hc-fw mr-2"
                        style={{ color: "#4169E1" }}
                      />
                      <div className="media-body">
                        <h5 className="mb-0">Approved</h5>
                        <span className="jr-fs-sm text-muted">
                          {`${ApprovedMerchant} request`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="media">
                      <i
                        className="zmdi zmdi-circle zmdi-hc-fw mr-2"
                        style={{ color: "#FF0000" }}
                      />
                      <div className="media-body">
                        <h5 className="mb-0">Rejected</h5>
                        <span className="jr-fs-sm text-muted">
                          {`${RejectedMerchant} request`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Approved: state.ApprovedStatic,
});
const mapDispatchToProps = (dispatch) => ({
  APPROVED_STATICS: (payload) => {
    dispatch(APPROVED_STATICS(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
