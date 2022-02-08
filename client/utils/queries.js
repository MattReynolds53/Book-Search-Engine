import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        title
        bookId
        authors
        description
        image
        link
      }
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
