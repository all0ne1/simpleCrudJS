const movieRoutes = require('./routes/movieRoutes')
const miscRoutes = require('./routes/miscRoutes')
const router = require('./routes/movieRoutes');



router.use('/movies', movieRoutes);
router.use('', miscRoutes);

module.exports = router;
