const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.js");
const categoryRoutes = require("./category.js");
const productRoutes = require("./product.js");
const discountRoutes = require("./discount.js");

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/discount", discountRoutes);

module.exports = router;
