const express = require("express");
const path = require("path");
require("./db/conn");

const Contact = require("./models/contactMsg");
const SubscribedUser = require("./models/subscribe");

const hbs = require("hbs");
const async = require("hbs/lib/async");
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();

const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(
	"/css",
	express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
	"/js",
	express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));

app.set("view engine", "hbs");

app.set("views", templatePath);

hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/gallery", (req, res) => {
	res.render("gallery");
});

app.get("/contact", (req, res) => {
	res.render("contact");
});

app.get("/admin", (req, res) => {
	res.render("admin");
});

app.post("/contact", async (req, res) => {
	try {
		const contactData = new Contact(req.body);
		await contactData.save();
		res.status(201);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.post("/subscribe", async (req, res) => {
	try {
		const subscribeData = new SubscribedUser(req.body);
		await subscribeData.save();
		res.status(201);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.listen(port, () => {
	console.log("Server is running");
});
