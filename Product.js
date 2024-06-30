
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {

        ProductID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,

        },

        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false
        },

        Description: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },

        Price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            unique: false
        },
        Category: {
            type: DataTypes.STRING,  // Assuming Category is a string
            allowNull: true,
            unique: false

        },

    });
    return Product;

};