const { Router } = require("express");


const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controllers");
const { validateCampos } = require("../middlewares/validate-campos");

const router = Router();

router.post("/login", [
  check('email', 'The email is not valid').isEmail(),
  check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
  validateCampos
],
login);

router.post("/google", [
  check('id_token', 'The id_token is required').not().isEmpty(),
  validateCampos
],
googleSignIn);

module.exports = router;
