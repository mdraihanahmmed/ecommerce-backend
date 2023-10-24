const Category = require("../model/categoryModel.js");
const SubCategory = require("../model/subcategoryModel.js");

let categoryController = async (req, res) => {
  const { name, description } = req.body;

  let duplicateCategory = await Category.find({ name });
  //   console.log("category name: ", duplicateCategory);
  if (duplicateCategory.length > 0) {
    return res.send({ error: "category already exist!" });
  }

  let category = new Category({
    name,
    description,
  });

  category.save();
  res.send({ success: "category created successfully" });
};

let categoryStatusController = async (req, res) => {
  const { name, status } = req.body;

  let notFoundName = await Category.find({ name });

  // console.log("name de: ", notFoundName);

  if (notFoundName == "") {
    return res.send({ error: "name not found!" });
  }

  if (status == "waiting" || status == "rejected") {
    let updateStatus = await Category.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status: status } },
      { new: true }
    );
  } else if (status == "approved") {
    let updateStatus = await Category.findOneAndUpdate(
      { name },
      { $set: { isActive: true, status: status } },
      { new: true }
    );
  }

  res.send({ success: "Status Updated" });
};

let SubCategoryController = async (req, res) => {
  const { name, description, category_id } = req.body;

  let duplicateCategory = await SubCategory.find({ name });
  //   console.log("category name: ", duplicateCategory);
  if (duplicateCategory.length > 0) {
    return res.send({ error: "sub category already exist!" });
  }

  let subcategory = new SubCategory({
    name,
    description,
    category_id,
  });
  subcategory.save();
  //   console.log("data de", subcategory._id);

  await Category.findOneAndUpdate(
    { _id: subcategory.category_id },
    { $push: { subCategory: subcategory._id } }
  );
  res.send({ success: "sub category created successfully" });
};

let SubCategoryStatusController = async (req, res) => {
  const { name, status } = req.body;

  //   let notfoundName = await SubCategory.find({ name });

  //   if (notfoundName !== name) {
  //     res.send({ error: "not found this name!" });
  //   }

  res.send({ success: "Status Updated" });

  if (status == "waiting" || status == "rejected") {
    let updateStatus = await SubCategory.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status: status } }
    );
  } else if (status == "approved") {
    let updateStatus = await SubCategory.findOneAndUpdate(
      { name },
      { $set: { isActive: true, status: status } }
    );
  }
};

let getAllCategory = async (req, res) => {
  const data = await Category.find({}).populate("subCategory");
  res.send(data);
};

let getAllSubCategory = async (req, res) => {
  const data = await SubCategory.find({}).populate("category_id");
  res.send(data);
};

module.exports = {
  categoryController,
  categoryStatusController,
  SubCategoryController,
  SubCategoryStatusController,
  getAllCategory,
  getAllSubCategory,
};
