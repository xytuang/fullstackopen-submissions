const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/


const typeDefs = `
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }

  input AuthorInput {
    name: String!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: AuthorInput!
        genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!) : Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {

  Author: {
    bookCount: (root) => Book.countDocuments({name: root.name})
  },

  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre){
        return Book.find({}).populate('author')
      }
      const genre = args.genre
      return Book.find({genres: args.genre}).populate('author')
      
      
    },
    allAuthors: async () => {
      return Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser){
          throw new GraphQLError('not authenticated', {
            extensions: 'BAD_USER_INPUT'
          })
        }
        const foundBook = await Book.findOne({title: args.title})
        const foundAuthor = await Author.findOne({name: args.author.name})
        if (foundBook){
          throw new GraphQLError('book has already been added', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title
            }
          })
        }
        if (!foundAuthor){
          const author = new Author({...args.author})
          try{
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author.name,
                error
              }
            })
          }
          
        }
        const foundAuthor2 = await Author.findOne({name: args.author.name})
        const book = new Book({...args, author: foundAuthor2})
        try{
          await book.save()
        } catch (error){
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title
            }
          })
        }
        return book
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {code: 'BAD_USER_INPUT'}
        })
      }
      const author = await Author.findOne({name: args.name})
      if (!author){
          return null
      }
      author.born = args.setBornTo
      return author.save()
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new GraphQLError('creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret'){
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, 'secretkey')}
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), 'secretkey'
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})