const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

/*gets all users from db  */
router.get("/", async function (req, res, next) {
  try {
    res.json(await userService.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

//check if user with particular email exists
router.post("/check-if-user-exists", async function (req, res, next) {
  try {
    const userExits = await userService.checkIfUserExists(req.body);
    if (userExits) {
      res.status(400).json({ response: "user exists" });
    } else {
      res.status(200).json({ response: "user does not exist" });
    }
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
//adds a user to db
router.post("/addUser", async function (req, res, next) {
  try {
    res.json(await userService.addUser(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
//login comparison
router.post("/login", async function (req, res, next) {
  try {
    const authorized = await userService.login(req.body);
    if (authorized.status == false) {
      res.status(400).json({ response: "user not authorized" });
    } else {
      res
        .status(200)
        .json({ response: "user authorized", user: authorized.user });
    }
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;
