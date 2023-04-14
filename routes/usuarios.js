const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorID
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    check("rol").custom(esRoleValido),
    validarCampos
  ],
  usuariosPut
);

//los middlewares siempre van en la segunda posicion
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({
      min: 6
    }),
    //Custom son para validaciones personalizadas
    check("correo").custom(emailExiste),
    //check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    //No es necesario mandar el parametro por defecto ya que los callback agarran el primer docuemnto
    check("rol").custom(esRoleValido),
    validarCampos
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos
  ],
  usuariosDelete
);

module.exports = router;
