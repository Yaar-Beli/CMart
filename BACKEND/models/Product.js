module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: "CategoryID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Product;
};
