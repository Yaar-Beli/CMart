module.exports = (sequelize, DataTypes) => {
    const UserLogin = sequelize.define('UserLogin', {
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "UserDetails",
              key: "UserID",
            },
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
        UserLogin.hasMany(models.UserDetails, { foreignKey: 'UserID' });
        UserLogin.hasMany(models.Products, { foreignKey: 'ProductID' });
    };

    return UserLogin;
};
