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
db.Stock = require('./Stock')(sequelize,Sequelize);
db.Order = require('./Order')(sequelize,Sequelize);
db.Category = require('./Category')(sequelize,Sequelize);
db.Cart = require('./Cart')(sequelize,Sequelize);

// (async () => {
//     await db.sequelize.sync({ force: true }); // { force: true } will drop the table if it already exists
//     console.log("Database & tables created!");
// })();

module.exports = db
