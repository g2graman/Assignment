'use strict';

const Waterline = require('Waterline');
const bcrypt = require('bcryptjs');

let User = (connection, identity) => Waterline.Collection.extend({
  identity: identity,
  connection: connection,

  attributes: {
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    name: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    classes: {
      type: 'array',
      required: true
    },

    toJSON: function() {
      let obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(values, next){
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
