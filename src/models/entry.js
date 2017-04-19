import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

// set up a mongoose model
const EntrySchema = new Schema({
    url: {
        type: String,
        unique: true
    },
    title: {
        type: String
    },
    topic: {
        type: String
    },
    date: {
        type: String
    },
    img: {
        type: String
    },
    excerpt: {
        type: String
    },
    download: {
        type: String
    },
    translations: {
        'France': { type: String },
        'Germany': { type: String },
        'Brazil': { type: String },
        'Indonesia': { type: String },
        'South Africa': { type: String },
        'AR': { type: String },
        '--': { type: String },
        'ES': { type: String },
        'FR': { type: String }
    },
    territories: [
      { type: String }
    ],
    regions: [
      { type: String }
    ],
    languages: [
      { type: String }
    ],
    topics: [
      { type: String }
    ],
    tags: [
      { type: String }
    ]
},{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

/**
 * Middleware for updating the date.
 */
EntrySchema.pre('update',() => {

    this.update({},{ $set: { updated: new Date() } });

});


module.exports = Mongoose.model('Entry', EntrySchema);
