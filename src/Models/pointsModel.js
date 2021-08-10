const { Schema, model } = require('mongoose');

const pointsSchema = new Schema({
	staff: { type: String },
	tickets: { type: Number },
	proofs: { type: Number },
});

module.exports = model('points', pointsSchema);