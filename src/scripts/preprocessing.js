const fs = require("fs");
const path = require("path");

// Read JSON file
const jsonFilePath = path.join(__dirname, "../data/exercises.json");
const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

// Convert all keys and values to lowercase and remove duplicates
const uniqueItems = new Set();
const processedData = data
  .map((item) => {
    const newItem = {};
    for (const [key, value] of Object.entries(item)) {
      newItem[key.toLowerCase()] = value.toLowerCase();
    }
    return JSON.stringify(newItem);
  })
  .filter((item) => {
    if (uniqueItems.has(item)) {
      return false;
    } else {
      uniqueItems.add(item);
      return true;
    }
  })
  .map((item) => JSON.parse(item));

// Write processed data to new JSON file
const outputFilePath = path.join(__dirname, "../data/exercises_processed.json");
fs.writeFileSync(outputFilePath, JSON.stringify(processedData, null, 2));

console.log("Duplicates removed and data processed successfully.");
