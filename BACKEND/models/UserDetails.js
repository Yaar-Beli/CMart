module.exports = (sequelize, DataTypes) => {

    const UserDetails = sequelize.define('UserDetails',{

        UserId: {
            type: DataTypes.INTEGER,
            allowNull : false,
            unique : true,
        },
        FName: {
            type: DataTypes.STRING,
            allowNull : false,
            unique :false,
        },
        LName: {
            type: DataTypes.STRING,
            allowNull : false,
            unique : false,
        },
        Contact: {
            type: DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull : false,
            unique : false,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull : false,
            unique : false,
        },
        Photo: {
            type: DataTypes.BLOB('long'),
            allowNull : true,
            unique : false,
        },

    })
}