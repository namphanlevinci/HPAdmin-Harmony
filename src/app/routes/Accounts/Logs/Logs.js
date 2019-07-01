import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "./Logs.css"

//DATE PICKER & MOMENT
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate,} from 'react-day-picker/moment';
import 'moment/locale/it';
class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            User : ''
         }
    }
    render() { 
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
                    </div>
            </div>
         );
    }
}
 
export default Logs;