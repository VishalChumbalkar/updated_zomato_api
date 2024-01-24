const db = require("../models/model");
const Joi = require("joi");


// Define Joi schema for validation
const orderValidationSchema = Joi.object({
    user_id: Joi.number().required(),
    username: Joi.string().alphanum().required(),
    rest_id: Joi.number().required(),
    rest_name: Joi.string().required(),
    food_item: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    city: Joi.string().required(),
  });

  const orderValidationSchemaPut = Joi.object({
    food_item: Joi.string().required(),
    quantity: Joi.number().required(),
  });
  
  // Validate a data object against the Joi schema
//   const validateOrder = (order) => {
//     return orderValidationSchema.validate(order);
//   }yy
module.exports = {
    orderValidationSchema,
    orderValidationSchemaPut 
    // validateOrder,
  };