const express = require("express")
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")

env.config();

mongoose.connect(process.env.MONGO_URL)
.then(console.log("connected to mongoose"))
.catch(err => console.log(err))

app.use(express.json());

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)

app.listen("5000", () => console.log("Backend is running"))