const { Schema, model } = require('mongoose');

const countSchema = new Schema({
	member: { type: String },
	number: { type: Number },
});

module.exports = model('count', countSchema);