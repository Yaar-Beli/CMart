const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Product = require('./Product')(sequelize,Sequelize);

module.exports = db
