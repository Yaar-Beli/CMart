const { Product } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },

    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },

    Description: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },

    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      unique: false,
    },
    Category: {
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: "Category", // This should match the name of the Product model
        key: "CategoryID",
      },
    },
  });

  Product.associate = function (models) {
    Product.hasMany(models.Category, { foreignKey: "CategoryID" });
  };
  return Product;
};
