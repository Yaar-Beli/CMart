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
        model: "Orders", // Ensure this matches the name of the Order table
        key: "OrderID",
      },
    },
  });

  Transaction.associate = function (models) {
    Transaction.hasMany(models.Orders, { foreignKey: "OrderID" });
  };

  return Transaction;
};
