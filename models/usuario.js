const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    //Los corchetes aqui es para enviar un mensaje si es que no llega la info en la bd
    required: [true, "El nombre es obligatorio"]
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"]
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

//Metodo para eliminar la contraseña y el __v al momento de guardar el usuario
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("Usuario", UsuarioSchema);
