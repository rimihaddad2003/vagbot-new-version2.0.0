const { Schema, model } = require('mongoose');

const maintSchema = new Schema({
	commandname: { type: String },
	maintenance: { type: Boolean, default: false }
});

module.exports = model("maintenance", maintSchema);