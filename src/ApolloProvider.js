import React from 'react'
import App from './App'
import { ApolloClient,InMemoryCache,createHttpLink,ApolloProvider }  from '@apollo/client'
import { setContext } from 'apollo-link-context'
require('dotenv').config()

const httpLink = createHttpLink({
    uri: "https://socialgaming-server.herokuapp.com/"
})

const authLink = setContext(()=> {
    const token = localStorage.getItem("jwt")
    return {
        headers: {
            Authorization: token? `Bearer ${token}` : ''
        }
    }
})


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //link: httpLink,
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
) 