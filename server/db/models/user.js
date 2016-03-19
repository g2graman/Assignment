'use strict';

const Waterline = require('Waterline');
const bcrypt = require('bcryptjs');
const uuid = require('node-uuid');

let User = (connection, identity) => Waterline.Collection.extend({
  identity: identity,
  connection: connection,

  attributes: {
    migrate: 'safe',
    autoPK: false,

    id: {
      type: 'text',
      primaryKey: true,
      unique: true,
      index: true,
      uuidv4: true,
      defaultsTo: function() {
        return uuid.v4();
      }
    },

    email: {
      type: 'string',
      email: true,
      required: true,
      index: true,
      unique: true
    },

    first_name: {
      type: 'string',
      required: true
    },

    last_name: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    phone_number: {
      type: 'string',
      minLength: 10,
      required: true
    },

    contacts: {
      collection: 'user',
      via: 'contacts'
    },

    toJSON: function() {
      let obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function (values, next) {
    bcrypt.genSalt(11, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);

        values.password = hash;
        next();
      });
    });
  }
});

module.exports = User;
