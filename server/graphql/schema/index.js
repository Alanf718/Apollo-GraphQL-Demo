const {GraphQLSchema, GraphQLObjectType} = require('graphql');

const People = require('./people');
const Teams = require('./teams');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        people: People.Query,
        team: Teams.Query
    }
});

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',

    fields: () => ({
        promotePerson: People.Mutation.promotePerson,
        demotePerson: People.Mutation.demotePerson
    })
});


const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = ncSchema;
