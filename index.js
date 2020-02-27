const express = require("express");
const routes = require("./routes/api.js");
const mongoose = require("mongoose");

//Set Up express app
const app = express();

//Connect to mongoDB
mongoose.connect("mongodb://localhost/ninjago", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Middleware to serve static files
app.use(express.static("public"));

//middleware to parse the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use a Middleware (Initialize routes)
app.use("/api", routes);

//Middleware for error handling
app.use((err, req, res, next) => {
  //console.log(err);
  res.status(400).send({ error: err.message });
});

const PORT = process.env.port || 4000;

//listen for a request
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
