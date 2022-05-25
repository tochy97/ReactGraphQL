const { buildSchema } = require('graphql');

const schema = buildSchema(`
    scalar Date

    input UserInput {
        first_name: String!
        last_name: String!
    }

    input PostInput {
        data: String!
    }

    type User {
        id: ID!
        first_name: String!
        last_name: String!
        admin: Boolean!
    }

    type Post {
        id: ID!
        data: String!
        created: Date!
        last_edited: Date!
    }

    type Query {
        hello: String
        getUser(id: ID!): User
    }

    type Mutation {
        createUser(input: UserInput!): User
        editUser(id:ID!, input: UserInput!): User
        createPost(input: PostInput!): Post
    }
`);

module.exports = schema;