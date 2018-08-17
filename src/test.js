const mongoose = require('mongoose')
// const {User} = require('./model/user')

const MONGO_URI = 'mongodb+srv://admin:admin@dhs-seat-kkln7.gcp.mongodb.net/test?retryWrites=true'

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)

var User = mongoose.model('User', {
    username: { type: String, unique: true },
    password: String
})
  

var user = new User({
    username: 'abc',
    password: '123'
})

user.save((err,data)=>{
    if(err)throw err
    else console.log(data)
})