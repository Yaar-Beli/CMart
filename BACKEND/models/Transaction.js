// models/Transaction.js
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    TransactionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Order", // Ensure this matches the name of the Order table
        key: "OrderID",
      },
    },
  });

  Transaction.associate = function (models) {
    Transaction.hasMany(models.Order, { foreignKey: "OrderID" });
  };

  return Transaction;
};
