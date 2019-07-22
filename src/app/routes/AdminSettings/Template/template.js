import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.Template"/>}/>
                <div style={{textAlign: 'center'}}>
                    <h1>COMING SOON</h1>
                </div>  
            </div>
         );
    }
}
 
export default Template;