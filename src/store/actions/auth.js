import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    };
};

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
            setTimeout(() => {
                dispatch(logout());
        }, expirationTime * 1000 );
    }   
};


export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcUn1QALbZGpk4f4a6K-lGL-NjQuDMfxk';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcUn1QALbZGpk4f4a6K-lGL-NjQuDMfxk';
        }
        axios.post(url, authData)
        .then(resp => {
            dispatch(authSuccess(resp.data.idToken, resp.data.expiresIn));
            console.log(resp.data.expiresIn);
            dispatch(checkAuthTimeout(resp.data.expiresIn));

        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    };
};