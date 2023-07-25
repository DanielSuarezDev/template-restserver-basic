const { Router } = require("express");

const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
} = require("../controllers/user.controllers");
const { check } = require("express-validator");
const { validateCampos } = require("../middlewares/validate-campos");
const { isRoleValid, existEmail, existUserById } = require("../helpers/db-validators");

const router = Router();

router.get("/", getUsers);

router.put("/:id",[
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existUserById),
  check('role').custom(isRoleValid),
  validateCampos
], putUsers);

router.post("/", [
  check('email', 'The email is not valid').isEmail(),
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
  check('email').custom(existEmail),
  check('role').custom(isRoleValid),
  validateCampos
],
postUsers);

router.delete("/:id",[
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existUserById),
  validateCampos
], deleteUsers);

module.exports = router;
