const express = require("express");
const sequelize = require("./config");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fitness Tracker API");
});

// Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connection the database:", err);
  });
