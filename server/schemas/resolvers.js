const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get a single user by either their id or their username
    // How do I know when to use context and when to desctructure args?
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({}).populate("books");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // Resolvers from user-controller.js: addUser, loginUser, savedBook, removeBook
    //addUser
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    //loginUser
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    //savedBook
    //See if book works for the deconstructed args
    savedBook: async (parent, { book }, context) => {
      if (context.user) {
        // const book = await Book.create({
        //   bookId,
        //   title,
        //   author,
        // });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { books: book._id } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // remove a book from `savedBooks`
    removeBook: async (parent, args, context) => {
      if (context.user) {
        // const book = await Book.findOneAndDelete({
        //   _id: bookId,
        //   title,
        // });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { books: book._id } } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
