import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import "./profile.css"

class proFile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const  User = this.props.InfoUser_Login.User.userAdmin
        console.log("YEET", this.props.InfoUser_Login.User)
        return (  
            <div className="container ProfileCSS">
               <h2>Name: {User.firstName + ' ' + User.lastName}</h2>
               <h2>Email: {User.email}</h2>
               <h2>Birthday: {User.birthDate}</h2>
               <h2>Phone: {User.phone}</h2>
               <h2>Address: {User.address}</h2>
            </div>
         );
    }
}
 
const mapStateToProps = (state) => ({
    InfoUser_Login: state.User,
  });
export default withRouter(connect(mapStateToProps)(proFile));