Web Test-Driven Development with JavaScript
-------------------------------------------

It's well and good to write tests to verify your server-side
and client-side logic, but do you know that the whole
solution really is working?

You can of course test your service manually after
deploying, but that becomes tedious.

By using Selenium, we can test that the solution works
end-to-end.

This project explores how to get the whole set of tools
up and running for a NodeJs-based stack.

Development log
===============

1. npm init
2. npm install express
3. Create server.js and public/index.js
4. Manual test in browser by doing npm start
5. npm install mocha
6. npm install selenium-standalone webdriverjs chai
7. Create test/simpleWebTest.js



Problems encountered:
=====================

* Selenium doesn't correctly fork PhantomJS on Windows
  * Workaround: Submit phantomjs.binary.path as desiredCapabilities
  * Submitted patch to Selenium team: https://code.google.com/p/selenium/issues/detail?id=7514


