module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        CategoryID: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
            
        },
        CategoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Show: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    return Category;
};
