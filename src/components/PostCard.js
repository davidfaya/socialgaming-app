import React, {useContext} from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import LikeButton from '../components/LikeButton'
import {AuthContext} from '../context/auth'
import DeleteButton from './DeleteButton'
import MyPopUp from '../utils/MyPopUp'

function PostCard(props) {

    const {user} = useContext(AuthContext)
  
    
    const {body, createdAt, id, username, likes, comments} = props.post
    //console.log(props.post)
    
    return (
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
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
                        <Button color='teal'>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='teal' pointing='left'>
                            {comments.length}
                        </Label>
                    </Button>
                </MyPopUp>
                {user && user.username === username && <DeleteButton postId={id}/>}
            </Card.Content>
        </Card>
    )
}
export default PostCard