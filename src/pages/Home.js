import React, { useEffect, useState, useContext } from 'react'
import { useQuery } from '@apollo/client'
import {Grid, Transition} from 'semantic-ui-react'
import PostCard from '../components/PostCard' 
import {AuthContext} from '../context/auth'
import {PostsContext} from '../context/posts'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../utils/graphqlQueries'
import { set } from 'mongoose'


function Home() {

    const {user} = useContext(AuthContext)
    const {posts} = useContext(PostsContext)

    const [loading, setLoading] = useState(true)

    useEffect(()=> {  
        if (posts) {
            setLoading(false)
        }
    }, [posts])
    
    console.log('Rendering')

    return (
        
    <Grid columns={3} divided>
        {/* {console.log(posts)} */}
        <Grid.Row className='page-title'>
            <h1>Post Feed</h1>
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
                <Transition.Group> { 
                    posts && posts.map(post => ( 
                        
                        <Grid.Column key={post.id} style={{marginBottom: 20}}>
                            {/* {console.log(post)} */}
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                }
                </Transition.Group>
            
            )}
            
        </Grid.Row>
    </Grid>
    )
}



export default Home