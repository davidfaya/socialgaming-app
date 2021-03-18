import React from 'react'
import App from './App'
import { ApolloClient,InMemoryCache,createHttpLink,ApolloProvider }  from '@apollo/client'
import { setContext } from 'apollo-link-context'
require('dotenv').config()

console.log(process.env.BACK_END_HOST)
const host = process.env.BACK_END_HOST || "https://socialgaming-server.herokuapp.com/" //'http://localhost:5000'//
console.log('host:',host)
const httpLink = createHttpLink({

    
    uri: host
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