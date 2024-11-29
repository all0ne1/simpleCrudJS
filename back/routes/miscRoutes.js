const router = require("./movieRoutes");
const miscHandlers = require("../handlers/miscHandlers");

router.get('/os-info', miscHandlers.getOsInfo);
router.get('/file-info', miscHandlers.getFileInfo);

module.exports = router;