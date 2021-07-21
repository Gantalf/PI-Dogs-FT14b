const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogsRouter = require('./dogs');
const temperamentRouter = require('./temperament');
const dogRouter = require('./dog');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(dogsRouter);
router.use(temperamentRouter);
router.use(dogRouter);


module.exports = router;
