// NodeGoat-style Express bootstrap — exercises sec-csrf-missing.
// Session middleware + state-changing routes, but NO csrf middleware.
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true
}));

app.get("/", (req, res) => res.render("index"));

// State-changing routes with no CSRF token validation:
app.post("/login", (req, res) => {
  // authenticate...
  res.redirect("/dashboard");
});

app.post("/profile", (req, res) => {
  // persist profile changes from req.body
  res.redirect("/profile");
});

app.put("/allocations/:userId", (req, res) => {
  // update allocations
  res.json({ ok: true });
});

app.delete("/memos/:id", (req, res) => {
  res.json({ ok: true });
});

app.listen(4000);
