const express = require("express");
const router = express.Router();

const recipe = require("../mock/recipe");

const CRUDMODULE = require("../utils/firebaseCRUD");

const { createData: created } = CRUDMODULE;

/**
 * GET Recipe List.
 *
 * @return recipe list | empty.
 */
router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "Get data has successfully",
      data: recipe,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.get("/traceredirect", (req, res, next) => {
  const collection = "REDIRECT-URL";
  const data = req.query || "";

  created(collection, data)
    .then((msg) => {
      res.status(200).json({ msg });
    })
    .catch((error) => {
      res.status(403).json({ error });
    });
});

router.post("/api/query_redirect_url", (req, res, next) => {
  res.status(200).json({ status: "0000", result: "https://www.baidu.com/" });
});

module.exports = router;
