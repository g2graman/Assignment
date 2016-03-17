'use strict';

const R = require('ramda');
const Waterline = require('waterline');
const memory = require('sails-memory');
const mongo = require('sails-mongo');
const requireDir = require('require-dir');
const ModelDefinitions = requireDir('./models');

let db = new Waterline();

let config = {
  adapters: {
    memory,
    mongo
  },

  connections: {
    default: {
      adapter: 'memory'
    }
  }
};

const initModels = (models, connection) => {
  let configuredModels = R.map(
    (ModelWrapper) => {
      let filename = ModelWrapper[0],
        model = ModelWrapper[1];

      return model(connection, filename);
    },
    R.toPairs(models)
  );

  return R.map(
    (model) => db.loadCollection(model),
    configuredModels
  );
};

initModels(ModelDefinitions, 'default');

db.initialize(config, function (err, ontology) {
    if (err) return console.error(err);
  }
);

module.exports = db;
