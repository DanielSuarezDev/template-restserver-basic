const Role = require("../models/role.models");
const User = require("../models/user.models");

const isRoleValid = async (role) => {
  const existRole = await Role.findOne({ role });

  if (!existRole) {
    throw new Error(`The role ${role} is not valid`);
  }
};

const existEmail = async (email) => {
  const exist = await User.findOne({ email });

  if (exist) {
    throw new Error(`The email ${email} Exist`);
  }
};

const existUserById = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`The id ${id} not exist`);
  }
};

module.exports = {
  isRoleValid,
  existEmail,
  existUserById,
};
