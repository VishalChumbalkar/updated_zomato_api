const express = require("express");
const app = express();
const orderModel = require("../models/model");
const serv = require("../services/service");

//-----------------------------------------------//
//     Order Collection Details API
//----------------------------------------------//

// to add the new order
module.exports.createOrder = async (req, res, next) => {
  try {
      await serv.createOrder(req, res);
      next();
  } catch (error) {
      // next(res.status(400).json({ message: error.message}));
      next(error);
    }
};


// to retrieve the all data which is stored at the backend.
module.exports.orderDisplay = async (req, res, next) => {
  try {
    await serv.orderDisplay(req, res);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.displayByMenu = async(req, res, next) => {
  try{
    await serv.displayByMenu(req, res);
    next()
  }catch(error){
    next(res.status(400).json({message: error.message}));
  }
}

// to delete the data by using particular id
module.exports.deleteOrder = async (req, res, next) => {
  try {
    await serv.deleteOrder(req, res)
    next()
  } catch (error) {
    next(res.status(400).json({ message: error.message }));
  }
};


// To update the data from the orderUpdate like quantity and price
module.exports.updateOrder = async (req, res, next) => {
  try {
    await serv.updateOrder(req, res)
    next()
  } catch (error) {
    next(res.status(400).json({ message: error.message }));
  }
};



