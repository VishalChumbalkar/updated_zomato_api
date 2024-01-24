const mongoose = require("mongoose");
const mong = require("../database/mongo");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },

  username: {
    type: String,
    default:"Vishal C",
    required: true,
  },

  rest_id: {
    type: Number,
    required: true
  },

  rest_name: {
    type: String,
    required: true
  },

  food_item: {
    type: String,
    required: true
  },
  
  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
