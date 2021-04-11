import React, { useContext, useState, useEffect } from 'react'
import {Grid, Transition, Image } from 'semantic-ui-react'
import {PostsContext} from '../context/posts'

import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import {AuthContext} from '../context/auth'
import { avatars }  from '../utils/avatars';
import {useMutation} from '@apollo/client'
import { UPDATE_USER } from '../utils/graphqlQueries'
import { useUsersContext } from '../context/users'


function Profile(props) {
    const [showModal, setShowModal] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const {user} = useContext(AuthContext)
    let {posts} = useContext(PostsContext)
    const {updateUser} = useUsersContext()


    if (user) {
        posts = posts.filter(post => post.username === user.username)
    }
       
    function showAvatarModal() {
        setShowModal(true)
    }

    useEffect(()=> {
        //console.log('got user ' , data)
        if (user) setSelectedAvatar(user.image)
    },[user])

    console.log('redering profile')
    const [setUser, {error}] = useMutation(UPDATE_USER,
    {
        variables: {
            username:user.username,
            email:user.email,
            image: selectedAvatar
        },
        update(proxy, result) {
            console.log(result)
            updateUser({
                    username:user.username,
                    email:user.email, 
                    image:selectedAvatar})
            
        },
        onError(err) {
            console.log(err)
            error && console.log(error)
        }
    })
    function closeAvatarModal()
    {
        setUser()
        setShowModal(false)
    }

    let markup = user ?
    (
    <Grid columns={2} divided>
        <Grid.Row className='page-title'>
            <h3>{user.username}'s Profile</h3>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <div className='profile-image-content' onClick={showAvatarModal}>
                    <div className="content-overlay"></div>
                    <img alt="avatar" src={process.env.PUBLIC_URL + '/images/avatars/' + user.image} width='100%'></img>
                    
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
                                    <PostCard post={post} image={user.image} />
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
                        <div onClick={()=> setSelectedAvatar(avatar)}
                            className={`${selectedAvatar === avatar ? 'avatar-picker-item avatar-picker-selcted' : 'avatar-picker-item'}`}>  
                            {/* <img alt="avatar" src={process.env.PUBLIC_URL + '/images/avatars/' + avatar}></img> */}
                            <Image
                                size='tiny'
                                src={process.env.PUBLIC_URL + '/images/avatars/' + avatar}
                                />
                        </div>)}
                </div>
                <button  width="100px" className='modal-btn' onClick={closeAvatarModal}>
                    Set Avatar
                </button>
            </div>
            
        </div>
        {markup}
        </React.Fragment>
    ) 
}

export default Profile