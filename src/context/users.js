import React, { useContext, useReducer, useEffect } from 'react'
import { FETCH_USERS_QUERY } from '../utils/graphqlQueries'
import { useQuery } from '@apollo/client'

const UsersContext = React.createContext()

const initialState = {
  loading: false,
  users: [],
}

function usersReducer(state, action) {

    switch(action.type) {
        case 'SET_USERS': 
            return {
                ...state,
                users: [...action.payload]
            }
        default:
            return {
                ...state
            }

    }
}


const UsersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, initialState)
    const { loading, data } = useQuery(FETCH_USERS_QUERY)
    
    console.log(loading)
    
    
    useEffect(() => {
        if (data)
            dispatch({ type: 'SET_USERS', payload: data.getUsers })
    },[data])

    
    return (
        <UsersContext.Provider
        value={{
            ...state,
        }}
        >
        {children}
        </UsersContext.Provider>
    )
}
// make sure use
export const useUsersContext = () => {
    return useContext(UsersContext)
}

export { UsersContext, UsersProvider }
