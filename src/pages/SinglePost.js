import React, { useContext, useState, useRef } from 'react'
import moment from 'moment'
import { Image, Button, Grid, Card, Label, Icon, Form } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client'

import { FETCH_SINGLE_POST_QUERY, CREATE_COMMENT_MUTATION } from '../utils/graphqlQueries'

import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import { PostsContext } from '../context/posts'
import MyPopUp from '../utils/MyPopUp'


function SinglePost(props) {

    const {user} = useContext(AuthContext)
    const postsContext = useContext(PostsContext)
    const [comment, setComment] = useState('')
    const commentInputRef = useRef(null)

    const postId = props.match.params.postId
    const res = useQuery(FETCH_SINGLE_POST_QUERY, {
        
        variables: {
            postId
        }
    })
    const {data} = res

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update(_, res) {
            console.log(res)
            setComment('')
            commentInputRef.current.blur()
            postsContext.createComment(postId, res.data.createComment.comments)
        },  
        variables: {
            postId,
            body: comment
        }
    })
    function deleteButtonCallback() {
        props.history.push('/')
    }

    let postMarkup
    if (!postsContext.posts) {
        postMarkup = <p>Loading post..</p>
    } else {
        // const getPost = data.getPost
        // const {id, body, createdAt, username, likes, comments} = getPost

        const post = postsContext.posts.find(itm => itm.id === postId)
        
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <Image
                        src=""
                        size="small"
                        float="right"/>
                    </Grid.Column >
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{post.username}</Card.Header>
                                <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{post.body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} posts={{id:post.id, likes:post.likes}}/>
                                <MyPopUp content='Comment on post'>
                                    <Button 
                                        as="div"
                                        labelPosition="right"
                                        onClick={()=> console.log("add comment")} >

                                            <Button color="teal">
                                                <Icon name="comments" />
                                            </Button>
                                            <Label basic color="teal" pointing="left">
                                                {post.comments.length}
                                            </Label>
                                    </Button>
                                </MyPopUp>
                                {user && user.username === post.username && 
                                    <DeleteButton postId={post.id} commentcallback={deleteButtonCallback}/>}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a Comment</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input 
                                                type='text'
                                                laceholder='Comment...' 
                                                name='comment' 
                                                value={comment}
                                                onChange={event => setComment(event.target.value)}
                                                ref={commentInputRef}
                                                />
                                            <button 
                                                type='submit' 
                                                className='ui button purple'
                                                disabled={comment.trim()===''}
                                                onClick={createComment} > 
                                                    Submit
                                                </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {post.comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {/* {console.log(user, comment.username, comment )} */}
                                    {user && user.username === comment.username && 
                                        <DeleteButton postId={post.id} commentId={comment.id}/>}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                                    
                            </Card>
                        ))}
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup


}

export default SinglePost