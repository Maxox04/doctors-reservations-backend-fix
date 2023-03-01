const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const { v4: uuidv4 } = require("uuid");

async function getPatients(page = 1) {
  const rows = await db.query(
    `SELECT * 
    FROM Patient `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function addPatient(patient) {
  console.log(patient);
  const data = await db.query(
    `INSERT INTO Patient(Id, PatientName,PatientSurname, PatientEmail, PatientPhone, PatientPesel) VALUES ('${uuidv4()}','${
      patient.PatientName
    }','${patient.PatientSurname}','${patient.PatientEmail}','${
      patient.PatientPhone
    }','${patient.PatientPesel}')`
  );
  return data;
  // return {
  //   data,
  //   meta,
  // };
}

module.exports = {
  getPatients,
  addPatient,
};
