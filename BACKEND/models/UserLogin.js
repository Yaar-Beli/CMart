module.exports = (sequelize, DataTypes) => {
  const UserLogin = sequelize.define("UserLogin", {
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  UserLogin.associate = function (models) {
    UserLogin.belongsTo(models.UserDetails, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return UserLogin;
};
