module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Show:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      foreignKey: "CategoryID",
    });
  };

  return Category;
};
