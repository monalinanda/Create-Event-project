const Event = require('../models/Event');
const Client = require('../models/Client');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  graphql,
} = require("graphql");

//Events Type
const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    duration: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString }
    }),
  });

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find();
      },
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Event.findById(args.id);
      },
    },
    clients:{
        type: new GraphQLList(ClientType),
        resolve(parent, args){
            return Client.find();
        }
    },
    client:{
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args){
            return Client.findById(args.id);
        }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
