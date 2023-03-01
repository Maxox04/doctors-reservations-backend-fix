const express = require("express");
const router = express.Router();
const adminService = require("../services/adminService");

router.post("/add-code", async function (req, res, next) {
  try {
    res.json(await adminService.addCode(req.body));
  } catch (err) {
    console.error(`Error while adding code`, err.message);
    next(err);
  }
});
//check if given code exists and if it is still valid
router.post("/check-if-code-is-valid", async function (req, res, next) {
  try {
    const codeIsValid = await adminService.checkIfCodeIsValid(req.body);
    if (codeIsValid) {
      res.status(200).json({ response: "code is valid", valid: true });
    } else {
      res.status(200).json({ response: "code is not valid", valid: false });
    }
  } catch (err) {
    console.error(`Error while getting codes`, err.message);
    res.status(500).json({ response: `Error while getting codes` });
  }
});
module.exports = router;
