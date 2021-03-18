import React, { useReducer, createContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_USER_QUERY } from '../utils/graphqlQueries'
import jwtDecode from 'jwt-decode'


const initialState = {
    user:null
}


const AuthContext = createContext({
    user: null,
    login: (loginData) => {},
    logout: () => {}
})


function authReducer(state, action) {
    switch(action.type) {
        
        case 'LOGIN':
            console.log(action.payload)
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user:null
            }
        default:
            return state
    }

}

function AuthProvider(props) {

    let cachedUserId
    if (localStorage.getItem('jwt')) {
        const decodedToken = jwtDecode(localStorage.getItem('jwt'))
        if (decodedToken.exp * 1000 < Date.now())
            localStorage.removeItem('jwt')
        else {
            cachedUserId = decodedToken.id
            console.log('jwt token user - ', decodedToken)
        }
    }

    
    const [state, dispatch] = useReducer(authReducer, initialState)
    const res = useQuery(FETCH_USER_QUERY, {
                
        variables: {
            userId: cachedUserId
        }
    })

    console.log(res)
    const {data} = res
    
    if (data) state.user = data.getUser

    useEffect(()=> {
        console.log('got user ' , data)
        if (data) state.user = data.getUser
    },[data, state])

    const login = (loginData) => {
        localStorage.setItem('jwt', loginData.token)
        console.log(loginData)
        dispatch({
            type:'LOGIN',
            payload: loginData
        })
    }
    const logout = () => {
        localStorage.removeItem('jwt')
        dispatch({
            type:'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider
            value={{user:state.user, login, logout}}
            {...props} 
        />
    )
}

export { AuthContext, AuthProvider }