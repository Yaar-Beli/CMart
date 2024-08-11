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

// Import models
db.Category = require("./Category")(sequelize, Sequelize);
db.Product = require("./Product")(sequelize, Sequelize);
db.UserDetails = require("./UserDetails")(sequelize, Sequelize);
db.Order = require("./Order")(sequelize, Sequelize);
db.Stock = require("./Stock")(sequelize, Sequelize);
db.Transaction = require("./Transaction")(sequelize, Sequelize);
db.UserLogin = require("./UserLogin")(sequelize, Sequelize);
db.Cart = require("./Cart")(sequelize, Sequelize);

// Define associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync models
// (async () => {
//   try {
//     // Sync all models
//     await sequelize.sync({ force: true });
//     console.log("Database & tables created!");
//   } catch (error) {
//     console.error("Error syncing models:", error);
//   }
// })();
// Sync models
(async () => {
  try {
    // Sync all models with alter option
    await sequelize.sync({ force: true });
    console.log("Database & tables updated!");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
})();

module.exports = db;
