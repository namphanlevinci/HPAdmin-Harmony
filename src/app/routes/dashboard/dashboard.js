
import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from 'recharts';
import SaleBox from "components/SaleBox/index";

import DoughnutChart from "./DoughnutChart";
import ChartCard from "./ChartCard";
import {increamentData, lineData} from "./data"
import Portfolio from './Portfolio'

class Dashboard extends Component {
  constructor(props) {
      super(props);
      this.state = {  }
  }
  
  render() { 
   const chartData = [
      {name: 'J', amt: 600},
      {name: 'F', amt: 900},
      {name: 'M', amt: 1200},
      {name: 'A', amt: 800},
      {name: 'M', amt: 1100},
      {name: 'J', amt: 800},
      {name: 'J', amt: 1000},
      {name: 'A', amt: 1400},
    ];
      return ( 
        <div className="container-fluid">
            <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.Template"/>}/>
            <div className='row'>
                {/* //!! total merchant account */}
                <div className="col-xl-4 col-sm-6">
                  <SaleBox heading="Number of Merchant Account" title="8535" detail="Past 9 month data">
                    <BarChart data={chartData}>
                      <Bar dataKey='amt' fill='#3f51b5'/>
                      <XAxis stroke="#3f51b5" dataKey="name"/>
                    </BarChart>
                  </SaleBox>
                </div>


                                {/* // !!  new users this week */}
                                <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                  <SaleBox heading="New users this week" title="123" detail="Past last week">
                    <BarChart data={chartData}>
                      <Bar dataKey='amt' fill='#00FA9A'/>
                      <XAxis stroke="#3CB371" dataKey="name"/>
                    </BarChart>
                  </SaleBox>
                </div>
         
              {/* //!! Approved Merchant account this week */}
              <div className="col-xl-4 col-sm-6">
                  <SaleBox heading="Number of Merchant Account" title="1921" detail="Past 2 month data">
                    <BarChart data={chartData}>
                      <Bar dataKey='amt' fill='#00FA9A'/>
                      <XAxis stroke="#3CB371" dataKey="name"/>
                    </BarChart>
                  </SaleBox>
                </div>
              {/* //!! HarmonyPay accounts*/}
              <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                <ChartCard title="94" children={
                  <ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%" height={135}>
                    <AreaChart data={increamentData}
                              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                      <defs>
                        <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="5%" stopColor="#3f51b5" stopOpacity={1}/>
                          <stop offset="95%" stopColor="#1fb6fc" stopOpacity={1}/>
                        </linearGradient>
                      </defs>
                      <Area dataKey='pv' strokeWidth={0} stackId="2" stroke='#4D95F3' fill="url(#color3)"
                            fillOpacity={1}/>
                    </AreaChart>
                  </ResponsiveContainer>} styleName="up" desc="HarmonyPay Accounts"/>
              </div>
                {/* //!! user statistics */}
                <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                  <ChartCard title="38" children={
                    <ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%" height={135}>
                      <AreaChart data={increamentData}
                                margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <defs>
                          <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="5%" stopColor="#aa3c6d" stopOpacity={1}/>
                            <stop offset="95%" stopColor="#ff9800" stopOpacity={1}/>
                          </linearGradient>
                        </defs>
                          
                        <Area dataKey='pv' type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3'
                              fill="url(#color4)"
                              fillOpacity={1}/>
                      </AreaChart>
                    </ResponsiveContainer>} styleName="up" desc="User Statistics" />
                </div>
                  {/* //!! time spent */}
                  <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                    <ChartCard title="44" children={
                      <ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%" height={135}>
                        <LineChart data={lineData}
                                  margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                          <Line dataKey="pv" stroke="#3f51b5" dot={{stroke: '#3f51b5', strokeWidth: 2}}/>
                        </LineChart>
                      </ResponsiveContainer>} styleName="up" desc="Traffic raise from past year"/>
                  </div>
                       {/* // !!  amount user by zipcode*/}
                <div className="col-xl-8 col-lg-6 col-md-12 col-12">
                  <Portfolio/>
                </div>
                  {/* // !! number of request */}
                  <div className="col-xl-4 col-sm-6">
                            <div className="jr-card">
                              <div className="jr-card-header">
                                <h3 className="card-heading"><IntlMessages id="Number of request"/></h3>
                              </div>
                              <ResponsiveContainer width="100%">
                                <DoughnutChart/>
                              </ResponsiveContainer>
                              <div className="row">
                                <div className="col-6">
                                  <div className="media">
                                    <i className="zmdi zmdi-circle zmdi-hc-fw mr-2" style={{color: '#4169E1'}}/>
                                    <div className="media-body">
                                      <h5 className="mb-0">Approved</h5>
                                      <span className="jr-fs-sm text-muted">2038 request</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="media">
                                    <i className="zmdi zmdi-circle zmdi-hc-fw mr-2" style={{color: '#FF0000'}}/>
                                    <div className="media-body">
                                      <h5 className="mb-0">Rejected</h5>
                                      <span className="jr-fs-sm text-muted">250 request</span>
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

export default Dashboard;