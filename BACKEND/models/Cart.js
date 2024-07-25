module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        UserID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'UserDetails',
                key: 'UserID'
            }
        },
        ProductID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'ProductID'
            }
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CartAmount: {
            type: DataTypes.NUMERIC,
            allowNull: false
        }
    });

    Cart.associate = function(models) {
        Cart.belongsTo(models.User, { foreignKey: 'UserID' });
        Cart.belongsTo(models.Product, { foreignKey: 'ProductID' });
    };

    return Cart;
};
