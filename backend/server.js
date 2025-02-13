const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/config/db");
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());
app.post("/add-data", (req, res) => {
  const { Sub1, Sub2, Sub3, Sub4, Sub5, Tot } = req.body;
  if (!Sub1 || !Sub2 || !Sub3 || !Sub4 || !Sub5 || !Tot) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO info (subject1, subject2, subject3, subject4, subject5, total) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [Sub1, Sub2, Sub3, Sub4, Sub5, Tot], (err) => {
    if (err) {
      console.log("Database Error:", err);
      return res.status(500).json({ error: "Failed to add marks" });
    }
    res.status(200).json({ msg: "Marks added successfully" });
  });
});

app.get("/fetch-marks", (req, res) => {
  const query = `SELECT * FROM info`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: "Failed to fetch marks" });
    }
    res.status(200).json({ marks: result });
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
