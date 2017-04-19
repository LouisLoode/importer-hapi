require( 'babel-core/register' );

const Async = require('async');
require('./config/database');
const EntryModel = require('./src/models/entry');
const Data = require('./config/data.json');

const seed = [];
for ( let i = 0; i < Data.length; ++i ) {
    seed.push((callback) => {

        const entry = new EntryModel(Data[i]); // Call save methods to save data into database
        entry.save((err, data) => {

            if (err) {
                console.log('Error during import');
                console.log(err);
            }
            else {
                console.log('Good import');
                callback(null, i);
            }
        });
    });
}

Async.series(seed, (err, results) => {

    if (err){
        console.log(err);
    }
    console.log('Import data in MongoDB done with ' + results.length + ' entries');

});
