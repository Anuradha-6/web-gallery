const mongoose = require("mongoose");

const validator = require("validator");

const subsSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalied Email Address");
			}
		},
	},
	name: {
		type: String,
		required: true,
		minLength: 1,
	},
});

const SubscribedUser = mongoose.model("SubscribedUser", subsSchema);

module.exports = SubscribedUser;
