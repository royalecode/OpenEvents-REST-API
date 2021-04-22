const router = require('express').Router();
const controller = require('../controllers/friends.controller');
const authenticate = require('../authentication');

router.use(authenticate);

//Private Endpoints
router.get("/requests", controller.getRequests);
router.get("/", controller.getFriends);
router.post("/:id", controller.requestFriendShip);
router.put("/:id", controller.acceptRequest);
router.delete("/:id", controller.declineRequest);

module.exports = router;