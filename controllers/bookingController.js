const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.bookEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (event.bookedSlots >= event.capacity) {
      return res.status(400).json({ msg: 'Event is fully booked' });
    }

    const booking = new Booking({ user: req.user.id, event: event._id });
    await booking.save();

    event.bookedSlots += 1;
    await event.save();

    res.json(booking);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ user: req.user.id, event: req.params.id });

    if (!booking) {
      return res.status(400).json({ msg: 'No booking found' });
    }

    await Booking.findByIdAndDelete(booking._id);

    const event = await Event.findById(req.params.id);
    event.bookedSlots -= 1;
    await event.save();

    res.json({ msg: 'Booking cancelled' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
