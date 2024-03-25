const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (CSS, JS, images, etc.) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to handle click events
app.post("/click", (req, res) => {
  let clickData = req.body;

  // Read existing data from JSON file
  fs.readFile("click_data.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file:", err);
      res.status(500).send("Error reading file");
    } else {
      let data = [];
      if (jsonString) {
        data = JSON.parse(jsonString);
      }

      // Push the click data object to the array
      data.push(clickData);

      // Write updated data to JSON file
      fs.writeFile(
        "click_data.json",
        JSON.stringify(data, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.log("Error writing file:", err);
            res.status(500).send("Error writing file");
          } else {
            console.log("Data saved to click_data.json");
            res.send("Click data received.");
          }
        }
      );
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
