const { Router } = require('express');

const router = require('express').Router();

const { Raza, Temperamento } = require('../db');

// [ ] POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos
router.post('/dog', async (req, res) => {
  const { Nombre, Altura, Peso, Añosdevida, temperamentos, image } = req.body;

  try {
    const [newRaza] = await Raza.findOrCreate({
      where: {
        Nombre: Nombre,
        Altura: Altura,
        Peso: Peso,
        Añosdevida: Añosdevida,
        Image: image
      }
    })
    newRaza.setTemperamentos(temperamentos);
    res.json(newRaza)
  } catch (err) {
    throw new Error(err)
  }
})


module.exports = router;