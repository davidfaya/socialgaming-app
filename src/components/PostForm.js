import React, {useContext} from 'react'
import { Form, Button, Card } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import {useMutation} from '@apollo/client'
import { CREATE_POST_MUTATION } from '../utils/graphqlQueries'
import { PostsContext } from '../context/posts'


function PostForm(props) {

    const postsContext = useContext(PostsContext)

    const {values, onChange, onSubmit, clearForm} = useForm(createPostCallback, 
        {
            body:''
        })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION,
        {
            
            variables: values,
            update(proxy, result) {
                console.log(result)
                
                clearForm()
                postsContext.addPost(result.data.createPost)
                
            },
            onError(err) {
                console.log(err)
            }
        })

    function createPostCallback() {
        createPost()
    }

    return (
        <div className="create-post-container ">
            <Card fluid>
                <Card.Content>
                    <Form onSubmit={onSubmit}>
                        <h3>Create a Post</h3>
                        <Form.Field>
                            <Form.Input
                                placeholder = "Hi World"
                                name = "body"
                                onChange = {onChange}
                                value = {values.body}
                                error = {error? true : false}
                                />
                                <Button type='submit' primary>
                                    Submit
                                </Button>
                        </Form.Field>
                    </Form>
                    {error && (
                        <div className='ui error message' style={{marginBottom:20}}>
                            <ul className= 'list'>
                                <li>{(error.graphQLErrors[0]) ? error.graphQLErrors[0].message : ''}</li>
                            </ul>
                        </div>
                    )}
                </Card.Content>
            </Card>
        </div>
    )

}


export default PostForm