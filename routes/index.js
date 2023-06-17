const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");

const api = process.env.BASE_API;

router.use(api, apiRoutes);

router.use(api, (req, res) => {
  res.json({ error: "NO API FOUND ON THIS ROUTE!" });
});

module.exports = router;
