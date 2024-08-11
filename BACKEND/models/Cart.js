module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    CartAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });

  Cart.associate = function (models) {
    Cart.hasMany(models.UserDetails, { foreignKey: "UserID" });
    Cart.hasMany(models.Product, { foreignKey: "ProductId" });
  };

  return Cart;
};
