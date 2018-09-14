import React from 'react'
import {connect} from 'react-redux'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import { InputGroup, Button, Intent, Tooltip, Classes, Dialog } from '@blueprintjs/core'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import RoomView from './RoomView'
import { Redirect } from 'react-router'

class Room extends React.Component {
  handleLogout (event) {
    event.preventDefault()
    this.props.handleLogout(0)
    this.props.cookies.remove('username')
    this.props.cookies.remove('loginstate')
  }

  handleClick (event) {
    console.log(event.target)
    // window.alert(event.target.value)
  }

  handleAddBtnClick (event) {
    event.preventDefault()
    this.props.addDialog(true)
  }

  handleCloseAdd (event) {
    this.props.addDialog(false)
  }

  handleCloseEdit (event) {
    this.props.editDialog(false)
  }

  handleAddRoom (event) {
    event.preventDefault()
    let newRoom = {
      code: this.props.newRoomCode,
      name: this.props.newRoomName,
      l: this.props.newRoomH,
      w: this.props.newRoomW
    }
    this.props.handleAdd(newRoom)
    this.handleCloseAdd()
  }

  handleChange (event) {
    if (event.target.name === 'rname') this.props.handleNewName(event.target.value)
    if (event.target.name === 'rcode') this.props.handleNewCode(event.target.value)
    if (event.target.name === 'rh') this.props.handleNewH(event.target.value)
    if (event.target.name === 'rw') this.props.handleNewW(event.target.value)
  }

  handleDelete (event) {

  }

  handleEdit (event) {
    this.props.editDialog(true)
    this.props.getRoomContent(event.currentTarget.value)
  }

  componentDidMount () {
    this.props.initRoom()
  }

  render () {
    const flexBox = {
      display: 'flex',
      margin: '5px 12px 5px 12px'
    }
    const margin = {
      margin: '0px 5px 0px 5px'
    }

    const smallMargin = {
      margin: '0px 2px 0px 2px'
    }
    const TableContent = this.props.roomList.map((v, i) => <tr key={v.code} id={v.code} >
      <td>{v.code}</td><td>{v.name}</td><td>placeholder</td><td><Button style={smallMargin} intent='primary' icon='edit' value={v.code} onClick={this.handleEdit.bind(this)} /><Button style={smallMargin} intent='danger' icon='cross' value={v.code} onClick={this.handleDelete.bind(this)} /></td>
    </tr>)

    console.log(this.props.loggedIn)
    return (
      this.props.loggedIn == 0 ? <Redirect to='/' />
      : <div>
          <p>Welcome {this.props.cookies.get('username') || 'guest'}</p>
          <Button rightIcon='plus' intent='success' text='Create Room' onClick={this.handleAddBtnClick.bind(this)} />
          <Dialog
            onClose={this.handleCloseEdit.bind(this)}
            title='Edit Room'
            isOpen={this.props.editRoomState}
            usePortal
            canEscapeKeyClose
          >
            <RoomView />
          </Dialog>
          <Dialog
            onClose={this.handleCloseAdd.bind(this)}
            title='Create Room'
            isOpen={this.props.addRoomState}
            usePortal
            canOutsideClickClose
            canEscapeKeyClose
          >
            <div className={Classes.DIALOG_BODY}>
              <div className='row' style={flexBox}>
                <div style={margin}>
                  <label className='bp3-label'> Room Code
                  <InputGroup
                    name='rcode'
                    onChange={this.handleChange.bind(this)}
                    placeholder='Room code'
                    value={this.props.newRoomCode} />
                  </label>
                </div>
                <div style={margin}>
                  <label className='bp3-label'> Room Name
                  <InputGroup
                    name='rname'
                    onChange={this.handleChange.bind(this)}
                    placeholder='Room name'
                    value={this.props.newRoomName} />
                  </label>
                </div>
                <div style={margin}>
                  <label className='bp3-label'> Room Length
                  <InputGroup
                    name='rh'
                    onChange={this.handleChange.bind(this)}
                    type='number'
                    placeholder='Length'
                    value={this.props.newRoomH} />
                  </label>
                </div>
                <div style={margin}>
                  <label className='bp3-label'> Room Width
                  <InputGroup
                    name='rw'
                    onChange={this.handleChange.bind(this)}
                    type='number'
                    placeholder='Width'
                    value={this.props.newRoomW} />
                  </label>
                </div>
              </div>
              <hr />
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Tooltip content='Create new room'>
                  <Button text='Create' intent='success' onClick={this.handleAddRoom.bind(this)} />
                </Tooltip>
                <Tooltip content='Close the dialog'>
                  <Button text='Cancel' intent='danger' onClick={this.handleCloseAdd.bind(this)} />
                </Tooltip>
              </div>
            </div>
          </Dialog>

          <br />
          <span className='bp3-icon-standard bp3-icon-clipboard' />Room List
          <br />
          <table className='bp3-html-table bp3-interactive bp3-html-table-bordered'>
            <thead>
              <tr key='head'>
                <th>Code</th>
                <th>Room</th>
                <th>Seat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {TableContent}
            </tbody>
          </table>
          <Button intent='danger' onClick={this.handleLogout.bind(this)}>Logout</Button>
        </div>
    )
  }
}

function mapStateToProps (state) {
  return state.Room
}

function mapDispatchToProps (dispatch) {
  return dispatch.Room
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Room))
