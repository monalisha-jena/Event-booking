const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.addEvent = async (req, res) => {
  const { name, date, location, capacity } = req.body;

  try {
    const event = new Event({ name, date, location, capacity });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateEvent = async (req, res) => {
  const { name, date, location, capacity } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { name, date, location, capacity }, { new: true });
    res.json(event);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
