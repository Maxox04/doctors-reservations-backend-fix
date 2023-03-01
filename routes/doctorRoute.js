const express = require("express");
const router = express.Router();
const doctorService = require("../services/doctorService");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await doctorService.getDoctors(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.post("/", async function (req, res, next) {
  try {
    res.json(await doctorService.addDoctor(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;
