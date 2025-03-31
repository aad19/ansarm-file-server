import { createYoga } from 'graphql-yoga'
import { resolvers } from '@/graphql/resolvers'
import { typeDefs } from '@/graphql/schema'

const { handleRequest } = createYoga({
  schema: {
    typeDefs,
    resolvers
  },
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response }
})

export { handleRequest as GET, handleRequest as POST }