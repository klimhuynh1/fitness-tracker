const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");

const csvFilePath = path.join(__dirname, "../data/exercises.csv");
const jsonFilePath = path.join(__dirname, "../data/exercises.json");

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2));
    console.log("CSV to JSON conversion completed");
  })
  .catch((err) => console.log("Error converting CSV to JSON:", err));
