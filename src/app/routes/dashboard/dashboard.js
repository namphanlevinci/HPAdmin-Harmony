import React, { Component } from "react";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis
} from "recharts";
import SaleBox from "components/SaleBox/index";
import _ from "lodash";
import DoughnutChart from "./DoughnutChart";
import ChartCard from "./ChartCard";
import { increamentData, lineData } from "./data";
import Portfolio from "./Portfolio";
import { APPROVED_STATICS } from "../../../actions/static/actions";
import { connect } from "react-redux";
import moment from "moment";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Dashboard: []
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
    const Content = this.props.Approved.data;
    setTimeout(() => {
      this.setState({
        Dashboard: Content,
        fromDate: fromDate,
        toDate: toDate
      });
    }, 1000);
  }
  componentWillReceiveProps(nextProps) {
    console.log("Content", this.state.Dashboard);
  }
  render() {
    console.log("Content", this.state.Dashboard);

    const chartData = [
      { name: "J", amt: 600 },
      { name: "F", amt: 900 },
      { name: "M", amt: 1200 },
      { name: "A", amt: 800 }
    ];
    const chartNewUser = [
      {
        name: "Ios",
        amt: `${this.state.Dashboard.totalNumberDowloadOfAndroid}`
      },
      {
        name: "Android",
        amt: `${this.state.Dashboard.totalNumberDowloadOfIOS}`
      }
    ];
    const ApprovedMerchant = _.sum(
      _.map(this.state.Dashboard.approveMerchant, d => d.total)
    );
    const RejectedMerchant = _.sum(
      _.map(this.state.Dashboard.rejectMerchant, d => d.total)
    );
    const NewUser =
      this.state.Dashboard.totalNumberDowloadOfAndroid +
      this.state.Dashboard.totalNumberDowloadOfIOS;
    return (
      <div className="app-wrapper">
        <div className="container-fluid">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.Template" />}
          />
          <div className="row">
            {/* //!! total merchant account */}
            <div className="col-xl-4 col-sm-6">
              <SaleBox
                heading="Number of Merchant Account"
                title="8535"
                detail="Past 9 month data"
              >
                <BarChart data={chartData}>
                  <Bar dataKey="amt" fill="#3f51b5" />
                  <XAxis stroke="#3f51b5" dataKey="name" />
                </BarChart>
              </SaleBox>
            </div>

            {/* // !!  new users this week */}
            <div className="col-xl-4 col-lg-6 col-md-12 col-12">
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

            {/* //!! Approved Merchant account this week */}
            <div className="col-xl-4 col-sm-6">
              <SaleBox
                heading="Approved Merchant account this week"
                title={`${ApprovedMerchant}`}
                detail="This week"
              >
                <BarChart data={chartData}>
                  <Bar dataKey="amt" fill="#00FA9A" />
                  <XAxis stroke="#3CB371" dataKey="name" />
                </BarChart>
              </SaleBox>
            </div>
            {/* //!! HarmonyPay accounts*/}
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
              <ChartCard
                title="94"
                children={
                  <ResponsiveContainer
                    className="card-img-bottom overflow-hidden"
                    width="100%"
                    height={135}
                  >
                    <AreaChart
                      data={increamentData}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                          <stop
                            offset="5%"
                            stopColor="#3f51b5"
                            stopOpacity={1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#1fb6fc"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        dataKey="pv"
                        strokeWidth={0}
                        stackId="2"
                        stroke="#4D95F3"
                        fill="url(#color3)"
                        fillOpacity={1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                }
                styleName="up"
                desc="HarmonyPay Accounts"
              />
            </div>
            {/* //!! user statistics */}
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
              <ChartCard
                title="38"
                children={
                  <ResponsiveContainer
                    className="card-img-bottom overflow-hidden"
                    width="100%"
                    height={135}
                  >
                    <AreaChart
                      data={increamentData}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                          <stop
                            offset="5%"
                            stopColor="#aa3c6d"
                            stopOpacity={1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ff9800"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>

                      <Area
                        dataKey="pv"
                        type="monotone"
                        strokeWidth={0}
                        stackId="2"
                        stroke="#4D95F3"
                        fill="url(#color4)"
                        fillOpacity={1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                }
                styleName="up"
                desc="User Statistics"
              />
            </div>
            {/* //!! time spent */}
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
              <ChartCard
                title="44"
                children={
                  <ResponsiveContainer
                    className="card-img-bottom overflow-hidden"
                    width="100%"
                    height={135}
                  >
                    <LineChart
                      data={lineData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <Line
                        dataKey="pv"
                        stroke="#3f51b5"
                        dot={{ stroke: "#3f51b5", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                }
                styleName="up"
                desc="Traffic raise from past year"
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
                    <IntlMessages id="Number of request" />
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

const mapStateToProps = state => ({
  Approved: state.ApprovedStatic
});
const mapDispatchToProps = dispatch => ({
  APPROVED_STATICS: payload => {
    dispatch(APPROVED_STATICS(payload));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
