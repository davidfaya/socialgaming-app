import React, { useContext } from 'react'
import {Grid, Transition, Image} from 'semantic-ui-react'
import {PostsContext} from '../context/posts'

import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import {AuthContext} from '../context/auth'


function Profile(props) {

    const {user} = useContext(AuthContext)
    const {posts} = useContext(PostsContext)

    console.log(user)
    if (user) posts = posts.filter(post => post.username === user.username)

    let markup = user ?
    (
    <Grid columns={2} divided>
        <Grid.Row className='page-title'>
            <h3>Your Profile</h3>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                {console.log(process.env.PUBLIC_URL + '/images/' + user.image)}
                <Image margin-left='100px' src={process.env.PUBLIC_URL + '/images/' + user.image}
                    className="ui large image"></Image>
            </Grid.Column>
        
            <Grid.Column>
                <Grid columns={1} divided>
                    {/* {console.log(posts)} */}
                    <Grid.Row className='page-title'>
                        <h3>Your Posts</h3>
                    </Grid.Row>
                    <Grid.Row>
                        {
                            user && (
                                <Grid.Column>
                                    <PostForm />
                                </Grid.Column>
                            )
                        }
                        <Transition.Group> { 
                            posts && posts.map(post => {
                                
                                return (    
                                <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                    {/* {console.log(post)} */}
                                    <PostCard post={post} />
                                </Grid.Column>
                                )
                                
                            })
                        }
                        </Transition.Group>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    ) : (<h3>Must be logged in!</h3>)

    return markup
}

export default Profile