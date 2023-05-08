const express = require("express");
const cors = require("cors");
const app = express();

const RECIPE = require("./api/recipe");

require("dotenv").config();

// https://dev-promotion-recurl-adv-eyldrcphzq-an.a.run.app
const allowlist = [
  "https://dev-promotion-recurl-adv-eyldrcphzq-an.a.run.app/",
  "https://dev-promotion-recurl-adv-eyldrcphzq-an.a.run.app",
  process.env.CS_EXPENSE_TRACKER_URL,
  "http://localhost:5173/",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5173/",
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

app.use(express.json({ extended: false }));

app.use("/api/recipe", RECIPE);

app.get("/", (req, res) => {
  let title = process.env.TITLE;
  let description = process.env.DESCRIPTION;
  res.status(200).json({ title, description });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
