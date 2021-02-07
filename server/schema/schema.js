const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

var books = [
  { name: "a", genre: "aa", id: "1" },
  { name: "b", genre: "bb", id: "2" },
];
//Object type

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

//relacje

// RootQueries

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },

        resolve(parent, args) {
          //code to get data from db

          return books.find((book) => book.id == args.id);
        }
      }
    }
  }
);

module.exports = new GraphQLSchema({
  query: RootQuery,
});
