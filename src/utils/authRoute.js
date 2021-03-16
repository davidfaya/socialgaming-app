//Don't allow user to login/signup page if user is already logged in
import React, {useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'

import {AuthContext} from '../context/auth'

export function AuthRoute({component: Component, ...rest}) {

    const {user} = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render = {props => 
                user? <Redirect to='/' /> : <Component {...props} />     
                //redirect user to home page if already signed in
            }
        />
    )

}

//export default AuthRoute