module.exports = (sequelize, DataTypes) => {
    const UserLogin = sequelize.define('UserLogin', {
        UserID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Enable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    UserLogin.associate = function(models) {
        UserLogin.belongsTo(models.User, { foreignKey: 'UserID' });
        UserLogin.belongsTo(models.Product, { foreignKey: 'ProductID' });
    };

    return UserLogin;
};
