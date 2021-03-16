import React, {useState, useContext} from 'react'
import {  Button, Icon, Confirm } from 'semantic-ui-react'
import { useMutation  } from '@apollo/client'
import { DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../utils/graphqlQueries'
import { PostsContext } from '../context/posts'
import MyPopUp from '../utils/MyPopUp'



function DeleteButton({postId, commentId, callback}) {
    const postsContext = useContext(PostsContext)

    const mutation = commentId ? DELETE_COMMENT_MUTATION: DELETE_POST_MUTATION
    const [confirmModal, setConfirmModal] = useState(false)
    
    
    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy, result) {
            //console.log(result)
            setConfirmModal(false)
            if (!commentId) {
                console.log('deleting post ', postId)
                postsContext.deletePost(postId)
            } else {
                console.log('deleting comment ', commentId)
                postsContext.deleteComment(postId, commentId)
            }

            if (callback) callback()

        },
        variables: {
            postId,
            commentId,
        }
    })

    return (
        <React.Fragment>
            <MyPopUp  
                content={commentId? 'Delete Comment' : 'Delete Post'} >
                <Button as='div' 
                    color='red' 
                    floated='right'
                    onClick={()=> setConfirmModal(true)}>
                    <Icon name='trash' style={{ margin:0 }}/>
                </Button>
            </MyPopUp>
            <Confirm
                open={confirmModal}
                onCancel={()=> setConfirmModal(false)}
                onConfirm={deletePostOrComment}
            />
        </React.Fragment>
    )
}


export default DeleteButton

