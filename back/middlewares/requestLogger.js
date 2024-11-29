const { v4: uuidv4 } = require('uuid');

function requestLogger(req, res, next) {
    req.requestId = uuidv4();
    console.log(`[${req.requestId}] ${req.method} ${req.url}`);
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${req.requestId}] Completed in ${duration}ms`);
    });

    next();
}

module.exports = requestLogger;
