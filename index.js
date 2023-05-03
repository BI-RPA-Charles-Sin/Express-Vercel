const express = require("express");
const cors = require("cors");
const app = express();

const RECIPE = require("./api/recipe");

require("dotenv").config();

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/api/recipe", RECIPE);

app.get("/", (req, res) => {
  let title = process.env.TITLE;
  let description = process.env.DESCRIPTION;
  res.status(200).json({ title, description });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
