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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
            const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000);
            localStorage.setItem('token', resp.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', resp.data.localId);
            dispatch(authSuccess(resp.data.idToken, resp.data.localId));
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000) );  
            }
        }
    };
};