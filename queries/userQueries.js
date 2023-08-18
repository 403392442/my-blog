import { gql } from "@apollo/client";

const GET_USER = gql`
    query getUser($username:String!, $password:String!) {
        getUser(username:$username, password:$password) {
            username
        }
    }
`

export {GET_USER}