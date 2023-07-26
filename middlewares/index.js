const validateCampos = require("./validate-campos");
const validateJWT = require("./validate-jwt");
const validateRoles = require("./validate-roles");

module.exports = {
  ...validateCampos,
  ...validateJWT,
  ...validateRoles,
};
