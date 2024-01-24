const express = require("express");
const app = express();
const orderModel = require("../models/model");
const {orderValidationSchema,  orderValidationSchemaPut} = require('../validations/validation');



//-----------------------------------------------//
//     Order Collection Details API
//----------------------------------------------//

// to add the new order
module.exports.createOrder = async (req, res) => {
  try {
    const rel = await orderValidationSchema.validateAsync(req.body);

    if(rel)
    {
        const newOrder = new orderModel(req.body);
        const savedRestaurant = await newOrder.save();
        // console.log(savedRestaurant);
        console.log(savedRestaurant);
        res.status(201).json(savedRestaurant);
    }
  } catch (error) {
    res.status(400).json({ message: error.message});
    }
};


// to retrieve the all data which is stored at the backend.
module.exports.orderDisplay = async (req, res) => {
  try {
    const display = await orderModel.find({});
    res.json(display);
  } catch (error) {
   res.status(400).json({ message: error.message });
  }
};


// retrieve the data by using menu

// module.exports.displayByMenu = async (req, res) => {
//     try {
//       const menu1 = req.params.menu ? { food_item: req.params.menu } : {}; 
//       const rel = await orderModel.find(menu1);
//       res.json(rel);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };

module.exports.displayByMenu = async (req, res) => {
    try {
      const menu = req.params.menu;
      const regex = new RegExp(menu, 'i');
  
      if (menu && menu.length >= 4) {
        const rel = await orderModel.find({ food_item: { $regex: regex } });
        res.json(rel);
      } else {
        res.json({ message: "Word characters should be greater than 3" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  

// to delete the data by using particular id
module.exports.deleteOrder = async (req, res) => {
  try {
    const deleteId = req.params.orId;
    
    const deleteOrder = await orderModel.findOneAndDelete({ user_id: deleteId });

    if (!deleteOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// To update the data from the orderUpdate like food_item and quantity

module.exports.updateOrder = async (req, res) => {
    try {
      // Validate the request body
      const validationResult = await  orderValidationSchemaPut.validateAsync(req.body);
  
      if (validationResult) {
        const updateId = req.params.uId;
        console.log(validationResult);
        const { new_food_item, new_quantity } = validationResult; // Use the validated data
  
        const updatedData = await orderModel.findOneAndUpdate(
          { user_id: updateId },
          // { food_item: new_food_item, quantity: new_quantity },
          { $set: {
                        food_item: req.body.food_item,
                        quantity: req.body.quantity,
                      },
                    },
          // Use $set to update specific fields
          { new: true }
        );
        console.log(updatedData);
  
        if (!updatedData) {
          console.log("error");
          return res.status(404).json({ message: "Order not found" });
        }
        res.json(updatedData);
        // res.redirect("/");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// module.exports.updateOrder = async (req, res) => {
//     try {
//       // Validate food_item
//       const foodItemValidationResult = await orderValidationSchema.validateAsync(req.body.food_item);

//       // Validate quantity
//       const quantityValidationResult = await orderValidationSchema.validateAsync(req.body.quantity);
  
//       if (foodItemValidationResult && quantityValidationResult) {
//         // If validation fails for either field
//         const updateId = req.params.uId;
        
//         const updatedData = await orderModel.findOneAndUpdate(
//         { user_id: updateId },
//         {
//           $set: {
//             food_item: req.body.food_item,
//             quantity: req.body.quantity,
//           },
//         },
//         { new: true }
//       );
  
//       if (!updatedData) {
//         return res.status(404).json({ message: "Order not found" });
//       }
  
//       res.redirect("/");
        
//       }
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };

