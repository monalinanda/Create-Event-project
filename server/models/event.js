const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date:{
    type: String,
  },
  time:{
    type: String,
  },
  duration:{
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
});

module.exports = mongoose.model('Event', EventsSchema);