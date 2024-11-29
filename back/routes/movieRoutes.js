const express = require('express');
const router = express.Router({strict: true});
const movieHandlers = require('../handlers/movieHandlers');

router.get('/', movieHandlers.getMovies);
router.get('/:id/', movieHandlers.getMovie);
router.post('/', movieHandlers.createMovie);
router.put('/:id/', movieHandlers.updateMovie);
router.delete('/:id/', movieHandlers.deleteMovie);

module.exports = router;
