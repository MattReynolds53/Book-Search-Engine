import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    user {
      _id
      username
      email
      bookCount
      savedBooks
    }
  }
`;

// export const QUERY_BOOK = gql`
//   query books($_id: String) {
//     books(_id: $_id) {
//       _id
//       bookId
//       authors
//       descriptions
//       titleimage
//       link
//     }
//   }
// `;
