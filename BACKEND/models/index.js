const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "postgresql://KuwarJ:Pass123@localhost:5432/CMart",
  {
    dialect: "postgres",
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Category = require("./Category")(sequelize, Sequelize);
db.Product = require("./Product")(sequelize, Sequelize);
db.UserDetails = require("./UserDetails")(sequelize, Sequelize);
db.Cart = require("./Cart")(sequelize, Sequelize);
db.Order = require("./Order")(sequelize, Sequelize);
db.Stock = require("./Stock")(sequelize, Sequelize);
db.Transaction = require("./Transaction")(sequelize, Sequelize);
db.UserLogin = require("./UserLogin")(sequelize, Sequelize);

// Sync models
// (async () => {
//   await db.sequelize.sync({ force: true });
//   console.log("Database & tables created!");
// })();

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db;
