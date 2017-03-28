const {GraphQLString, GraphQLList} = require('graphql');
const uuid = require('uuid/v1');
const random_name = require('node-random-name');
const Types = require('../types');

const TeamQuery = {
    type: new GraphQLList(Types.Team),
    // type: new GraphQLList(TeamType),
    description: 'Long live the teams!',
    args: {
        name: {
            type: GraphQLString
        }
    },
    resolve: (obj, args, { db }) => {
        return db.all(`SELECT * FROM Teams
                    ${ args.name ? 'where name = \'' + args.name + '\'': ''}`).then(results => {
            return Promise.all(results.map(itm => {
                return db.all(`select People.id, People.name from People
                                left join Members on Members.peopleId = People.id
                                where Members.teamId = ${itm.id}`).then(memberResults => {
                    return {id: itm.id,
                        name: itm.name,
                        members: memberResults}
                });
            })).then(results => {
                return results;
            });
        });
    }
};

const TeamMutation = {
    type: Types.Team,
    resolve: (obj, args, { json }) => {
        const input = {id: uuid(),
            name: random_name(),
            age: Math.floor(Math.random()*88) + 13,
            intelligence: Math.floor(Math.random()*10) + 1,
            strength: Math.floor(Math.random()*10) + 1,
            charisma: Math.floor(Math.random()*10) + 1,
            worth: Math.floor(Math.random()*1000000) + 1,
            x: Math.floor(Math.random()*10),
            y: Math.floor(Math.random()*10)
        };

        console.log(input);
        json('people').post(input);
        // just return the info you inserted, ideally we would just be
        // returning the output from json as return json('pokemon').post(....
        return input;
    }
}

module.exports = {
    Type: Types.Team,
    Query: TeamQuery,
    Mutation: TeamMutation
};
