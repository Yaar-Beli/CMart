module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('stock', {
        ProductID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Product', // This should match the name of the Product model
                key: 'ProductID'
            }
        },
        Quantity: {
            type: DataTypes.NUMERIC,
            allowNull: false
        }
    });

    Stock.associate = function(models) {
        Stock.belongsTo(models.Product, { foreignKey: 'ProductID' });
    };

    return Stock;
};





//checkkkkkkkkkkkkkkkkkkkkkkkkkkkk
