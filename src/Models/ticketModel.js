const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
	staff: { type: String },
	points: { type: Number },
});

module.exports = model('tickets', ticketSchema);