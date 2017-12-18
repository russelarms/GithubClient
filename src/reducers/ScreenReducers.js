import {
    HIDE_LOADER,
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    REPOSITORIES_ERROR,
    REPOSITORIES_START,
    REPOSITORIES_SUCCESS,
    REPOSITORY_HIDE,
    REPOSITORY_OPEN
} from "../actions/ActionTypes";

const INITIAL_STATE = {
    showLoader: false,
    error: null,
    user: null,
    auth: null,
    repositories: null,
    chosenRepo: null,
};

export default function initApp(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                showLoader: true,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                showLoader: false,
                error: action.payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                showLoader: false,
                error: null,
                user: action.payload.user,
                auth: action.payload.auth,
            };
        case LOGOUT:
            return {
                ...state,
                showLoader: false,
                error: null,
                user: null,
                auth: null,
            };
        case REPOSITORIES_START:
            return {
                ...state,
                showLoader: true,
            };
        case REPOSITORIES_ERROR:
            return {
                ...state,
                showLoader: false,
                error: action.payload
            };
        case REPOSITORIES_SUCCESS:
            return {
                ...state,
                showLoader: false,
                error: null,
                repositories: action.payload
            };
        case REPOSITORY_OPEN:
            // console.log(JSON.stringify(action));
            let repoName = action.payload.toUpperCase();
            let chosenRepo;
            state.repositories.forEach(function (repo, i, arr) {
                if (repo.name.toUpperCase() === repoName) {
                    chosenRepo = repo
                }
            });
            return {
                ...state,
                chosenRepo: chosenRepo
            };
        case REPOSITORY_HIDE:
            return {
                ...state,
                chosenRepo: null
            };
        default:
            return INITIAL_STATE;
    }
}