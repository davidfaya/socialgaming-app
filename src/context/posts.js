import React, { useReducer, createContext, useEffect } from 'react'
import { FETCH_POSTS_QUERY } from '../utils/graphqlQueries'
import { useQuery } from '@apollo/client'



var initialized = false

const initialState = {
    posts:[]
}


const PostsContext = createContext({
    posts: null,
    initPosts: () => {}, 
    addPost: (postData) => {},
    toggleLike: (postId, username) => {},
    deleteComment: (postId, commentId) => {},
    createComment: (postId, comments) => {},
    deletePost: (postId) => {}
})


function authReducer(state, action) {

    switch(action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: [...action.payload]
            }
        case 'ADD_POST':
            console.log(`add post ${action.payload}`)
            return {
                
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POST':
            console.log(`delete post ${action.payload}`)
            return {
                ...state,
                posts:[...state.posts.filter(post => post.id !== action.payload)]
            }
        case 'TOGGLE_LIKE':
            console.log('toggle like - ' , action.payload)
            let post = {...state.posts.find(post => post.id === action.payload.postId)}
            post.likes = [...post.likes]

            if (post.likes.find(like => like.username === action.payload.username)) {
                //post already liked,  unlike it
                post.likes = post.likes.filter((like) => like.username !== action.payload.username)
            } else {
                //Add like
                post.likes.push({
                    username: action.payload.username,
                    createdAt: new Date().toISOString()
                })
            }
            const updatedPosts = state.posts.map(itm => {
                if (itm.id === post.id)
                return post 
                else return itm
                })

            return {
                ...state,
                posts: updatedPosts
            }
        case 'DELETE_COMMENT':
            console.log('delete comment -', action.payload)

            let commentPost = {...state.posts.find(post => post.id === action.payload.postId)}
            commentPost.comments = [...commentPost.comments]

            commentPost.comments = commentPost.comments.filter((cmnt) => cmnt.id !== action.payload.commentId)

            console.log(commentPost)

            let newPosts = [...state.posts]

            const updatedCommentPosts = state.posts.map(itm => {
                if (itm.id === action.payload.postId)
                return commentPost 
                else return itm
                })
            
            console.log(newPosts)
            return {
                ...state,
                posts: updatedCommentPosts
                
            }
        case 'CREATE_COMMENT':
            console.log('create comment' , action.payload)
            let updatePost = {...state.posts.find(post => post.id === action.payload.postId)}
            updatePost.comments = [...action.payload.comments]
            console.log(updatePost)

            let newCommentPosts = state.posts.map(itm => {
                if (itm.id === updatePost.id)
                return updatePost 
                else return itm
                })
            
            console.log(newCommentPosts)
            return {
                ...state,
                posts: newCommentPosts
            }
        default:
            return state
    }

}


function PostsProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)
    const { data } = useQuery(FETCH_POSTS_QUERY)

    
    const addPost = (postData) => {
        dispatch({
            type:'ADD_POST',
            payload: postData
        })
    }
    const deletePost = (postId) => {
        dispatch({
            type:'DELETE_POST',
            payload: postId
        })
    }
    const toggleLike = (postId, username) => {
        dispatch({
            type:'TOGGLE_LIKE',
            payload: {postId, username}
        })
    }

    const deleteComment = (postId, commentId) => {
        dispatch({
            type:'DELETE_COMMENT',
            payload: {postId, commentId}
        })
    }
    const createComment = (postId, comments) => {
        dispatch({
            type:'CREATE_COMMENT',
            payload: { postId, comments }
        })
    }
    
    useEffect(()=> {
        if (data && !initialized){
            //console.log('initialzing context with data - ', data)
            initialized = true
            dispatch({
                type:'SET_POSTS',
                payload: data.getPosts
            })
        }
    }, [data])

    return (
        <PostsContext.Provider
            value={{posts:state.posts, addPost, deletePost, toggleLike, deleteComment, createComment}}
            {...props} 
        />
    )
}

export { PostsContext, PostsProvider }