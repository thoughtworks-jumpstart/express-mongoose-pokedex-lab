const pokemonData = require('../data/pokemon.data');
const { MongoClient } = require('mongodb');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
require('../../src/utils/db');

describe('Pokemon', () => {
  let connection;
  let db;

  beforeAll(async () => {
    const dbParams = global.__MONGO_URI__.split('/');
    const dbName = dbParams[dbParams.length - 1];
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  it('GET / should return Hello world', async () => {
    const response = await request(app).get('/');

    expect(response.text).toEqual('Hello world');
  });

  const getPokemonData = index => pokemonData.slice(index, index + 1)[0];

  describe('/pokemon', () => {
    it('/GET should find all pokemon', async () => {
      const collection = db.collection('pokemons');
      await collection.insertMany(pokemonData);

      const response = await request(app).get('/pokemon');

      expect(response.body).toMatchObject(pokemonData);
    });

    xit('/POST should create a pokemon', async () => {});
  });

  describe('/pokemon/:id', () => {
    xit('/GET should a single pokemon', async () => {});

    xit('DELETE should remove data from database', async () => {});

    it('/PUT should modify the data from database', async () => {
      const pokemon = getPokemonData(0);
      const collection = db.collection('pokemons');
      await collection.insertMany(pokemonData);
      const updatedFields = {
        name: {
          english: 'John Smith',
        },
      };

      const response = await request(app)
        .put(`/pokemon/${pokemon.id}`)
        .send(updatedFields)
        .set('Content-Type', 'application/json');

      expect(response.status).toEqual(200);

      const dataFromDb = await collection.findOne({ id: pokemon.id });
      expect(dataFromDb.name.english).toEqual(updatedFields.name.english);
    });
  });
});
