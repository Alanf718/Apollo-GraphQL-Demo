const fs = require('fs');
const ncSchema = require('./schema');
const {graphql} = require('graphql');
const {introspectionQuery} = require('graphql/utilities');
const app = require('express')();
const db = require('sqlite');
const bodyParser = require('body-parser');

db.open('./server/sql/db/sqldb.sqlite').then(() => {

    console.log('db opened');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/graphql', (req, res) => {
        const requestData = req.body;

        if(Array.isArray(requestData)){
            const requests = requestData.map(
                request => ({query: request.query, variables: request.variables ? request.variables : {}})
            );

            Promise.all(
                requests.map(r => graphql(ncSchema, r.query,
                    {}, { db }, r.variables))
            ).then(results => {
                res.status(200).send(results);
            });
        } else {
            require('express-graphql')({ // needed to expose graphql via http
                schema: ncSchema,
                graphiql: true, // flag should only be set for the dev environment so you can have your graphql editor
                context: {
                    db
                }
            })(req, res);
        }
    });

    const PORT = process.env.PORT || 3010;
    app.listen(PORT);

    /**
     * If we were using relay we would require to export our database schema to a json file which our client will need
     * to import
     */
    graphql(ncSchema, introspectionQuery).then(results => {
        fs.writeFile(__dirname + '/data/schema.json', JSON.stringify(results, null, 2), err => {
            if(err)
                throw err;
            console.log('JSON Schema created');
        });
    });

    console.log('GraphQL Layer running @ port :' + PORT);
}).catch(console.log);

