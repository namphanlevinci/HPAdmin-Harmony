import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "./Logs.css"
import { getAll_Logs } from "../../../../actions/Logs/actions"
import { connect } from 'react-redux'
import "bootstrap/js/src/collapse.js";
//DATE PICKER & MOMENT
import "react-day-picker/lib/style.css";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'moment/locale/it';
import Moment from 'react-moment';
import moment from 'moment';
class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            User : '',
            search_user: ''
         }
    }
    getInitialState = () => {
        return {
          from: undefined,
          to: undefined,
        };
      }
      handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
      }
      handleResetClick = () => {
        this.setState(this.getInitialState());
      }
    componentDidMount() {
        this.props.getAll_Logs()
    }
    getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }
    _onChangeSearchUser = async (e) => {
        await this.setState({
            search_user: e.target.value
        });
    }
    render() {
        const { from , to} = this.state;
        const modifiers = { start: from, end: to}
        const valuez = { start: this.state.from, end: this.state.to}
        let dataList = this.props.LogList
        let UserList = this.props.LogList
        if (this.state.from) {
            dataList = dataList.filter((datez) => {
                const date = moment(datez.createdDate).format('dddd, MMMM Do YYYY')
                const from = moment(this.state.from).format('dddd, MMMM Do YYYY')
                const to = moment(this.state.to).format('dddd, MMMM Do YYYY')
                return (date === from && date === to) || date === from || date === to;

            })
        }

        if (this.state.search_user) {
            dataList = dataList.filter((e) => {
                let name = e.adminUser.firstName + ' ' + e.adminUser.lastName
                if (name === 'Tu123 Tran') {
                    return name === this.state.search_user
                } else if (name === 'Cuong Le') {
                    return name === this.state.search_user
                } else {
                    return name === this.state.search_user
                }
            })
        }
        let user = this.getUnique(UserList,"adminUserId")
        const renderUser = user.map((e) => {
            const name = e.adminUser.firstName + ' ' + e.adminUser.lastName
            const id = e.adminUser.waUserId
            return (
                <option key={id} value={name}>{name} </option>
            )
        })
        const renderDataList = dataList.map((e => {
            return (
                <tr key={e.approvalLogId} >
                        <td className="inside-table"><Moment format="dddd, MMMM Do YYYY, h:mm:ss a" >{e.createdDate}</Moment></td>
                        <td><span className="dot"></span></td>
                        <td className="box"><span className="arrow-left"></span><h3>Approve merchant request</h3> {e.isApproved === 1 ? 'Yes' : 'No'} </td>
                        <td className="box"><h3>merchant request from:</h3> {e.merchant.email}</td>
                        <td className="box"><h3>User</h3> {e.adminUser.firstName + ' ' +e.adminUser.lastName}</td>
                </tr>
            )
        }))
        return ( 
            <div className="container-fluid ">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="Logs"/>}/>
                <div className="LogContainer">
                    <div >
                        <h3>
                        <button data-toggle="collapse" data-target="#demo">FILTER</button>
                            <div id="demo" className="collapse">
                            <button className="link" onClick={this.handleResetClick}>Reset</button>
                            <span><DayPicker
                                className="Selectable"
                                numberOfMonths={2}
                                selectedDays={[from, { from, to }]}
                                value={valuez}
                                modifiers={modifiers}
                                onDayClick={this.handleDayClick}
                                /></span>
                            <select
                                 value={this.state.search_user}
                                 onChange={this._onChangeSearchUser}>
                                <option value="">ALL </option>
                                    {renderUser}
                            </select>
                        <button><i className="fa fas fa-filter"/> Apply </button>
                            </div>
                           
                        {/* <span>From<DayPickerInput formatDate={formatDate}
                                        parseDate={parseDate}
                                        placeholder="Date from" format="DD/MM/YYYY"/></span> */}
                        {/* <span>To <DayPickerInput formatDate={formatDate}
                                        parseDate={parseDate}
                                        placeholder="Date to" format="DD/MM/YYYY" /></span> */}
                        
                        </h3>        
                    </div>
                    <hr style={{borderBottom: '1px solid #3f51b5'}}></hr>
                    <div>
                        <h2>Server Time</h2>
                        <div className="LogContainerBody">
                        <table style={{ width:'95%' }}>
                           <thead>
                               <tr>
                                    <th style={{ width:'10%' }}></th>
                                    <th style={{ width:'7%' }}></th>
                                    <th style={{ width:'30%' }}></th>
                                    <th style={{ width:'25%' }}></th>
                                    <th style={{ width:'20%' }}></th>
                               </tr>   
                           </thead>
                           <tbody>
                               {renderDataList}
                           </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 

const mapStateToProps = (state) => ({
    InfoUser_Login: state.User,
    LogList: state.getLogs,
  });
  const mapDispatchToProps = (dispatch) => ({
    getAll_Logs: () => {
      dispatch(getAll_Logs())
    }
  });
  export default connect(mapStateToProps,mapDispatchToProps)(Logs);