import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';

class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="Logs"/>}/>
            </div>
         );
    }
}
 
export default Logs;