// import mongoose from 'mongoose'
const mongoose = require('mongoose')

var User = mongoose.model('User', {
  username: { type: String, unique: true },
  password: String
})

// export {User}
