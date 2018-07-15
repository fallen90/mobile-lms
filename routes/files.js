const api = require('express').Router();

api.get('/files', (req, res) => {
  return res.send(200);
});

module.exports = api;
