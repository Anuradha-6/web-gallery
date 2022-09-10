const mongoose = require("mongoose");

const validator = require("validator");

const contactSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 1,
	},
	phone: {
		type: Number,
		required: true,
		min: 10,
		// max: 10,
	},
	email: {
		type: String,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalied Email Address");
			}
		}
	},
	address: {
		type: String,
		required: true,
		minLength: 1,
	},
	message: {
		type: String,
		required: false,
		minLength: 1,
	},
});


const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;