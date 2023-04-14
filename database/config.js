const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      //Configuracion necesarias
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la BD al momento de iniciarla");
  }
};

module.exports = {
  dbConnection
};
