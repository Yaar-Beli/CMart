module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserDetail",
        key: "UserID",
      },
    },
    productId: {
      type: DataTypes.INTEGER, // Assuming ProductID is an integer, if not, keep it as STRING
      allowNull: false,
      references: {
        model: "Product",
        key: "ProductID",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    cartAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });

  Cart.associate = function (models) {
    Cart.hasMany(models.UserDetails, { foreignKey: "UserID" });
    Cart.hasMany(models.Product, { foreignKey: "productId" });
  };

  return Cart;
};
