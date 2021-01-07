const express = require("express");
const connectDb=require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
// This removes the necessity for using bodyParser


// Connecting to the mongoDb database
connectDb();


app.get("/", (req, res) => {
  res.send("<h1>Hello There !</h1>");
});

// Defining Routes
app.use("/api/users",require("./routes/api/users"));
app.use("/api/profile",require("./routes/api/profile"));
app.use("/api/auth",require("./routes/api/auth"));
app.use("/api/posts",require("./routes/api/posts"));


app.listen(PORT, () => {
  console.log(`Server is online at port ${PORT}`);
});
