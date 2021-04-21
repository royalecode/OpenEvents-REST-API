require("dotenv").config();

const express = require("express");
const app = express();

// ROUTES
const usersRoute = require("./routes/users.route");
const eventsRoute = require("./routes/events.route");
//const friendsRoute = require("./routes/friends.route");
const messagesRoute = require("./routes/messages.route");

// MIDDLEWARES
//const authenticate = require("./authentication");

//app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/users", usersRoute);
app.use("/api/events", eventsRoute);
//app.use("/api/friends", friendsRoute);
app.use("/api/messages", messagesRoute);

//fallback
app.all("/api/*", (req, res, next) => {
  console.log(req.url);
  next({
    status: 404,
    error: "Not found",
  });
});

app.use((err, req, res, next) => {
  console.log("error", err);
  res.status(err.status).json(err);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/api`);
});