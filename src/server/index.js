const graphqlHTTP = require('express-graphql');
const schema = require("./schema");
const root = require("./resolvers/root");
const express = require('express');

async function main(){
    // The rootValue provides a resolver function for each API endpoint

    // Run the GraphQL query '{ hello }' and print out the response
    var app = express();
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));
    app.listen(4000);
}

main().catch((err) => console.log(err))