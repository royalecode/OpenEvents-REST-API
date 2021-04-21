const router = require('express').Router();
const controller = require('../controllers/events.controller');
const authenticate = require('../authentication');

//Public Endpoints
router.get("/", controller.getAllEvents);
router.get("/:id", controller.getEvent);

router.use(authenticate);

//Private Endpoints
// router.post("/", controller.createEvent);
// router.put("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

router.get("/:id/assistances", controller.assistances);
router.get("/:id/assistances/:user", controller.userAssistance);
router.post("/:id/assistances", controller.createAssistance);
// router.put("/:id/assistances", controller.updateAssistance);
router.delete("/:id/assistances", controller.deleteAssistance);


module.exports = router;