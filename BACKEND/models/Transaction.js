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
    },
  });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Order, { foreignKey: "OrderID" });
  };

  return Transaction;
};
