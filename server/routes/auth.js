const router = require("express").Router();

const {
  registerUser,
  signinUser,
  signoutUser,
  userAuth,
} = require("../utils/Auth");

// Register Route
router.post("/register", async (req, res) => {
  await registerUser(req.body, res);
});

// Sign in Route
router.post("/signin", async (req, res) => {
  await signinUser(req.body, res);
});
router.delete("/signout", userAuth, async (req, res) => {
  await signoutUser(req.user, res);
});

module.exports = router;
