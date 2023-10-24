const Store = require("../model/merchantModel.js");
const Users = require("../model/users.js");

let becomeMerchant = async (req, res) => {
  const {
    store_name,
    officail_email,
    officail_phone,
    address,
    owner,
    status,
    products,
  } = req.body;

  // if (status == "waiting"){
  //   await
  // }

  if (!store_name) {
    res.send({ error: "store name is required!" });
  } else if (!officail_email) {
    res.send({ error: "official mail is required!" });
  } else if (!officail_phone) {
    res.send({ error: "official phone number is required!" });
  } else if (!address) {
    res.send({ error: "address is required!" });
  } else if (!owner) {
    res.send({ error: "owner id is required!" });
  } else {
    let duplicateOwnerEmail = await Store.find({ officail_email });

    if (duplicateOwnerEmail.length > 0) {
      return res.send({ error: "email already exist!" });
    }

    let store = new Store({
      store_name,
      officail_email,
      officail_phone,
      address,
      owner,
      status,
      products,
    });
    store.save();
    await Users.findOneAndUpdate(
      { _id: owner },
      { role: "merchant", merchant: true }
    );
    // res.send({success:"store created. congratulations for become a merchant"})
    res.send(store);

    // if (!store) {
    //   res.send({
    //     error: "please give your information for create owner account.",
    //   });
    // } else {
    //   await Users.findOneAndUpdate(
    //     { _id: owner },
    //     { role: "merchant", merchant: true }
    //   );
    // }
  }
};

let merchantStatusController = async (req, res) => {
  const { store_name, status } = req.body;
  console.log(store_name, status);

  if (status == "waiting" || status == "rejected") {
    let updateStatus = await Store.findOneAndUpdate(
      { store_name },
      { $set: { is_merchant: false, status: status } },
      { new: true }
    );
  } else if (status == "approved") {
    let updateStatus = await Store.findOneAndUpdate(
      { store_name },
      { $set: { is_merchant: true, status: status } },
      { new: true }
    );
  }
  res.send({ success: "merchant status updated" });
};

module.exports = { becomeMerchant, merchantStatusController };
