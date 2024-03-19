const express = require("express");
const router = express.Router();
const {
  login,
  processLogin,
  register,
  processRegister,
  logout,
} = require("../controllers/authentication");

// app.js --> "/autenticacion"

//  /autenticacion/iniciar
router.get("/iniciar", login);
router.post("/iniciar", processLogin);

//  /autenticacion/registrar
router.get("/registro", register);
router.post("/registro", registerValidation, processRegister);

router.get("/cerrar-sesion", logout)

module.exports = router;
