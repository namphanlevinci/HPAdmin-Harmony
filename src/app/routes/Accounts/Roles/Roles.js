import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';

//// DROPDOWN
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./Roles.css"

///
// const signalR = require("@aspnet/signalr");

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hubConnection: null
         }
    }
    // SIGNALR
    // componentDidMount = () => {
    //     let connection = new signalR.HubConnectionBuilder()
    //     .withUrl("http://api2.levincidemo.com/notification/", { accessTokenFactory: () => '212312' })
    //     .build();
    //     connection.start();
    //   };
    render() { 
        return ( 
            <div className="container-fluid RoleUI">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.roles"/>}/>
                <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography component="h2"><span className="roletitle">Administrator</span></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography gutterBottom noWrap>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography component="h2"><span className="roletitle">Manager</span></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography gutterBottom noWrap>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography component="h2"><span className="roletitle">Staff Level I</span></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography gutterBottom noWrap>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography component="h2"><span className="roletitle">Staff Level II</span></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography gutterBottom noWrap>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </div>
            </div>
         );
    }
}
 
export default Roles;