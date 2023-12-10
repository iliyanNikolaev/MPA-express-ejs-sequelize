module.exports = (sequelize, DataTypes) => {
    const Laptop = sequelize.define('laptop', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
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