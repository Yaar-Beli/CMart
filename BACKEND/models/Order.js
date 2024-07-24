module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        OrderID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Amount: {
            type: DataTypes.NUMERIC,
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Address', // This should match the name of the Address model
                key: 'id'
            }
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users', // This should match the name of the User model
                key: 'UserID'
            }
        },
        Details: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Order.associate = function(models) {
        Order.belongsTo(models.Address, { foreignKey: 'Address' });
        Order.belongsTo(models.User, { foreignKey: 'UserID' });
    };

    return Order;
};


//checkkkkkkkkkkkkkkkkkkkkkkkk