const express = require('express');
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, eventController.getEvents);

router.post('/', authMiddleware, roleMiddleware('admin'), eventController.addEvent);

router.put('/:id', authMiddleware, roleMiddleware('admin'), eventController.updateEvent);

router.delete('/:id', authMiddleware, roleMiddleware('admin'), eventController.deleteEvent);

module.exports = router;
