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
db.UserDetails = require('./UserDetails')(sequelize, Sequelize);
db.UserLogin = require('./UserLogin')(sequelize,Sequelize);
db.Transaction = require('./Transaction')(sequelize,Sequelize);
db.Transaction = require('./Stock')(sequelize,Sequelize);
db.Transaction = require('./Order')(sequelize,Sequelize);
db.Transaction = require('./Category')(sequelize,Sequelize);
db.Transaction = require('./Cart')(sequelize,Sequelize);

module.exports = db
