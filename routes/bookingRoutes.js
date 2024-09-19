const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:id/book', authMiddleware, bookingController.bookEvent);

router.delete('/:id/cancel', authMiddleware, bookingController.cancelBooking);

module.exports = router;
