const {GraphQLString, GraphQLList, GraphQLInt} = require('graphql');
const Types = require('../types');

const PeopleQuery = {
    type: new GraphQLList(Types.People),
    description: 'Long live the people!',
    args: {
        name: {
            type: GraphQLString
        }
    },
    resolve: (obj, args, { db }) => {
        return db.all(`SELECT People.id as id, People.name as name, Roles.name as role FROM People 
                        left join Roles on Roles.id = People.roleId
                        ${ args.name ? 'where name = \'' + args.name + '\'': ''}`).then(results => {
            return Promise.all(results.map(itm => {
                return db.all(`select Teams.id, name from Teams
                    left join Members on Members.teamId = Teams.id
                    where Members.peopleId = ${itm.id}`).then(teamResults => {
                    return {id: itm.id,
                        name: itm.name,
                        role: itm.role,
                        teams: teamResults};
                });
            })).then(results => {
                return results;
            });
        });
    }
};

const promotePerson = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLString }
    },
    resolve: (obj, args, { db }) => {
        return db.run(`UPDATE People SET roleId = roleId + 1 where name = '${args.name}'`).then(results => {
            return `${results.stmt.changes} ${args.name} updated`;
        }).catch(err => {
            console.log(`Error`, err);
        });
    }
};

const demotePerson = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLString }
    },
    resolve: (obj, args, { db }) => {
        return db.run(`UPDATE People SET roleId = roleId - 1 where name = '${args.name}'`).then(results => {
            return `${results.stmt.changes} ${args.name} updated`;
        }).catch(err => {
            console.log(`Error`, err);
        });
    }
};

const removePerson = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLString }
    },
    resolve: (obj, args, { db }) => {
        return db.run(`DELETE People where name = '${args.name}'`).then(results => {
            return `${results.stmt.changes} ${args.name} removed`;
        }).catch(err => {
            console.log(`Error`, err);
        });
    }
};

const addPerson = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLString },
        role: { type: GraphQLInt }
    },
    resolve: (obj, args, { db }) => {
        return db.run(`INSERT INTO People (id, name, roleId) VALUES (1, '${args.name}', ${args.role});`).then(results => {
            return `${results.stmt.changes} ${args.name} inserted`;
        }).catch(err => {
            console.log(`Error`, err);
        });
    }
};

module.exports = {
    Type: Types.People,
    Query: PeopleQuery,
    Mutation: {
        promotePerson,
        demotePerson
    }
};
