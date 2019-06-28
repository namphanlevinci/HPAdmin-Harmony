import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
class Twilio extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="Twilio"/>}/>
                <h1>TWILIO</h1>
            </div>
         );
    }
}
 
export default Twilio;