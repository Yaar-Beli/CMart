module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define("Stock", {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
  });

  Stock.associate = function (models) {
    Stock.belongsTo(models.Product, { foreignKey: "ProductID" });
  };

  return Stock;
};
