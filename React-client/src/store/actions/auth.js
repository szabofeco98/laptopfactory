import * as actions from  './actionType';
import axios from 'axios';



export const loginStart = ()=>{
    return{
        type :  actions.LOGIN_START
    }
}

export const loginSuccess = (token) =>{
    return{
        type : actions.LOGIN_SUCCESS,
        token : token
    }
}

export const loginFail = () =>{
    return{
        type : actions.LOGIN_FAIL
    }
}

export const login = (username,password)=>{
   return dispatch=>{
       dispatch(loginStart());
       const authData = {
        username: username,
        password: password
        };
        const url = "http://localhost:9090/auth"
        axios.post(url,authData)
                .then(responze => {
                    dispatch(loginSuccess(responze.data));
                } ).catch(error =>{
                    console.log(error);
                    dispatch(loginFail());
                })

   }
}