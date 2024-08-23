//To insert the data from the mockData array into the MongoDB database

const mongoose = require("mongoose");
const Voter = require("./model/voter");
const mockData = require("./data/mockData");

require("dotenv").config();
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    Voter.insertMany(mockData)
      .then(() => {
        console.log("Data inserted successfully");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error inserting data", err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
