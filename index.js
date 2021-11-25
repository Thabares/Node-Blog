const express = require("express")
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");

env.config();

mongoose.connect(process.env.MONGO_URL)
.then(console.log("connected to mongoose"))
.catch(err => console.log(err))

app.use(express.json());


app.listen("5000", () => console.log("Backend is running"))