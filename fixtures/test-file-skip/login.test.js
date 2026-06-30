// Fixture for FIX 1 — test-file false-positive skipping.
// Because the path matches *.test.js, the engine SKIPS hardcoded-credential,
// http:// and open-redirect findings (expected in fixtures/tests) but KEEPS
// genuinely dangerous patterns (SQL injection, eval) that can leak to prod.

const TEST_PASSWORD = "hunter2-fake-fixture-pw";          // SKIPPED: fixture credential
const API = "http://insecure.example.com/test-endpoint";  // SKIPPED: test-only cleartext URL

app.get("/redirect", (req, res) => {
  res.redirect(req.query.to);                             // SKIPPED: testing redirect behavior
});

// KEPT — bad even in tests, can be copy-pasted into production:
db.query("SELECT * FROM users WHERE id = " + req.body.id); // sec-sql-concat
eval(req.body.code);                                        // sec-eval
