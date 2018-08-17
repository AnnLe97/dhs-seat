import React from 'react'
import {connect} from 'react-redux'

class Login extends React {
    handleLogin(){
        let user = {
        username : this.refs.username.value,
        password : this.refs.password.value
        }
        
        this.props.login(user)
    }
    render(){
        return(<div>
            <form>
                <input ref="username" type="text" id="username_txt" placeholder="Username" />
                <input ref="password" type="password" id="password_txt" />
                <button>Login</button>
            </form>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        username: state.username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user)=>dispatch.UserLogin.loginAuth(user)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)