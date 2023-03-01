const db = require("./db");

const { v4: uuidv4 } = require("uuid");
Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

async function addCode(codeData) {
  console.log(codeData);
  const codeEntry = {
    code: codeData.code,
    expirationDate: new Date().addHours(2),
  };
  console.log(codeEntry);

  const data = await db.query(
    `INSERT INTO Codes(Id, Code, ExpirationDate) VALUES ('${uuidv4()}','${
      codeData.code
    }','${Date.now() + 2 * 60 * 60}')`
  );
  return data;
}
async function checkIfCodeIsValid(data) {
  const codes = await db.query(
    `SELECT *
    FROM Codes WHERE Code = '${data.code}'`
  );

  console.log(codes[0]);
  if (codes.length == 0) {
    return false;
  } else {
    if (Date.now() > Number(codes[0].ExpirationDate)) {
      return true;
    }
  }
  return true;
}

module.exports = {
  addCode,
  checkIfCodeIsValid,
};
