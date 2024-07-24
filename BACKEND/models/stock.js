module.exports = (sequelize, DataTypes) => {
    const stock = sequelize.define('stock', {
        ProductID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'stock', // This should match the name of the Product model
                key: 'id'
            }
        },
        Quantity: {
            type: DataTypes.NUMERIC,
            allowNull: false
        }
    });

    stock.associate = function(models) {
        stock.belongsTo(models.Product, { foreignKey: 'ProductID' });
    };

    return stock;
};





//checkkkkkkkkkkkkkkkkkkkkkkkkkkkk
