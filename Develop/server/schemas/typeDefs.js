const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: String!
    savedBooks: [Books]!
  }

  type Books {
    _id: ID
    bookId: ID!
    authors: [String!]
    descriptions: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedBook(author: [String!], description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
