const { User } = require('../models');

const userData = [{
        username: 'John',
        password: 'johnpass'

    },
    {
        username: 'Boblin',
        password: 'bobobob'
    },
    {
        username: 'User1',
        password: 'Pass1'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;