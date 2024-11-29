const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    String(process.env.POSTGRES_PASSWORD),
    {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect: 'postgres',
        logging: false,
    }
);




const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    director: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    releaseYear: {
        type: DataTypes.INTEGER,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: true,
    tableName: 'Movie',
});

module.exports = {Movie, sequelize};
