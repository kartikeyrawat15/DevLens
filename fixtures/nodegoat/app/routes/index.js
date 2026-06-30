// NodeGoat-style route registration — the state-changing routes live here,
// in a DIFFERENT file from the session middleware (server.js). The CSRF check
// must reason across the whole project, not a single file.
"use strict";

module.exports = function (app, db) {
    app.get("/", function (req, res) {
        res.render("index");
    });

    // State-changing routes with no CSRF token validation:
    app.post("/login", function (req, res) {
        // authenticate from req.body...
        res.redirect("/dashboard");
    });

    app.post("/profile", function (req, res) {
        // persist profile changes from req.body
        res.redirect("/profile");
    });

    app.put("/allocations/:userId", function (req, res) {
        res.json({ ok: true });
    });

    app.delete("/memos/:id", function (req, res) {
        res.json({ ok: true });
    });
};
