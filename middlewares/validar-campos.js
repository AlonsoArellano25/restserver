const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  //Validamos si en el midleware se encontraron errores que se hacen en las rutasd
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  //Es si el middleware pasa
  next();
};

module.exports = {
  validarCampos
};
