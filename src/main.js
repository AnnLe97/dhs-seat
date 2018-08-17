import React from 'react'
import ReactDOM from 'react-dom'

class Table extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <table border="1">
                <thead>
                    <tr>
                        <th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>nhloc</td><td></td><td></td><td></td><td></td><td></td><td></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Table