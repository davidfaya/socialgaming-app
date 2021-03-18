import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
mutation createPost($body:String!)
{
    createPost(body: $body) {
        id
        body
        createdAt
        username
        likes {
            username
            id
            createdAt
        }
        comments {
            id
            username
            body
            createdAt
        }
    }
}`

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

export const FETCH_SINGLE_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likes {
                username
            }
            comments {
                id
                username
                createdAt
                body
            }
        }
    } 
`
export const FETCH_POSTS_QUERY = gql`
{
    getPosts{
        id
        body
        createdAt
        username
        likes{
            id
            username
        }
        comments{
            id
            username
            createdAt
            body
        }
    }
}`

export const LIKE_POST_MUTATION = gql`
mutation likePost($postId:ID!)
{
    toggleLikePost(postId: $postId) {
        id
        username
        likes {
            username
            id
        }
    }
}`

export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

export const CREATE_COMMENT_MUTATION = gql`
    mutation ($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body){
            id
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

export const FETCH_USER_QUERY = gql`
    query($userId: ID!) {
        getUser(userId: $userId) {
            id
            email
            image
            createdAt
            username
        }
    } 
`

export const FETCH_USERS_QUERY = gql`
{
    getUsers{
        id
        username
        email
        image
        createdAt
    }
}`