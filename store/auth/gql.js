import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    user(username: $username, password: $password) {
      id
      token
      profile {
        status
        name
        birthday
      }
    }
  }
`

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      profile {
        status
        name
        birthday
      }
    }
  }
`

export const SAVE_PROFILE = gql`
  mutation profile($id: MID!, $input: ProfileInput) {
    profile(id: $id, input: $input) {
      token
      profile {
        name
        status
        birthday
      }
    }
  }
`
