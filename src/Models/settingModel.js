const { Schema, model, SchemaTypes } = require('mongoose');

const settingSchema = new Schema({
	option: { type: String },
	setting: { type: SchemaTypes.Mixed }
});

module.exports = model("setting", settingSchema);