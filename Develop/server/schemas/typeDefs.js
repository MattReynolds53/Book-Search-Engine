const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Books]!
  }

  type Books {
    _id: ID
    authors: String
    descriptions: String!
    bookId: ID!
    image: String
    link: String
    title: String!
  }

  type Query {
    user(_id: ID!): User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    savedBook(bookId: ID!): Book
    removeBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
