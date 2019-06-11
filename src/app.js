const express = require('express');
const morgan = require('morgan');
const pokemonRoute = require('./routes/pokemon.route');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.get('/', (req, res) => res.send('Hello world'));
app.use('/pokemon', pokemonRoute);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log('error', err);
  res.sendStatus(500);
});

module.exports = app;
