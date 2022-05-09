const Joi = require('joi');
const errorHandler = require('../utils/errorStatusCreator');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateName = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = PRODUCT.validate({ name, quantity });

  if (error) {
    const errorObj = errorHandler(error.details[0].type, error.details[0].message);
    next(errorObj);
  }
    
  next();
};

module.exports = {
  validateName,
};
