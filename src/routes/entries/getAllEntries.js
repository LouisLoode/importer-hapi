import { getAllEntries } from '../../handlers/entryHandler';

module.exports = {
    method: 'GET',
    path: '/entries',
    config: {
        tags: ['api'],
        description: 'Get All Entries',
        notes: 'Get All Entries',
        cache: {
            expiresIn: 15 * 1000,
            privacy: 'private'
        }
    },
    handler: getAllEntries
};
