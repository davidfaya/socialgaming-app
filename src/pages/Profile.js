import React, { useContext, useState } from 'react'
import {Grid, Transition } from 'semantic-ui-react'
import {PostsContext} from '../context/posts'

import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import {AuthContext} from '../context/auth'
import { avatars }  from '../utils/avatars';


function Profile(props) {
    const [showModal, setShowModal] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const {user} = useContext(AuthContext)
    let {posts} = useContext(PostsContext)

    console.log(avatars)

    if (user) {
        posts = posts.filter(post => post.username === user.username)
    }
       
    

    function showAvatarModal() {
        setShowModal(true)
        setSelectedAvatar(user.image)
    }
    function closeAvatarModal()
    {
        //update user image with selected avatar
        setShowModal(false)
    }

    let markup = user ?
    (
    <Grid columns={2} divided>
        <Grid.Row className='page-title'>
            <h3>Your Profile</h3>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <div className='profile-image-content' onClick={showAvatarModal}>
                    <div className="content-overlay"></div>
                    {console.log(process.env.PUBLIC_URL + '/images/avatars/' + user.image)}
                    <img src={process.env.PUBLIC_URL + '/images/avatars/' + user.image} width='400px'></img>
                    
                    <div className="content-details fadeIn-top">
                        <h3>Change your Avatar</h3>
                    </div>
                </div>
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

    return (
        <React.Fragment>
        <div className={`${showModal ? 'modal-overlay show-modal' : 'modal-overlay'}`}>
            <div className='modal-container'>
                <div className="avatar-picker-container">
                    {avatars.map(avatar => 
                        <div  onClick={()=>setSelectedAvatar(avatar)}
                            className={`${selectedAvatar === avatar ? 'avatar-picker-item avatar-picker-selcted' : 'avatar-picker-item'}`}>  
                            <img src={process.env.PUBLIC_URL + '/images/avatars/' + avatar} width='85px'></img>
                        </div>)}
                </div>
                <button  width="100px" className='btn' onClick={closeAvatarModal}>
                    Set Avatar
                </button>
            </div>
            
        </div>
        {markup}
        </React.Fragment>
    ) 
}

export default Profile