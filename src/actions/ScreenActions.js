import {
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    REPOSITORIES_ERROR,
    REPOSITORIES_START,
    REPOSITORIES_SUCCESS,
    REPOSITORY_HIDE,
    REPOSITORY_OPEN
} from "./ActionTypes";
import {encode} from "../common/Util";

export function login(login, password) {
    return (dispatch) => {
        dispatch({type: LOGIN_START});
        let base64 = encode(`${login}:${password}`);
        fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64
            },
        })
            .then(result => {
                if (result.status === 200) {
                    console.log('fetch: success, name = ' + result.name);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            user: JSON.parse(result._bodyInit),
                            auth: base64
                        }
                    });
                } else {
                    dispatch({
                        type: LOGIN_ERROR,
                        payload: `Failed to login with ${result.status}`
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: `Failed to login with ${error}`
                });
            })
            .done();
    };
}

export function logout() {
    return (dispatch) => {
        dispatch({type: LOGOUT});
    };
}

export function fetchList(reposUrl, auth) {
    return (dispatch) => {
        dispatch({type: REPOSITORIES_START});
        fetch(reposUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + auth
            },
        })
            .then(result => {
                if (result.status === 200) {
                    const list = JSON.parse(result._bodyInit);
                    dispatch({
                        type: REPOSITORIES_SUCCESS,
                        payload: list
                    });
                } else {
                    dispatch({
                        type: REPOSITORIES_ERROR,
                        payload: `Failed to login with ${result.status}`
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: REPOSITORIES_ERROR,
                    payload: `Failed to login with ${error}`
                });
            })
            .done();
    };
}

export function openRepo(name) {
    console.log('open repo ' + name);
    return (dispatch) => {
        dispatch({
            type: REPOSITORY_OPEN,
            payload: name
        });
    };
}

export function hideRepo() {
    return (dispatch) => {
        dispatch({
            type: REPOSITORY_HIDE
        });
    };
}
