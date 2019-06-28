import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
class SMTP extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log("YEET")
        return ( 
            <div className="container-fluid">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="SMTP"/>}/>
                <h1>SMTP</h1>    

            </div>
         );
    }
}
 
export default SMTP;