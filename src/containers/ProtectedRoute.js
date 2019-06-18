import React from 'react'
import {Route,Redirect} from 'react-router-dom'

export const ProtectedRoute = ({component : Component,...rest})=>{
    return(
        <Route 
        {...rest}
        render = {
            props=>{
                if(JSON.parse(localStorage.getItem('User_login'))) {
                    return <Component {...props} />
                }    
                else
                    return <Redirect to={
                        {
                            pathname : "/signin",
                            state : {
                                from : props.location
                            }
                        }
                    } />
            }
        }
        />
    );
}