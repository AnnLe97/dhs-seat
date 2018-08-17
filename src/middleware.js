const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']

var scheDecode = function UserScheduleDecodeFromString (string) {
  if (string.length !== 48) return null
  else {
    let outputObj = {}
    let scheArray = string.match(/.{1,4}/g)
    weekDays.forEach(day => {
      outputObj[day] = ''
    })
    var index = 0
    for (let key in outputObj) {
      outputObj[key] = [scheArray[index], scheArray[index + 1]]
      index += 2
    }
    return outputObj
  }
}

var scheEncode = function UserScheduleEncodeToString (object) {
  let outputString = ''
  for (let key in object) {
    outputString += object[key].join('')
  }
  return outputString
}

var seatDecode = function SeatStatusDecodeFromString (string) {
  if(string.length !== 12) return null
  else {
    let outputObj = {}
    let scheArray = string.split('')
    weekDays.forEach(day => {
      outputObj[day] = ''
    })
    let index = 0
    for (let key in outputObj) {
      outputObj[key] = [scheArray[index], scheArray[index + 1]]
      index += 2
    }
    return outputObj
  }
}

// console.log(scheDecode('000000000000000000000000000000000000000000000000'))
// console.log(scheEncode({ mon: [ '0000', '0000' ],
//   tue: [ '0000', '0000' ],
//   wed: [ '0000', '0000' ],
//   thu: [ '0000', '0000' ],
//   fri: [ '0000', '0000' ],
//   sat: [ '0000', '0000' ] }))
console.log(seatDecode('000000000000'))
// export {scheDecode, scheEncode}
