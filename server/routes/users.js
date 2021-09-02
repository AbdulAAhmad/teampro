const router = require("express").Router();

const { userAuth } = require("../utils/Auth");
const { getUsers, getUserFromId } = require("../utils/Users");

router.get("/", userAuth, async ({}, res) => {
  await getUsers(res);
});

router.get("/me", userAuth, async (req, res) => {
  await getUserFromId(req.user.id, res);
});

router.get("/:id", userAuth, async (req, res) => {
  await getUserFromId(req.params.id, res);
});

module.exports = router;
