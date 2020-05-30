import * as actions from  '../actions/actionType';
import {updateObject} from '../utility';
import axios from 'axios';

const initialState={
    token : false,
    loading : false,
    error : null
}

const loginStart = ( state, action ) => {
    delete axios.defaults.headers.common['authorization'];
    return updateObject( state, { error: null, loading: true } );
};

const loginSuccess = ( state, action ) => {
    
    if(action.token != 'password' && action.token != 'username'){
        localStorage.setItem('token',action.token);
    }
    
    return updateObject( state, { error: null, loading: false , token : action.token} );
};

const loginFail = ( state, action ) => {
    return updateObject( state, { error: true, loading: false } );
};

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actions.LOGIN_START : return loginStart(state,action);
        case actions.LOGIN_SUCCESS : return loginSuccess(state,action);
        case actions.LOGIN_FAIL : return loginFail(state,action)
    }
    return state
}

export default reducer;