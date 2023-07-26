const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const User = require("../models/user.models");

const getUsers = async (req = request, res = response) => {
  const { skip = 0, limit = 5 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(skip)).limit(Number(limit)),
  ]);

  res.json({
    msg: "get API",
    total,
    users,
  });
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({
    name,
    email,
    password,
    role,
  });

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    msg: "post API",
    user,
  });
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  // const user = await User.findByIdAndDelete(id); // esto  borra definitivamente de la base de datos
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "delete API",
    user
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
};
