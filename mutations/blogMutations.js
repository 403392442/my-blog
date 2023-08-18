import {gql} from "@apollo/client";

const ADD_BLOG = gql`
    mutation addBlog($author: String!, $title: String!, $content: String!) {
        addBlog(author:$author, title:$title, content:$content) {
            title
        }
    }
`

const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $user: String!, $text: String!, $commentsAmount: Int!) {
        addComment(postId:$postId, user:$user, text:$text, commentsAmount:$commentsAmount) {
            user
        }
    }
`

const DELETE_COMMENT = gql`
    mutation deleteComment($id: ID!, $commentsAmount: Int!, $postId:ID!) {
        deleteComment(id:$id, commentsAmount:$commentsAmount, postId:$postId) {
            user
        }
    }
`
const UPDATE_COMMENT = gql`
    mutation updateComment($id: ID!, $text: String!) {
        updateComment(id:$id, text:$text) {
            user
        }
    }
`
export {ADD_BLOG, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT}