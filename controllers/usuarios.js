const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  // const usuarios = await Usuario.find({ estado: true })
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments({ estado: true });

  //Desesestructuracion de arreglo
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
    // total,
    // usuarios
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  //Numero de vueltas para que se vuelva complciada la encriptacion, por defecto esta en 10
  const salt = bcryptjs.genSaltSync();
  //Aca se encripta la contraseña mediante una via(mas segura)
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en la bd
  await usuario.save();

  res.json({ ok: true, msg: "post API - controlador", usuario });
};
const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validar contra bd
  if (password) {
    //Numero de vueltas para que se vuelva complciada la encriptacion, por defecto esta en 10
    const salt = bcryptjs.genSaltSync();
    //Aca se encripta la contraseña mediante una via(mas segura)
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};
const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut
};
