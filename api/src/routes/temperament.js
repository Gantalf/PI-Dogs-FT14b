const { Router } = require('express');
const router = require('express').Router();

const { Temperamento } = require('../db');

const fetch = require('node-fetch');

require('dotenv').config();
const {
  API_KEY
} = process.env;

router.get('/temperament', async function (req, res) {
  try {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const data = await response.json();
    //Creamos un array donde guardaremos los temperamentos de la DB

    const arrayTemperament = await Temperamento.findAll({
      attributes: ['Nombre', 'id']
    })
    try {
      if (arrayTemperament.length < 1) {
        let arrayData = [];
        // separo cada string de temperamento, les quito todos los espacios a los costaods y los pusheo a un array
        data.map((elemt) => {

          if (elemt.temperament) {
            let temp = elemt.temperament.split(',');

            tempClear = temp.forEach(element => {
              arrayData.push(element.trim())
            });
          }
        })

        //new Set() se encarga de eliminar los elementos repetidos en un array. limpiamos los caracteres de mas 
        //anteriormente, porque no diferencia entre: 'txt' y ' txt'. Tiene un complejidad de O(nlogn)
        const arrayDataSinDuplicados = new Set(arrayData);

        let resultado = [...arrayDataSinDuplicados];


        //guardamos en la DB
        try {
          resultado.map(async (item) => {
            try {
              await Temperamento.create({
                Nombre: item,
              })
            } catch (err) {
              res.status(404).send('Error');
            }

          })
        } catch {
          res.status(404).send('Error');
        }

        let resultadoBD = await Temperamento.findAll({
          attributes: ['Nombre', 'id']
        })
        Temperamento.sync()
        res.json(resultadoBD)
      } else {
        res.status(200).json(arrayTemperament);
      }
    } catch (err) {
      throw new Error(err)
    }
    //preguntamos si no existe nada en ese array, quiere decir que es la primera vez que pega en /temperament

  } catch {
    res.status(404).send('Error');
  }
})

module.exports = router;


