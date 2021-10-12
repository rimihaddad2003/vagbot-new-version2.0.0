const { Schema, model } = require('mongoose');

const suggSchema = new Schema({
	code: { type: String },
	member: { type: String },
	message: { type: String },
});

module.exports = model('suggestions', suggSchema);