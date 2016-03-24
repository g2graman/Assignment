'use strict';

const R = require('ramda');
const Waterline = require('waterline');
const memory = require('sails-memory');
const mongo = require('sails-mongo');
const requireDir = require('require-dir');

const ModelDefinitions = requireDir('./models');
const Controllers = requireDir('./controllers');
const UserSeeder = require('./seeds/users.js');

let DB = new Waterline();

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

module.exports = function (App) {
  const initDb = (models, controllers, connection) => {
    return R.map(
        (ModelWrapper) => {
        let filename = ModelWrapper[0],
        model = ModelWrapper[1];

        let collection = {
          name: filename,
          model: model(connection, filename),
          controller: controllers.hasOwnProperty(filename)
            ? controllers[filename]
            : {}
        };
        DB.loadCollection(collection.model);
        return collection;
      },
      R.toPairs(models)
    );
  };


  const collections = initDb(ModelDefinitions, Controllers, 'default');
  DB.initialize(config, function (err, db) {
      if (err) return console.error(err);

      UserSeeder(db); // seed users

      R.forEach((collection) => {
          if (!R.isEmpty(collection) && collection.hasOwnProperty('controller')) {
            collection.controller(collection.name, db.collections[collection.name], App);
          }
      }, collections);
    }
  );


};

