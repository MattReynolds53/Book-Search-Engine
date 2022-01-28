const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolver = {

    Query: {
        // get a single user by either their id or their username
        // How do I know when to use context and when to desctructure args?
        user: async (parent, args, context) => {
            return User.findOne({ username, _id }).populate('books');
        }
    },


      Mutation: {
          // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
          loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
            },

            // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
            savedBook: async (parent, { book }, context) => {
                if (context.user) {
                    const book = await Book.create({
                        bookId,
                        title,
                        author,
                    });
  
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { books: book._id } }
                    );
  
                    return book;
                }
                throw new AuthenticationError('You need to be logged in!');
            },

            // remove a book from `savedBooks`
            removeBook: async (parent, { thoughtId }, context) => {
                if (context.user) {
                    const book = await Book.findOneAndDelete({
                        _id: bookId,
                        title,
                    });
  
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { books: book._id } }
                    );
  
                    return book;
                }
                throw new AuthenticationError('You need to be logged in!');
            },
        }
}

module.exports = resolvers;