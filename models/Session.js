
var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('session', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_user: {
            type: Sequelize.DataTypes.INTEGER,
        },
        start: {
            type: Sequelize.DataTypes.DATEONLY,
        },
        end: {
            type: Sequelize.DataTypes.DATEONLY
        },
        nb_punches: {
            type: Sequelize.DataTypes.INTEGER
        },
        average_power: {
            type: Sequelize.DataTypes.INTEGER
        },
        min_power: {
            type: Sequelize.DataTypes.INTEGER
        },
        max_power: {
            type: Sequelize.DataTypes.INTEGER
        }
    });
};