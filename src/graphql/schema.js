export const typeDefs = `
  type File {
    name: String!
    path: String!
    isDirectory: Boolean!
    size: Int
  }

  type OperationResult {
    success: Boolean!
    message: String
  }

  type Query {
    getFiles(path: String!): [File]!
  }

  type Mutation {
    createDirectory(path: String!, name: String!): OperationResult!
    uploadFile(path: String!, name: String!, content: String!): OperationResult!
    deleteItem(path: String!): OperationResult!
    moveItem(sourcePath: String!, destinationPath: String!): OperationResult!
  }
`