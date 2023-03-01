const express = require("express");
const router = express.Router();
const patientService = require("../services/patientService");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await patientService.getPatients(req.query.page));
  } catch (err) {
    console.error(`Error while getting patients `, err.message);
    next(err);
  }
});
router.post("/", async function (req, res, next) {
  try {
    res.json(await patientService.addPatient(req.body));
  } catch (err) {
    console.error(`Error while getting patients `, err.message);
    next(err);
  }
});

module.exports = router;
