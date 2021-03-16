import React, {useContext} from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import {useMutation} from '@apollo/client'
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphqlQueries'
import { PostsContext } from '../context/posts'


function PostForm(props) {

    const postsContext = useContext(PostsContext)

    const {values, onChange, onSubmit} = useForm(createPostCallback, 
        {
            body:''
        })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION,
        {
            
            variables: values,
            update(proxy, result) {
                console.log(result)
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                  })

                postsContext.addPost(result.data.createPost)
                //const allPosts = [result.data.createPost, ...data.getPosts]
                //console.log(allPosts)
                //if (props) props.setPostHandler(allPosts)
                  
                
            },
            onError(err) {
                console.log(err)
            }
        })

    function createPostCallback() {
        createPost()
    }

    return (
        <React.Fragment>
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input
                    placeholder = "Hi World"
                    name = "body"
                    onChange = {onChange}
                    value = {values.body}
                    error = {error? true : false}
                    />
                    <Button type='submit' color = 'purple'>
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
        </React.Fragment>
    )

}


export default PostForm