import mongoose from 'mongoose'

var Seat = mongoose.model('Seat', {
  id: { type: String, unique: true },
  room: Number,
  status: { type: String, unique: true, default: '000000000000'}
})

export {Seat}
