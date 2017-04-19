import { deleteOneEntry } from '../../handlers/entryHandler';
import Joi from 'joi';

module.exports = {
    method: 'DELETE',
    path: '/entries/{id}',
    config: {
        // Include this API in swagger documentation
        tags: ['api'],
        description: 'Delete One Entry',
        notes: 'Delete One Entry',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: deleteOneEntry
};
