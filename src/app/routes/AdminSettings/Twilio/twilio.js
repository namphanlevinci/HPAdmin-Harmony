import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "../Setting.css"
class Twilio extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="Twilio"/>}/>
                    <form className="form-style-7">
                        <h1>CHANGE TWILIO ACCOUNT</h1>
                            <ul>
                            <li>
                                <label for="PHONE">PHONE</label>
                                <input type="text" name="PHONE" maxlength="100" value="+112415784" />
                            </li>
                            <li>
                                <label for="ACCOUNTID">ACCOUNT ID</label>
                                <input type="text" name="ACCOUNTID" maxlength="100" value="123123123123"/>
                            </li>
                            <li>
                                <label for="TOKEN">TOKEN</label>
                                <input type="text" name="TOKEN" maxlength="100" value="12312312312312"/>
                            </li>
                            <li>
                                <input style={{cursor: "pointer"}} type="submit" value="UPDATE" />
                            </li>
                            </ul>
                    </form>
                </div>
         );
    }
}
 
export default Twilio;