import { putOneEntry } from '../../handlers/entryHandler';
import Joi from 'joi';

module.exports = {
    method: 'PUT',
    path: '/entries/{id}',
    config: { // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Update entry data',
        notes: 'Update entry data', // We use Joi plugin to validate request
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: { // Both name and age are required fields
                url: Joi.string(),
                title: Joi.string(),
                topic: Joi.string(),
                date: Joi.string(),
                img: Joi.string(),
                excerpt: Joi.string(),
                download: Joi.string(),
                translations: Joi.object().keys({
                    'France': Joi.string(),
                    'Germany': Joi.string(),
                    'Brazil': Joi.string(),
                    'Indonesia': Joi.string(),
                    'South Africa': Joi.string(),
                    'AR': Joi.string(),
                    '--': Joi.string(),
                    'ES': Joi.string(),
                    'FR': Joi.string()
                }),
                territories: Joi.array().items(Joi.string()),
                regions: Joi.array().items(Joi.string()),
                languages: Joi.array().items(Joi.string()),
                topics: Joi.array().items(Joi.string()),
                tags: Joi.array().items(Joi.string())
            }
        }
    },
    handler: putOneEntry
};
