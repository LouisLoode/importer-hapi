import Boom from 'boom';
import EntryModel from '../models/entry';

const entryHandler = {

    deleteOneEntry(req, res) {

        //Fetch all data from mongodb User Collection
        EntryModel.findOneAndRemove({ _id: req.params.id }, (error, data) => {

            if (error) {
                res(Boom.serverUnavailable('Failed to delete data', error));
            }
            else {
                if (data === null){
                    res(Boom.notFound('Message Not Found'));
                }
                else {
                    res({ statusCode: 200, message: 'Entry Successfully Deleted', data });
                }
            }
        });
    },

    getAllEntries(req, res) {

        //Fetch all data from mongodb User Collection
        EntryModel.find({}, (error, data) => {

            if (error) {
                res(Boom.serverUnavailable('Failed to get data', error));
            }
            else {
                res({
                    statusCode: 200,
                    message: 'Entry Data Successfully Fetched',
                    data
                });
            }
        });
    },

    getOneEntry(req, res) {

        //Fetch all data from mongodb User Collection
        EntryModel.findOne({ _id: req.params.id }, (error, data) => {

            if (error) {
                res(Boom.serverUnavailable('Failed to get data', error));
            }
            else {
                if (data.length === 0) {
                    res(Boom.notFound('User Not Found', data));
                }
                else {
                    res({ statusCode: 200, message: 'Entry Data Successfully Fetched', data });
                }
            }
        });
    },

    putOneEntry(req, res) { // Create mongodb user object to save it into database

        // and pass callback methods to handle error
        EntryModel.findByIdAndUpdate(req.params.id, req.payload, { new: true, upsert:true }, (error, data) => {

            if (error) {
                res(Boom.serverUnavailable('Failed to put a message', error));
            }
            else {
                res({ statusCode: 200, message: 'Entry Saved Successfully', data });
            }
        });
    },

    postOneEntry(req, res) { // Create mongodb user object to save it into database

        const entry = new EntryModel(req.payload); // Call save methods to save data into database
        entry.save((err, data) => {

            if (err) {
                throw Boom.badRequest(err);
            }
            else {
                // If the user is saved successfully, issue a JWT
                res({ statusCode: 201, message: 'Entry successfully post', data }).code(201);
            }
        });
    }
};
module.exports = entryHandler;
