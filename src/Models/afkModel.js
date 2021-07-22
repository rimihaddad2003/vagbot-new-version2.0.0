const { Schema, model } = require('mongoose');

const afkSchema = new Schema({
	staff: { type: String },
	afk: { type: Boolean, default: false },
	message: { type: String }
});

module.exports = model("afk", afkSchema);