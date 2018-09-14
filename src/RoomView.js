import React from 'react'
import {connect} from 'react-redux'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import { Button } from '@blueprintjs/core'

class RoomView extends React.Component {
  handleClick (event) {
    var seat = {
      x: event.target.id.split('')[1],
      y: event.target.id.split('')[0],
      state: event.target.id.split('')[2]
    }
    if (event.target.id.split('')[2] == 0) this.props.addSeat(seat)
    else this.props.updateSeat(seat)
  }
  generateRoomView () {
    const colorType = ['#666666', '#33cc33', '#ff0000']
    var row = new Array(this.props.currentRoomView.width).fill(0)
    var content = []
    for (var i = 0; i < this.props.currentRoomView.length; i++) {
      content.push([...row])
    }
    // console.log(this.props.currentRoomView.seats[0])
    for (let k in this.props.currentRoomView.seats) {
      content[this.props.currentRoomView.seats[k].x][this.props.currentRoomView.seats[k].y] = this.props.currentRoomView.seats[k].state
    }
    // console.log(this.props.currentRoomView.seats["0"])
    var cellwidth = Math.floor(100 / this.props.currentRoomView.width) + '%'
    var cellStyle = {
      position: 'relative',
      width: cellwidth
    }

    var currRow = 0
    var tableBody =
      <tbody>
        {content.map((row, index) => {
          currRow = index
          return (
            <tr id={'r' + index} key={'r' + index}>
              {row.map((cell, index) => {
                return (
                  <td style={cellStyle} bgcolor={colorType[cell]} key={'cell' + index} onClick={this.handleClick.bind(this)} id={index + '' + currRow + cell}><div style={{pointerEvents: 'none'}} className='content' /></td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    return tableBody
  }
  render () {
    return (
      <div>
        <table className='res-table-sqr'>
          {this.generateRoomView()}
        </table>
        <Button intent='success' text='Save Changes' />
        <Button intent='danger' text='Cancel' />
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomView)
