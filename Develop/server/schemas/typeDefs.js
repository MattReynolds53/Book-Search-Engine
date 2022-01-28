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
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    
  }

  type Mutation {
  
  }

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
