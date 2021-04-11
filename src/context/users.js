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
        case 'UPDATE_USER': 
            console.log("Update User " , action.payload)
            let newUsers = state.users.slice()
            let updateUser = newUsers.filter(user => user.username === action.payload.username)
            updateUser.email = action.payload.email
            updateUser.image = action.payload.image

            let updatedUsers = state.users.map(usr => {
                if (usr.id === updateUser.id)
                    return updateUser 
                else return usr
                })

            return {
                ...state,
                users: updatedUsers
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

    const updateUser = ( user ) => {
        dispatch({
            type:'UPDATE_USER',
            payload: { user }
        })
    }

    return (
        <UsersContext.Provider
        value={{
            ...state,
            updateUser,
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
