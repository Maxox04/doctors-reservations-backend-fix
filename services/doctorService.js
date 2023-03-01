const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const { v4: uuidv4 } = require("uuid");

async function getDoctors(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM Doctor `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function addDoctor(doctor) {
  // const rows = await db.query(
  //   `INSERT INTO "Doctor"("Id", "Name", "Phone", "Specialisation") VALUES (${uuidv4()},${
  //     doctor.Name
  //   },${doctor.Phone},${doctor.Specialisation})`
  // );
  // const data = helper.emptyOrRows(rows);
  // const meta = { page };
  console.log(doctor);
  const data = await db.query(
    `INSERT INTO Doctor(Id, Name, Phone, Specialisation) VALUES ('${uuidv4()}','${
      doctor.Name
    }','${doctor.Phone}','${doctor.Specialisation}')`
  );
  return data;
  // return {
  //   data,
  //   meta,
  // };
}

module.exports = {
  getDoctors,
  addDoctor,
};
