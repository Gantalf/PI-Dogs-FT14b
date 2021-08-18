const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Añosdevida: {
      type: DataTypes.STRING,
    },
    Image: {
      type: DataTypes.TEXT
    }
  });
};

