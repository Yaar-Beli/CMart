module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER, // Assuming ProductID is an integer, if not, keep it as STRING
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        cartAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        }
    });

    Cart.associate = function(models) {
        Cart.belongsTo(models.User, { foreignKey: 'userId' });
        Cart.belongsTo(models.Product, { foreignKey: 'productId' });
    };

    return Cart;
};
