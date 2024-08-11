module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Order.associate = function (models) {
    Order.belongsTo(models.UserDetails, { foreignKey: "UserID" });
    Order.hasMany(models.Transaction, { foreignKey: "OrderID" });
  };

  return Order;
};
