const router = require("express").Router();

const { userAuth } = require("../utils/Auth");
const { getUsers, getUserFromId, updateToken } = require("../utils/Users");

router.get("/", userAuth, async ({}, res) => {
  await getUsers(res);
});

router.get("/me", userAuth, async (req, res) => {
  await getUserFromId(req.user.id, res);
});

router.get("/:id", userAuth, async (req, res) => {
  await getUserFromId(req.params.id, res);
});
router.put("/", userAuth, async (req, res) => {
  await updateToken(req.user.id, req.body.push_token, res);
});

module.exports = router;
