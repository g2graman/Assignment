'use strict';

const faker = require('faker');

module.exports = (db) => {
  const User = db.collections.user;

  let l = 25;
  let users = [{
    email: 'admin@admin.com',
    first_name: 'admin',
    last_name: 'admin',
    phone_number: '123-123-1234',
    password: 'admin'
  }];

  while (l--) {
    users.push({
      email: faker.internet.email(),
      phone_number: faker.phone.phoneNumber(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      password: faker.internet.password()
    });
  }


  User
    .create(users)
    .exec(function (err, created) {
      if (err) {
        console.error(err);
      } else {
        console.log('Seeded', created.length, 'users');
        console.log(created);
      }
    });
};
