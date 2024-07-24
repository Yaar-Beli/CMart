module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        TransactionID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        Amount: {
            type: DataTypes.NUMERIC,
            allowNull: false
        },
        OrderID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Orders',
                key: 'id'
            }
        }
    });

    Transaction.associate = function(models) {
        Transaction.belongsTo(models.Order, { foreignKey: 'OrderID' });
    };
    return Transaction;
};


//checkkkkkkkkkkkkkkkkkkkkk