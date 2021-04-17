require("dotenv").config();

const express = require("express");
const app = express();

// ROUTES
const authenticationRoute = require("./routes/authentication.route");
const usersRoute = require("./routes/users.route");
const videogamesRoute = require("./routes/videogames.route");

// MIDDLEWARES
const authenticate = require("./authentication");

app.use(express.json());

const port = process.env.PORT || 3000;

//public
app.use("/", authenticationRoute);
app.use("/users", usersRoute);

//private
app.use("/videogames", authenticate, videogamesRoute);

//fallback public
app.all("*", (req, res, next) => {
  console.log(req.url);
  next({
    status: 404,
    error: "Not found",
  });
});

app.use((err, req, res, next) => {
  // console.log("error", err);
  res.status(err.status).json(err);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});