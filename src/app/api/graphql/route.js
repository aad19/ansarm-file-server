
import { createYoga } from 'graphql-yoga'
import { resolvers } from '@/graphql/resolvers'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const typeDefs = readFileSync(join(process.cwd(), 'src/graphql/schema.graphql'), 'utf8')

const { handleRequest } = createYoga({
  schema: {
    typeDefs,
    resolvers
  },
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response }
})

export { handleRequest as GET, handleRequest as POST }