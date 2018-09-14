import client from '../apollo'
import gql from 'graphql-tag'

export const userLogin = {
  state: {
    loginState: 0,
    showPasswordState: 0,
    username: '',
    usernameInput: '',
    passwordInput: '',
    failed: 0,
    error: ''
  },
  reducers: {
    showPassword (state, payload) {
      console.log(payload)
      return {
        ...state,
        showPasswordState: payload
      }
    },
    usernameChange (state, payload) {
      console.log(payload)
      return {
        ...state,
        usernameInput: payload
      }
    },
    passwordChange (state, payload) {
      console.log(payload)
      return {
        ...state,
        passwordInput: payload
      }
    },
    logout (state) {
      return {
        ...state,
        loginState: 0,
        username: '',
        usernameInput: '',
        passwordInput: ''
      }
    },
    login (state, payload) {
      console.log(payload)
      return {
        ...state,
        loginState: 1,
        username: payload.username,
        usernameInput: '',
        passwordInput: ''
      }
    },
    loginFail (state, payload) {
      return {
        ...state,
        loginState: 0,
        passwordInput: '',
        failed: 1,
        error: payload
      }
    }
  },
  effects: (dispatch) => ({
    async loginAuth (payload, rootState) {
      console.log(payload)
      client.mutate({
        variables: {
          'username': payload.username,
          'password': payload.password
        },
        mutation: gql`mutation login($username: String!, $password: String!){
          login(username: $username, password: $password){
            errors sessionID token
          }
        }`
      }).then(result=>{
        console.log(result)
        if(result.data.login.errors===null) {
          dispatch.userLogin.login(payload)
        }
        else {
          dispatch.userLogin.loginFail(result.data.login.errors)
        }
      })
      // client.query({
      //   query: gql`
      //   {
      //     getUsers {
      //       username password
      //     }
      //   }
      //   `
      // }).then((result) => {
      //   const data = [...result.data.getUsers]
      //   console.log(result.data.getUsers)
      //   if (data.length === 0) dispatch.userLogin.loginFail()
      //   else {
      //     data.filter(user => user.username === payload.username && user.password === payload.password)
      //     dispatch.userLogin.login(payload)
      //   }
      // })
    }
  })
}

export const userSignup = {
  state: {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    showPasswordState: 0,
    signupState: 0
  },
  reducers: {
    showPassword (state, payload) {
      console.log(payload)
      return {
        ...state,
        showPasswordState: payload
      }
    },
    usernameChange (state, payload) {
      console.log(payload)
      return {
        ...state,
        username: payload
      }
    },
    passwordChange (state, payload) {
      console.log(payload)
      return {
        ...state,
        password: payload
      }
    },
    firstnameChange (state, payload) {
      console.log(payload)
      return {
        ...state,
        firstname: payload
      }
    },
    lastnameChange (state, payload) {
      console.log(payload)
      return {
        ...state,
        lastname: payload
      }
    }
  },
  effects: (dispatch) => ({
    async SignUp (payload, rootState) {
      console.log(payload)
      client
      .mutate({
        variables: {
          'username': payload.username,
          'password': payload.password,
          'fisrtname': payload.firstname,
          'lastname': payload.lastname
        },
        mutation: gql`mutation addUser($username: String!, $password: String, $firstname: String, $lastname:String){
          addUser(username:$username, password:$password, firstname: $firstname, lastname: $lastname, isEnabled: true) {
            _id username password
          }
        }`
      }).then(result=>{
        console.log(result.data)
      })
    }
  })
}

export const Room = {
  state: {
    roomList: [],
    newRoomW: 0,
    newRoomH: 0,
    newRoomName: '',
    newRoomCode: '',
    addRoomState: false,
    editRoomState: false,
    currentRoomView: {},
    loggedIn: 1
  },
  reducers: {
    handleViewChange (state, payload) {
      console.log(payload)
      var newRoomView = {...state.currentRoomView}

      var newSeat = newRoomView.seats.filter(v => v.x == payload.x && v.y == payload.y).length == 0 ? {_id: payload._id, x: Number(payload.x), y: Number(payload.y), state: 0} : {...newRoomView.seats.filter(v => v.x == payload.x && v.y == payload.y)[0]}

      newSeat.state = payload.state

      var newSeats = newRoomView.seats.filter(v => v.x != payload.x || v.y != payload.y)
      newSeats.push(newSeat)

      newRoomView.seats = newSeats
      // console.log(payload)
      return {
        ...state,
        currentRoomView: newRoomView
      }
    },
    viewRoomByCode (state, payload) {
      return {
        ...state,
        currentRoomView: payload
      }
    },
    addDialog (state, payload) {
      return {
        ...state,
        addRoomState: payload
      }
    },
    handleLogout (state, payload) {
      return {
        ...state,
        loggedIn: payload
      }
    }
    ,
    editDialog (state, payload) {
      return {
        ...state,
        editRoomState: payload
      }
    },
    handleNewH (state, payload) {
      console.log(payload)
      return {
        ...state,
        newRoomH: payload
      }
    },
    handleNewW (state, payload) {
      console.log(payload)
      return {
        ...state,
        newRoomW: payload
      }
    },
    handleNewName (state, payload) {
      console.log(payload)
      return {
        ...state,
        newRoomName: payload
      }
    },
    handleNewCode (state, payload) {
      console.log(payload)
      return {
        ...state,
        newRoomCode: payload
      }
    },
    addRoom (state, payload) {
      console.log(payload)
      return {
        ...state,
        roomList: [...state.roomList, payload],
        newRoomH: 0,
        newRoomW: 0,
        newRoomName: '',
        newRoomCode: ''
      }
    },
    init (state, payload) {
      console.log(payload)
      return {
        ...state,
        roomList: [...payload],
        newRoomH: 0,
        newRoomW: 0,
        newRoomName: '',
        newRoomCode: ''
      }
    }
  },
  effects: (dispatch) => ({
    async handleAdd (payload, rootState) {
      console.log(payload)

      client
        .mutate({
          variables: {
            'code': payload.code,
            'name': payload.name,
            'width': payload.w,
            'length': payload.l,
            'isEnabled': true
          },
          mutation: gql`mutation addRoom($code: String!, $name: String, $width: Int!, $length: Int!, $isEnabled: Boolean!){
          addRoom(code: $code, name:$name, width:$width, length: $length, isEnabled: $isEnabled){
            code name width length
          }
        }`
        }).then((result) => {
          console.log(result.data)
          dispatch.Room.addRoom(result.data.addRoom)
        })

      // this.reducers.addRoom(payload)
    },
    async initRoom (payload, rootState) {
      client
        .query({
          query: gql`{
          getRooms {
            width length _id name code
            seats {
              _id x y state
            }
          }
        }`
        }).then((result) => {
          console.log(result.data)
          dispatch.Room.init(result.data.getRooms)
        })
    },
    async getRoomContent (payload, rootState) {
      console.log(payload)
      client
        .query({
          query: gql`{
          getRooms {
            code width length _id
            seats {
              _id x y state
            }
          }
        }`
        }).then((result) => {
          console.log(result.data.getRooms.filter(v => v.code === payload)[0])
          dispatch.Room.viewRoomByCode(result.data.getRooms.filter(v => v.code === payload)[0])
        })
    },
    async addSeat (payload, rootState) {
      // console.log(rootState)

      // console.log(newRoomView)

      // client
      // .mutate({
      //   variables: {
      //     "id": newRoomView._id,
      //     "code": newRoomView.code,
      //     "name": newRoomView.name,
      //     "width": newRoomView.width,
      //     "length": newRoomView.length,
      //     "isEnabled": true
      //   },
      //   mutation: gql`mutation updateRoom($id:ID!, $code: String!, $name: String, $width: Int!, $length: Int!, $isEnabled: Boolean!){
      //     updateRoom(_id: $id,code: $code, name:$name, width:$width, length: $length, isEnabled: $isEnabled){
      //       code width length _id
      //       seats {
      //         x y state
      //       }
      //     }
      //   }`
      // }).then((result)=>{
      //   console.log(result.data.updateRoom)
      //   dispatch.Room.handleViewChange(result.data.updateRoom)
      // })

      client
        .mutate({
          variables: {
            'code': `${rootState.Room.currentRoomView.code}_s_${payload.x}_${payload.y}`,
            'x': Number(payload.x),
            'y': Number(payload.y),
            'state': Number(payload.state) + 1,
            'isEnabled': true,
            'roomId': rootState.Room.currentRoomView._id
          },
          mutation: gql`mutation addSeat($code: String!, $x: Int!, $y: Int!, $state: Int, $isEnabled: Boolean!, $roomId: String!){
          addSeat(code:$code, x:$x, y:$y, state:$state, isEnabled:$isEnabled, roomId:$roomId){
            _id x y state
          }
        }`
        }).then((result) => {
          console.log(result)
          dispatch.Room.handleViewChange(result.data.addSeat)
        })
    },
    async updateSeat (payload, rootState) {
      console.log(rootState)
      var seatID = rootState.Room.currentRoomView.seats.filter(v => v.x == payload.x && v.y == payload.y)[0]._id
      client
        .mutate({
          variables: {
            'id': seatID,
            'code': `${rootState.Room.currentRoomView.code}_s_${payload.x}_${payload.y}`,
            'x': Number(payload.x),
            'y': Number(payload.y),
            'state': payload.state == 2 ? 0 : Number(payload.state) + 1,
            'isEnabled': true,
            'roomId': rootState.Room.currentRoomView._id
          },
          mutation: gql`mutation updateSeat($id: ID! ,$code: String!, $x: Int!, $y: Int!, $state: Int, $isEnabled: Boolean!, $roomId: String!){
            updateSeat(_id: $id, code:$code, x:$x, y:$y, state:$state, isEnabled:$isEnabled, roomId:$roomId){
              _id code x y state roomId
            }
          }`
        }).then(result => {
          console.log(result.data)
          dispatch.Room.handleViewChange(result.data.updateSeat)
        })
    }
  })
}
