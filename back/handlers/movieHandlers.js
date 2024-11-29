const {Movie, sequelize} = require('../models/movie');
const {Op} = require('sequelize');
const joi = require('joi');

async function getMovies(req, res, next) {
    try{
        const { sortBy, director, genre} = req.query;
        let filter = {}
        if (director) filter.director = { [Op.iLike]: `%${director}%` };
        if (genre) filter.genre = { [Op.iLike]: `%${genre}%` };

        let order = [];
        if (sortBy) order.push([sortBy, 'ASC'])

        const movies = await Movie.findAll({where: filter, order});
        res.json(movies);
    }
    catch(err){
        next(err);
    }

}

async function getMovie(req, res, next) {
    try{
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({message: "Фильм не найден"})
        }
        res.json(movie)

    } catch(err){
        next(err);
    }
}

async function createMovie(req, res, next) {
    try{
        const schema = joi.object({
            title: joi.string().required(),
            description: joi.string().allow(''),
            director: joi.string().required(),
            genre: joi.string().required(),
            releaseYear: joi.number().min(1895),
            duration: joi.number().min(1),
        });
        const { error, value} = schema.validate(req.body);
        if (error){
            return res.status(400).json({message: error.details[0].message});
        }
        const existingMovie = await Movie.findOne({
            where: {title: value.title}
        })
        if (existingMovie) {
            return res.status(409).json({message: "Фильм уже существует"});
        }
        const movie = await Movie.create(value)
        res.status(201).json(movie);
    } catch(err){
        next(err);
    }
}

async function updateMovie(req, res, next){
    try{
        const { id } = req.params;
        const schema = joi.object({
            title: joi.string().required(),
            description: joi.string().allow(''),
            director: joi.string().required(),
            genre: joi.string().required(),
            releaseYear: joi.number().min(1895),
            duration: joi.number().min(1),
        });
        const { error, value } = schema.validate(req.body);
        if (error){
            return res.status(400).json({message: error.details[0].message});
        }
        const [updatedRowsCount] = await Movie.update(value, {
            where: { id },
        });
        if (updatedRowsCount === 0) {
            return res.status(204).json();
        }
        const updatedMovie = await Movie.findByPk(id);
        res.json(updatedMovie);
    } catch(err){
        next(err);
    }
}


async function deleteMovie(req, res, next) {
    try {
        const { id } = req.params;

        const deletedRowsCount = await Movie.destroy({ where: { id } });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: 'Фильм не найден' });
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
};