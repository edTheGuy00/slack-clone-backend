import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const app = express();

const graphqlEndPoint = '/graphql';

// bodyParser is needed just for POST.
app.use(graphqlEndPoint, bodyParser.json(), graphqlExpress({ schema: schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndPoint }));

app.listen(8080);