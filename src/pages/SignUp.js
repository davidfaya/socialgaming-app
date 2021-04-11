import React, { useContext, useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks'
import { SIGN_UP_USER } from '../utils/graphqlQueries'
import {AuthContext} from '../context/auth'


function SignUp(props) {

    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const initialState = {
        username:'',
        email: '',
        password: '',
        confirmPassword: ''

    }

    const {onChange, onSubmit, values}  = useForm(registerUser, initialState)
    
    const [addUser, { loading }] = useMutation(SIGN_UP_USER, {
        update(_, result) {
            console.log(result)
            context.login(result.data.register)
            setErrors({})
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
    function registerUser() {
        addUser()
    }

    

    return (
        <div className="signup-container">
            <Form onSubmit={onSubmit} noValidate className={loading? 'loading': ''}>
                <h2>Register</h2>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange} />
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange} />
                <Form.Input
                    type='password'
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange} />
                <Form.Input
                    type='password'
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={onChange} />
                <button  type='submit' className='btn'>
                    Sign Up
                </button>
                
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




export default SignUp