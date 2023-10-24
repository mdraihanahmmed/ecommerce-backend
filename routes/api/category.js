const express = require("express");
const {
  categoryController,
  categoryStatusController,
  SubCategoryController,
  SubCategoryStatusController,
  getAllCategory,
  getAllSubCategory,
} = require("../../controllers/categoryController");

const router = express.Router();

router.post("/createcategory", categoryController);
router.post("/categorystatus", categoryStatusController);
router.post("/createsubcategory", SubCategoryController);
router.post("/subcategorystatus", SubCategoryStatusController);
router.get("/getallcategory", getAllCategory);
router.get("/getallsubcategory", getAllSubCategory);

module.exports = router;
