import { getOneEntry } from '../../handlers/entryHandler';
import Joi from 'joi';

module.exports = {
    method: 'GET',
    path: '/entries/{id}',
    config: {
        // Include this API in swagger documentation
        tags: ['api'],
        description: 'Get One Entry data',
        notes: 'Get One Entry data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: getOneEntry
};
