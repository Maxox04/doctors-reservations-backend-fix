const express = require("express");
const router = express.Router();
const reservationService = require("../services/reservationService");

router.get("/all-reservation", async function (req, res, next) {
  try {
    res.json(await reservationService.getReservations());
  } catch (err) {
    console.error(`Error while getting reservations `, err.message);
    next(err);
  }
});

router.delete("/reservation-by-id", async function (req, res, next) {
  try {
    res.json(await reservationService.deleteReservationsById(req.body));
  } catch (err) {
    console.error(`Error while getting reservation `, err.message);
    next(err);
  }
});

router.post("/add-reservation", async function (req, res, next) {
  try {
    res.json(await reservationService.addReservation(req.body));
  } catch (err) {
    console.error(`Error while adding reservation `, err.message);
    next(err);
  }
});

module.exports = router;
