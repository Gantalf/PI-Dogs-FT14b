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
      console.log(dogsDb);


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
      let arrayRespuesta = dogsDb.concat(firstEigth);

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

      nombreTemperamento = []

      dogsDb.map(item => {
        nombreTemperamento.push({
          ID: item.ID,
          Nombre: item.Nombre,
          temperamentos: item.temperamentos.map(element => {
            return element.Nombre
          }).join(', '),
          Peso: item.Peso
        })
      })

      console.log(nombreTemperamento);

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
// [ ] Años de vida

router.get('/dogs/:idRaza', async function (req, res) {
  const { idRaza } = req.params;
  try {
    const raza = await Raza.findByPk(idRaza, {
      include: Temperamento
    })

    nombreTemperamento = []

    dogsDb.map(item => {
      nombreTemperamento.push({
        ID: item.ID,
        Nombre: item.Nombre,
        Altura: item.Altura,
        Peso: item.Peso,
        Añosdevida: item.Añosdevida,
        temperamentos: item.temperamentos.map(element => {
          return element.Nombre
        }).join(', ')
      })
    })

    let razaSend = {
      name: raza.name,
      temperamentos: raza.temperament,
      //hace una imagen desde local
      height: raza.height.metric,
      weight: raza.weight.metric,
      life_span: raza.life_span
    }
    res.json(razaSend)
  } catch {


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
  }


})

module.exports = router;

