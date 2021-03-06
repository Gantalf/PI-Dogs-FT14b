const { Router } = require('express');
const router = require('express').Router();

const fetch = require('node-fetch');
const { Op } = require('sequelize');

const { Raza } = require('../db');
const { Temperamento } = require('../db');

require('dotenv').config();
const {
  API_KEY
} = process.env;



//GET /dogs: Obtener un listado de las primeras 8 razas de perro. Debe devolver solo los datos necesarios para la ruta principal
router.get('/dogs', async function (req, res) {
  const { name } = req.query;


  //si llega algo por query
  if (name) {
    try {

      //limit: hasta cuanto va a traer
      let dogsDb = await Raza.findAll({
        include: Temperamento,
        where: {
          Nombre: {
            [Op.substring]: name //aca le decimos que es un subString de un string grande.
          }
        }
      })

      let nombreTemperamento = []

      dogsDb.map(item => {
        nombreTemperamento.push({
          ID: item.ID,
          Nombre: item.Nombre,
          temperamentos: item.temperamentos.map(element => {
            return element.Nombre
          }).join(', '),
          Peso: item.Peso,
          image: item.Image
        })
      })


      const response = await fetch(` https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)
      const data = await response.json();

      let firstEigth = [];
      for (let i = 0; i < data.length && i < 100 - dogsDb.length; i++) {
        firstEigth.push({
          ID: data[i].id,
          image: `https://cdn2.thedogapi.com/images/${data[i].reference_image_id}.jpg`,
          Nombre: data[i].name,
          temperamentos: data[i].temperament,
          Peso: data[i].weight.metric
        });
      }
      let arrayRespuesta = nombreTemperamento.concat(firstEigth);

      res.json(arrayRespuesta);


    } catch {
      res.status(404).send('La raza no se encontro');
    }

  } else {
    try {
      const response = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
      const data = await response.json();

      let dogsDb = await Raza.findAll({
        include: Temperamento,
      })

      let nombreTemperamento = []

      dogsDb.map(item => {
        nombreTemperamento.push({
          ID: item.ID,
          Nombre: item.Nombre,
          temperamentos: item.temperamentos.map(element => {
            return element.Nombre
          }).join(', '),
          Peso: item.Peso,
          image: item.Image
        })
      })


      //name, img, temp
      let firstEigth = [];
      for (let i = 0; i < data.length && i < 100 - dogsDb.length; i++) {
        firstEigth.push({
          ID: data[i].id,
          image: data[i].image.url,
          Nombre: data[i].name,
          temperamentos: data[i].temperament,
          Peso: data[i].weight.metric
        });
      }


      let arrayRespuesta = nombreTemperamento.concat(firstEigth);

      res.json(arrayRespuesta);
    } catch {
      res.status(404).send('Problemas con la api');
    }
  }

})



// Ruta de detalle de raza de perro: debe contener

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] A??os de vida

router.get('/dogs/:idRaza', async function (req, res) {
  const { idRaza } = req.params;
  try {

    const dogsDb = await Raza.findByPk(idRaza, {
      include: Temperamento
    })

    let nombreRaza = {
      name: dogsDb.dataValues.Nombre,
      height: dogsDb.dataValues.Altura,
      weight: dogsDb.dataValues.Peso,
      life_span: dogsDb.dataValues.A??osdevida,
      temperamentos: dogsDb.dataValues.temperamentos.map(element => {
        return element.Nombre
      }).join(', '),
      image: dogsDb.dataValues.Image
    }


    res.json(nombreRaza)
  } catch {
    try {
      const response = await fetch(`https://api.thedogapi.com/v1/breeds/${idRaza}?api_key=${API_KEY}`)
      const data = await response.json();

      let raza = {
        name: data.name,
        temperamentos: data.temperament,
        image: data.reference_image_id,
        height: data.height.metric,
        weight: data.weight.metric,
        life_span: data.life_span
      }

      res.json(raza);
    } catch {
      res.send('ocurrio un error')
    }

  }


})

module.exports = router;

