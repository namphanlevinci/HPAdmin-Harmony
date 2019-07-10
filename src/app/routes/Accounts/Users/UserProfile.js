import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import "./User.css"
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log("YEET", this.props.UserProfile)
        const e = this.props.UserProfile
        const renderProfile = e.waUserId !== undefined ? 
            <div>
                <h3>ID: {e.waUserId}</h3>
                <h3>Name: {e.firstName + ' ' + e.lastName}</h3>
                <h3>Email: {e.email}</h3>
                <h3>Address: {e.address}</h3>
                <h3>Role: {e.roleName}</h3>
            </div> : <Redirect to="/app/accounts/users" />
        return ( 
            <div className="container-fluid UserProfile">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.userProfile"/>}/>
                     {renderProfile}
            </div>
         );
    }
}
 

const mapStateToProps = (state) => ({
    UserProfile: state.ViewProfile_User
})

export default withRouter(connect(mapStateToProps)(UserProfile));