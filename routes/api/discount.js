const express = require("express");
const {
  discountProducts,
  allDiscount,
} = require("../../controllers/discountController.js");
const router = express.Router();

router.post("/creatediscount", discountProducts);
router.get("/alldiscount", allDiscount);

module.exports = router;
