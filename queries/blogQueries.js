import {gql} from "@apollo/client";

const GET_BLOGS = gql`
    query getBlogs {
        getBlogs {
            id
            author
            title
            date
            content
            commentsAmount
        }
    }
`;

const GET_BLOG = gql`
    query getBlog($postId: ID!) {
        getBlog(postId:$postId) {
            author
            title
            date
            content
            comments {
                id
                user
                date
                text
            }
        }
    }
`

export {GET_BLOGS, GET_BLOG}