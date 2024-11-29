function errorHandler(err, req, res, next) {
    console.error(`[${req.requestId}] Error:`, err);

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: err.errors[0].message });
    }

    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}

module.exports = errorHandler;