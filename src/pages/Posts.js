
import React, { useContext } from 'react'
import {Grid, Transition} from 'semantic-ui-react'
import PostCard from '../components/PostCard' 
import {AuthContext} from '../context/auth'
import {PostsContext} from '../context/posts'
import PostForm from '../components/PostForm'
import {useUsersContext} from '../context/users'


function Posts() {

    const {user} = useContext(AuthContext)
    const {loading, posts} = useContext(PostsContext)
    const {users} = useUsersContext()
    
    
    console.log('Rendering Posts')

    return (
        
    <Grid columns={1} divided>
        {/* {console.log(posts)} */}
        <Grid.Row className='page-title'>
            {user? (<h2>Welcome {user.username}</h2> ) :
            (<h2>Posts</h2>)}
        </Grid.Row>
        <Grid.Row>
            {
                user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )
            }
            
            {loading? (<h1>Loading...</h1>) : (
                
                <Transition.Group> 
                    <h3>Post Feed</h3>
                    { 
                    posts && posts.map(post => ( 
                        
                        <Grid.Column key={post.id} style={{marginBottom: 20}}>
                            {/* {console.log(post)} */}
                            <PostCard post={post} image={getUserImage(users, post.username)}/>
                        </Grid.Column>
                    ))
                }
                </Transition.Group>
            
            )}
            
        </Grid.Row>
    </Grid>
    )
}
function getUserImage(users, username) {
    
    const usr = users.filter(usr => usr.username===username)
    if (usr[0])
        return usr[0].image
    else
        return ""
}


export default Posts