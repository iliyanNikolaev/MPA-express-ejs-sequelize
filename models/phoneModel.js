module.exports = (sequelize, DataTypes) => {
    const Phone = sequelize.define('phone', {
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

    return Phone;
}