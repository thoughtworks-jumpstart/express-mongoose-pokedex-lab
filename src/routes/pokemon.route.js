const { Router } = require('express');
const Ctrl = require('../controllers/pokemon.controller');

const pokemonRouter = Router();

pokemonRouter.get('/', Ctrl.findAll);
pokemonRouter.post('/', Ctrl.createOne);

pokemonRouter.get('/:id', Ctrl.findOne);
pokemonRouter.put('/:id', Ctrl.updateOne);
pokemonRouter.delete('/:id', Ctrl.deleteOne);

module.exports = pokemonRouter;
