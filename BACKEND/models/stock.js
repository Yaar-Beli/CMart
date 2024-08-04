module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define("Stock", {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "ProductID",
      },
    },
    Quantity: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
  });

  Stock.associate = function (models) {
    Stock.hasMany(models.Products, { foreignKey: "ProductID" });
  };

  return Stock;
};

//checkkkkkkkkkkkkkkkkkkkkkkkkkkkk
