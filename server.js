const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

var cors = require("cors");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, "build")));

// let temporaryData = null;

// app.post("/data", (req, res) => {
//   const postData = req.body; // Access the POST data sent from the other website

//   temporaryData = postData;
//   res.json({ message: "Data received" });
// });

// app.get("/data", (req, res) => {
//   const retrievedData = temporaryData;
//   // Send the data as a JSON response
//   res.json(retrievedData);
//   //res.json({contactName: 'test', email:'test@test.com', website:'website.com'});
// });

// route to handle incoming post data from other external form
// changing to route '/' will also work
app.post("/data", (req, res) => {
  // get request data
  const data = req.body;

  // for debugging
  console.log("recieved form data:", data);

  // save data to cookie
  // so later in the component we can grab the data from cookie by the cookie key
  res.cookie("nuvo_form_data", JSON.stringify(data));

  // redirect to home form
  res.redirect("/");
});

// Handle all other routes by returning the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
