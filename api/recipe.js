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
  const { decode_key } = req.body;
  const vaild = { 5271675: "https://www.baidu.com/", 1189908: "http://sogou.com/", 6546491: "https://tieba.baidu.com/", 1487350: "https://www.sohu.com/", 1883964: "https://www.kafan.cn/" };
  console.log(vaild[decode_key]);

  if (vaild[decode_key]) {
    res.status(200).json({ status: "0000", result: vaild[decode_key] });
  } else {
    res.status(200).json({ status: "404", message: "Not Found" });
  }
});

module.exports = router;
