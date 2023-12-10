const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
);

sequelize.authenticate()
    .then(() => console.log('db connected'))
    .catch(err => console.log('>>>DB NOT CONNECTED<<<\n', err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.laptops = require('./laptopModel.js')(sequelize, DataTypes);
db.phones = require('./phoneModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => console.log('re-sync done!'));

module.exports = db;