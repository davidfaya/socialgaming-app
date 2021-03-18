//Don't allow user to login/signup page if user is already logged in
import React from 'react'
import { Route } from 'react-router-dom'

//import {AuthContext} from '../context/auth'

function AuthRoute({component: Component, ...rest}) {

    // const {user} = useContext(AuthContext)
    // console.log(user)
    return (
        
        <Route
            
            {...rest}
            
            render = {props => <Component {...props} />}
            // render = {props => 
            //     user? <Redirect to='/' /> : <Component {...props} />     
            //     //redirect user to home page if already signed in
            // }
        />
    )

}

export default AuthRoute