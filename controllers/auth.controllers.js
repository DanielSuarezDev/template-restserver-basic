const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const User = require("../models/user.models");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - email",
      });
    }

    // Verificar si el usuario está activo
    if (!user.state) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - status: false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: "Login -- OK --",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    // Verificar si el email existe

    let user = await User.findOne({ email });

    if (!user) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        password: ":P",
        picture,
        google: true,
        role: "USER_ROLE",
      };

      user = new User(data);
      await user.save();
      console.log("googleUser", googleUser);
    }

    // Si el usuario en DB está en estado false
    if (!user.state) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);


    res.json({
      msg: "Google Sign In -- OK --",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
