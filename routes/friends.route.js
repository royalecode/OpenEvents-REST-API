const router = require('express').Router();
const controller = require('../controllers/users.controller');
const authenticate = require('../authentication');

//Public Endpoints
router.get("/", controller.getAllEvents);
router.get("/:id", controller.getEvent);

router.use(authenticate);

//Private Endpoints
