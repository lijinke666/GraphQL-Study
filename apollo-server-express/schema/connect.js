const {makeExecutableSchema} = require('graphql-tools')
const types = require('./types')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
    typeDefs:types,
    resolvers
})

module.exports = schema