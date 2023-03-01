const doctorRoute = require("./routes/doctorRoute");
const patientRoute = require("./routes/patientRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const reservationRoute = require("./routes/reservationRoute");

var cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/doctor", doctorRoute);
app.use("/patient", patientRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/reservation", reservationRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3001}`);
});
