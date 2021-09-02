const router = require("express").Router();

const { registerUser, signinUser } = require("../utils/Auth");

// Register Route
router.post("/register", async (req, res) => {
  await registerUser(req.body, res);
});

// Sign in Route
router.post("/signin", async (req, res) => {
  await signinUser(req.body, res);
});

module.exports = router;
