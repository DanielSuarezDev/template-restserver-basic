const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const validateJwt = async (req, res, next) => {
  // Leer el token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer user que corresponde al uid
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en DB",
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJwt,
};
