import { gql } from "@apollo/client";

const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $confirmPassword: String!) {
        addUser(username:$username, password:$password, confirmPassword:$confirmPassword){
            username
        }
    }
`

export { ADD_USER }