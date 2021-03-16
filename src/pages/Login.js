import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql  from 'graphql-tag'
import { useForm } from '../utils/hooks'

import {AuthContext} from '../context/auth'
 
function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const initialState = {
        username:'',
        password: ''
    }

    const {onChange, onSubmit, values}  = useForm(loginUserCallBack, initialState)
    
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result)
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err) {
            console.log(err)
            if(err.graphQLErrors[0] !== undefined)
                setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    //In JavaScript defining as function allows for use of registerUser on line 20
    //Can't use addUser from line 22 becauase it's a const, won't allo us to use it in previous lines
    function loginUserCallBack() {
        loginUser()
    }

    

    return (
        <div className="signup-container">
            <Form onSubmit={onSubmit} noValidate className={loading? 'loading': ''}>
                <h2>Login</h2>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange} />
                
                <Form.Input
                    type='password'
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange} />
                
                <Button type='submit' primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                <ul className='list'>
                    {Object.values(errors).map(value => {
                        console.log(`Error -  ${value}`)
                        return (
                            <li key={value}>{value}</li>
                        )
                    })}
                </ul>
            </div>
            )}
            
        </div>
    )
}


const LOGIN_USER = gql`
    mutation login(
        $username:String!
        $password:String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id
            email
            username
            createdAt
            token

        }
    }

`

export default Login