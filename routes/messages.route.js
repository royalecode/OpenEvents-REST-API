const router = require('express').Router();
const controller = require('../controllers/messages.controller');
const authenticate = require('../authentication');

router.use(authenticate);

//Private Endpoints
router.post("/", controller.newMessage);
router.get("/users", controller.usersChat);
router.get("/:id", controller.messagesChat);

module.exports = router;