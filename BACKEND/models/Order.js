module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        OrderID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Amount: {
            type: DataTypes.NUMERIC, //DECIMAL COUNTS
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false,
            // references: {
            //     model: 'Address', // This should match the name of the Address model
            //     key: 'id'
            // }
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'UserLogins', // This should match the name of the User model
                key: 'UserID'
            }
        },
        Details: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Order.associate = function(models) {
        // Order.belongsTo(models.Address, { foreignKey: 'Address' });
        Order.belongsTo(models.UserLogins, { foreignKey: 'UserID' });
    };

    return Order;
};


//checkkkkkkkkkkkkkkkkkkkkkkkk