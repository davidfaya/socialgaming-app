import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import {  Button, Icon, Label } from 'semantic-ui-react'
import { useMutation  } from '@apollo/client'
import { LIKE_POST_MUTATION } from '../utils/graphqlQueries'
import {PostsContext} from '../context/posts'
import MyPopUp from '../utils/MyPopUp'


function LikeButton({user, posts: {id, likes}}) {
    const postsContext = useContext(PostsContext)
    const [numLikes, setNumLikes] = useState(likes.length)
    const [liked, setLiked] = useState(false)

    useEffect(()=> {
        if (user && likes.find(like => like.username === user.username)) 
            setLiked(true)
        else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION,
        {
            variables: { postId : id },
            update(_, {data}){
                setLiked(!liked)
                setNumLikes(data.toggleLikePost.likes.length)
                
                postsContext.toggleLike(data.toggleLikePost.id, user.username)
            } 
        })

    
    const showLikeButton = user ? (
        liked ? (
          <Button color="purple" onClick={likePost}>
            <Icon name="heart" />
          </Button>
        ) : (
          <Button color="purple" onClick={likePost} basic>
            <Icon name="heart" />
          </Button>
        )
      ) : (
        <Button as={Link} to="/login" color="purple" basic>
          <Icon name="heart" />
        </Button>
      );

    return (
        <React.Fragment>
          <MyPopUp content={liked ? 'Unlike' : 'Like'}>
              <Button as='div' labelPosition='right'>
                  {showLikeButton}
                  <Label basic color='purple' pointing='left'>
                      {numLikes}
                  </Label>
              </Button>
            </MyPopUp>
        </React.Fragment>
    )

}

export default LikeButton