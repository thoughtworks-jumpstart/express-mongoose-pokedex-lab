require('../models/pokemon.model');
const mongoose = require('mongoose');
const Pokemon = mongoose.model('pokemon');
const { flattenObj } = require('../utils/objectHelper');

const findAll = async (req, res) => {
  const foundPokemon = await Pokemon.find();
  res.json(foundPokemon);
};

const findOne = async (req, res, next) => {
  res.sendStatus(501);
};

const createOne = async (req, res, next) => {
  res.sendStatus(501);
};

const deleteOne = async (req, res, next) => {
  res.sendStatus(501);
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updateFields = flattenObj(update);

    await Pokemon.findOneAndUpdate({ id }, updateFields);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
  updateOne,
};
