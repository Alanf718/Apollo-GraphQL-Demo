const db = require('sqlite');

db.open('./server/sql/db/sqldb.sqlite')
    .then(() => {
        console.log('opening');

        db.all('SELECT * FROM People').then(results => {
            console.log(results);
        }).catch(err => console.log('error here', err));

        return db.migrate({ force: 'last', migrationsPath: './server/sql/migrations' })
    })
    .then(() => {
        db.all('SELECT * FROM People').then(results => {
            console.log(results);
        }).catch(err => console.log('error here', err));
    });
