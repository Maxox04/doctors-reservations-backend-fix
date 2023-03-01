const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const { v4: uuidv4 } = require("uuid");

async function getReservations(page = 1) {
  const reservations = await db.query(
    `SELECT * 
    FROM Reservation`
  );

  return {
    reservations,
  };
}
async function deleteReservationsById(body) {
  const reservation = await db.query(
    `DELETE
        FROM Reservation WHERE Id = '${body.Id}'`
  );

  return {
    reservation,
  };
}
async function addReservation(reservation) {
  console.log(reservation);
  const data = await db.query(
    `INSERT INTO Reservation(Id, Patient, Doctor, Date, Title, Description, RoomNumber) VALUES ('${uuidv4()}','${
      reservation.Patient
    }','${reservation.Doctor}','${reservation.Date}','${reservation.Title}','${
      reservation.Description
    }','${reservation.RoomNumber}')`
  );
  return data;
}

module.exports = {
  getReservations,
  addReservation,
  deleteReservationsById,
};
