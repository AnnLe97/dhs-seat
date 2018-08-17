import mongoose from 'mongoose'

var Schedule = mongoose.model('Schedule', {
  username: { type: String, unique: true },
  schedule: String
})

export {Schedule}