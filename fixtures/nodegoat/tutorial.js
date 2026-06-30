// NodeGoat-style tutorial controller — exercises sec-open-redirect.
"use strict";

const TutorialHandler = function TutorialHandler() {
  // Server-side open redirect: destination comes straight from the query string.
  this.displayTutorialPage = (req, res) => {
    return res.redirect(req.query.url);
  };

  this.resumeTutorial = (req, res) => {
    // user controls the redirect target via the body
    res.redirect(req.body.returnTo);
  };

  // Client-side open redirect helpers rendered into the page.
  this.clientHandoff = (req) => {
    const userInput = req.query.next;
    window.location = userInput;
    location.href = userInput;
  };
};

module.exports = TutorialHandler;
