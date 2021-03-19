import React, {useContext} from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import LikeButton from '../components/LikeButton'
import {AuthContext} from '../context/auth'
import DeleteButton from './DeleteButton'
import MyPopUp from '../utils/MyPopUp'
import { useUsersContext } from '../context/users'

function PostCard(props) {

    const {user} = useContext(AuthContext)
  
    const {users} = useUsersContext()

    
    const {body, createdAt, id, username, likes, comments} = props.post
    //console.log(props.post)
    const userImg = getUserImage(users, username)
    
    return (
        <div className='box-shadow-container'>
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src={process.env.PUBLIC_URL + '/images/avatars/' + userImg}
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`./posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                {body}
                </Card.Description>
                
            </Card.Content>
            <Card.Content extra>
                
                <LikeButton user={user} posts={{id, likes}} />
                
                <MyPopUp content='Comment on Post'>
                    <Button labelPosition='right' as={Link} to={`./posts/${id}`}>
                        <Button className='comment-button'>
                            <Icon name='comments' />
                        </Button>
                        <Label basic pointing='left'>
                            {comments.length}
                        </Label>
                    </Button>
                </MyPopUp>
                {user && user.username === username && <DeleteButton postId={id}/>}
            </Card.Content>
        </Card>
        </div>
    )
}

function getUserImage(users, username) {
    const usr = users.filter(usr => usr.username===username)
    if (usr[0])
        return usr[0].image
    else
        return ""
}
export default PostCard