module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define("UserDetails", {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    FName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Photo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    Disable:{
      type: DataTypes.BOOLEAN,
      allowNull:false
    }
  });

  UserDetails.associate = function (models) {
    UserDetails.hasOne(models.UserLogin, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    UserDetails.hasMany(models.Order, {
      foreignKey: "UserID",
    });
  };

  return UserDetails;
};
