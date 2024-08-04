module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define("Stock", {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Product",
        key: "ProductID",
      },
    },
    Quantity: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
  });

  Stock.associate = function (models) {
    Stock.hasMany(models.Product, { foreignKey: "ProductID" });
  };

  return Stock;
};

//checkkkkkkkkkkkkkkkkkkkkkkkkkkkk
