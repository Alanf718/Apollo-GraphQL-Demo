const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');

const PeopleType = new GraphQLObjectType({
    name: 'PeopleType',

    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        teams: { type: new GraphQLList(TeamType) }
    })
});

const TeamType = new GraphQLObjectType({
    name: 'TeamType',

    fields: () =>  ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        members: { type: new GraphQLList(PeopleType) }
    })
});

module.exports = {
    People: PeopleType,
    Team: TeamType
};
