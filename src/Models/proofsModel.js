const { Schema, model } = require('mongoose');

const proofsSchema = new Schema({
	code: { type: String },
	member: { type: String },
	message: { type: String },
	msgID: { type: String },
	channel: { type: String },
});

module.exports = model('proofs', proofsSchema);