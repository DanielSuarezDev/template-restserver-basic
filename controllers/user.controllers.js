const { response, request } = require("express");

const getUsers = (req = request, res = response) => {
  const { q, name = "no name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const putUsers = (req, res = response) => {
  const id = req.params;

  res.json({
    msg: "put API",
    id,
  });
};

const postUsers = (req, res = response) => {
  const { name, age } = req.body;

  res.json({
    msg: "post API",
    name,
    age,
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
};
