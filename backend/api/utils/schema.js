const Joi = require("@hapi/joi");

module.exports = schema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).trim().required(),
  password: Joi.string().min(6).trim().required(),
});
