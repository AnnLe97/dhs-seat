export const userLogin = {
    state : {
        login:0,
        username:''
    }, 
    reducers : {
        logout(state) {
            return {
                ...state,
                login : 0,
                username: ''
            }
        },
        login(state,payload) {
            return {
                ...state,
                login: 1,
                username: payload.username
            }
        }
    },
    effects : {
        async loginAuth(payload, rootState) {
            // wait for data to load
            var API = `localhost:3001/user?username=${payload.username}&password=${payload.password}`
            const response = await fetch(API)
            const data = await response.json()
            // pass the result to a local reducer
            dispatch.userLogin.login(data)
        }
    }
}