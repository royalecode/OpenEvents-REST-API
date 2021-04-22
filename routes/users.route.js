const router = require('express').Router();
const controller = require('../controllers/users.controller');
const authenticate = require('../authentication');

//Public Endpoints
router.post("/", controller.register);
router.post("/login", controller.login);

router.use(authenticate);

//Private Endpoints
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUser);
router.get("/search", controller.search);
router.put("/", controller.updateUser);
router.delete("/", controller.deleteUser);

router.get("/:id/events", controller.events);
router.get("/:id/events/future", controller.futureEvents);
router.get("/:id/events/finished", controller.finishedEvents);
router.get("/:id/events/current", controller.currentEvents);

router.get("/:id/assistances", controller.assistances);
router.get("/:id/assistances/future", controller.assistancesFuture);
router.get("/:id/assistances/finished", controller.assistancesFinished);

router.get("/:id/friends", controller.friends);

module.exports = router;