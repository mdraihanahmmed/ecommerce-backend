const Discount = require("../model/discountModel.js");

const discountProducts = async (req, res) => {
  let { percent, cash, flat, category, subCategory, products } = req.body;

  const discount = new Discount({
    percent,
    cash,
    flat,
    category,
    subCategory,
    products,
  });
  discount.save();

  res.send({ success: "discount created successfully." });
};

let allDiscount = async (req, res) => {
  let data = await Discount.find({}).populate([
    "category",
    "subCategory",
    "products",
  ]);

  res.send(data);
};

module.exports = { discountProducts, allDiscount };
