import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "./Logs.css"
import { getAll_Logs } from "../../../../actions/Logs/actions"
import { connect } from 'react-redux'
//DATE PICKER & MOMENT
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate,} from 'react-day-picker/moment';
import 'moment/locale/it';
import Moment from 'react-moment';
class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            User : ''
         }
    }
    componentDidMount() {
        this.props.getAll_Logs()
    }
    render() {
        const dataList = this.props.LogList
        console.log(dataList)
        const renderDataList = dataList.map((e => {
            return (
                <tr key={e.approvalLogId} >
                        <td className="inside-table"><Moment format="dddd, MMMM Do YYYY, h:mm:ss a" >{e.createdDate}</Moment></td>
                        <td><span className="dot"></span></td>
                        <td className="box"><span className="arrow-left"></span><h3>Approve merchant request</h3> {e.isApproved === 1 ? 'Yes' : 'No'} </td>
                        <td className="box"><h3>merchant request from:</h3> {e.merchant.email}</td>
                        <td className="box"><h3>User</h3> {e.adminUser.firstName + e.adminUser.lastName}</td>
                </tr>
            )
        }))
        return ( 
            <div className="container-fluid ">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="Logs"/>}/>
                <div className="LogContainer">
                    <div >
                        <h3>
                        <span>From<DayPickerInput formatDate={formatDate}
                                        parseDate={parseDate}
                                        // placeholder={`${formatDate(new Date())}`}
                                        placeholder="Date from" format="DD/MM/YYYY"/></span>
                        <span>To <DayPickerInput formatDate={formatDate}
                                        parseDate={parseDate}
                                        placeholder="Date to" format="DD/MM/YYYY" /></span>
                        <select>
                            <option value="">User </option>
                            <option value="B">Banana</option>
                            <option value="C">Apple</option>
                        </select>
                        <button><i className="fa fas fa-filter"/> Apply </button>
                        </h3>        
                    </div>
                    <hr style={{borderBottom: '1px solid #3f51b5'}}></hr>
                    <div>
                        Server Time
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