module.exports = (sequelize, DataTypes) => {
    const Laptop = sequelize.define('laptop', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE(10,2),
        },
        description: {
            type: DataTypes.TEXT
        },
        available: {
            type: DataTypes.BOOLEAN
        }
    });

    return Laptop;
}