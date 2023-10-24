const mongoose = require("mongoose");

const { Schema } = mongoose;

const storeSchema = new Schema({
  store_name: {
    type: String,
    required: true,
  },
  officail_email: {
    type: String,
    required: true,
  },
  officail_phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  is_merchant: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "waiting",
    enum: ["waiting", "approved", "rejected"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Store", storeSchema);
