const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const { v4: uuidv4 } = require("uuid");
var bcrypt = require("bcrypt");

async function getUsers(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM Users `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function addUser(user) {
  console.log(user);
  const hashedPwd = await bcrypt.hash(user.Password, 10);
  const data = await db.query(
    `INSERT INTO Users(Id, Name, Surname, Email, Password, IsAdmin, Position) VALUES ('${uuidv4()}','${
      user.Name
    }','${user.Surname}','${user.Email}','${hashedPwd}','${user.IsAdmin}','${
      user.Position
    }'
    )`
  );
  return data;
  // return {
  //   data,
  //   meta,
  // };
}
async function login(data) {
  //check if user exists
  console.log(data.Email);

  const users = await db.query(
    `SELECT * 
    FROM Users WHERE Email = '${data.Email}'`
  );
  console.log("useroutput");
  if (users.length == 0) {
    return { status: false, user: {} };
  }
  console.log(users);

  //check password validity
  const match = await bcrypt.compare(data.Password, users[0].Password);
  if (match == true) {
    return { status: true, user: users[0] };
  } else {
    return { status: false, user: {} };
  }
}
async function checkIfUserExists(data) {
  const users = await db.query(
    `SELECT * 
    FROM Users WHERE Email = '${data.Email}'`
  );

  if (users.length == 0) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  getUsers,
  addUser,
  login,
  checkIfUserExists,
};
