const { expect } = require('chai');
const { conn } = require('../../src/db');

const { Raza, Temperamento } = require('../../src/db.js');


describe('model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Raza.sync({ force: true }));
    describe('Nombre Raza', () => {
      it('Envia error si el nombre es null', (done) => {
        Raza.create({})
          .then(() => done(new Error('El nombre es requerido')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Raza.create({ name: 'Pug' });
      });
    });
  });
  describe('Nombre temperamento', () => {
    beforeEach(() => Temperamento.sync({ force: true }));
    describe('Nombre temperamento', () => {
      it('debe crear bien el Nombre', async () => {
        await Temperamento.create({
          Nombre: 'Gay'
        })
        let temp = await Temperamento.findOne({
          where: {
            Nombre: 'Gay'
          }
        })
        expect(temp.Nombre).to.equal('Gay');
      });
    })
  });
});
