import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      email
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($author: [String!], $description: String!, $title: String!, $bookId: ID!, $image: String!, $link: String!) {
    saveBook(author: $author, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
      _id
      author
      description
      title
      bookId
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`;
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      bookId
    }
  }
`;
