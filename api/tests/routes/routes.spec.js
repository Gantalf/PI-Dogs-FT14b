/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
// const { INET } = require('sequelize/types');
const supertest = require('supertest');
const app = require('../../src/app.js');
const { Raza, Temperamento } = require('../../src/db.js');

const agent = supertest(app);
const dog = {
  name: 'Pug',
};

describe('Dogs routes', () => {
  beforeEach(function () {
    return Raza.sync({ force: true })
  })

  describe('Pedidos HTTP', function () {
    beforeEach(function () {
      return Raza.sync({ force: true })
    })
    describe('GET /dogs', function () {
      it('responde con un 200', function () {
        return agent.get('/dogs')
          .expect(200);
      })
      it('busca un perro por el nombre', function () {
        return Raza.create({
          Nombre: "Terrier",
          Altura: "19",
          Peso: "30",
          Añosdevida: "14"
        })
          .then(() => {
            return agent.get('/dogs?name=Terrier')
          })
          .then(dogs => {
            expect(dogs).to.exist;
          })
      })
    })
    describe('GET /temperament', function () {
      beforeEach(function () {
        return Temperamento.sync({ force: true })
      })
      it('responde con 200', function () {
        return agent.get('/temperament')
          .send({
            Nombre: 'Stubborn',
          })
          .expect(200);
      });
      it('crea una Temperamento en la base de datos', function () {
        return agent.get('/temperament')
          .send({
            Nombre: 'Stubborn',
          })
          .then(() => {
            return Temperamento.findOne({
              where: {
                Nombre: 'Stubborn'
              }
            });
          })
          .then(page => {
            expect(page).to.exist;
          });
      });
    });
  });
  describe('POST /dog', function () {
    beforeEach(function () {
      return Raza.sync({ force: true })
    })
    it('Crea una Raza en la Base de datos', function () {
      return Raza.create({
        Nombre: "Terrier",
        Altura: "19",
        Peso: "30",
        Añosdevida: "14"
      })
        .then(() => {
          return Raza.findOne({
            where: {
              Nombre: 'Terrier'
            }
          })
        })
        .then((raza) => {
          expect(raza).to.exist;
        })
    })
  })
});