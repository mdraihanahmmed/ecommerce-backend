const Users = require("../model/users");
const Product = require("../model/productModel");
const Variant = require("../model/variantModel");

let secureUpload = async (req, res, next) => {
  console.log("data de", req.headers.authorization);
  let user_id = req.headers.authorization.split("@")[1];
  console.log("user Id", user_id);
  let password = req.headers.authorization.split("@")[2];

  if (!req.headers.authorization) {
    return res.send({ error: "Unauthorized!" });
  }

  let user = await Users.find({ _id: user_id });

  if (password == process.env.MERCHANT_SECREET_KEY) {
    if (user.length > 0 && user[0].role == "merchant") {
      next();
    }
  } else {
    return res.send({ error: "you are not able to create product!" });
  }
};

let createProduct = (req, res) => {
  let { name, description, store } = req.body;

  let product = new Product({
    name,
    description,
    store,
  });
  product.save();

  res.send({ success: "product created successfully" });
};

let createVariant = async (req, res) => {
  let { color, image, ram, storage, size, price, quantity, product } = req.body;

  // console.log(
  //   "file er data de: ",
  //   `${process.env.IMAGE_PATH}/uploads/${req.file.filename}`
  // );

  let variant = new Variant({
    color,
    image: `${process.env.IMAGE_PATH}/uploads/${req.file.filename}`,
    ram,
    storage,
    size,
    price,
    quantity,
    product,
  });
  variant.save();

  await Product.findOneAndUpdate(
    { _id: variant.product },
    { $push: { variants: variant._id } }
  );

  res.send({ success: "variant created successfully" });
};

module.exports = { secureUpload, createProduct, createVariant };
