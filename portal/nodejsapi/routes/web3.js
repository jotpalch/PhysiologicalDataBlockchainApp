const Web3Strategy = require("passport-web3");

/**
 * Called when authorization succeeds. Perform any additional verification here,
 * and either return the user's data (if valid), or deny authorization by
 * passing an error to the `done` callback.
 */
const onAuth = (address, done) => {
  // optional additional validation. To deny auth:
  // done(new Error('User is not authorized.'));
  User.findOne({ address }, (err, user) => done(err, user));
};
const web3Strategy = new Web3Strategy(onAuth);

passport.use(web3Strategy);

// endpoint
app.post("/login", passport.authenticate("web3"));
