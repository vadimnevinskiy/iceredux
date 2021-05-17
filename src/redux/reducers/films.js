import {SET_ACTORS, SET_CURRENT_PAGE, SET_FILM_DETAIL, SET_FILMS, SET_SERVER_PAGE} from '../vars'

const initialState = {
    films: [],
    currentPage: 1,
    serverPage: 0,
    filmDetail: null,
    actors: []
}

const filmReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILMS:
            return {
                ...state,
                films: [...state.films, ...action.films]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_SERVER_PAGE:
            return {
                ...state,
                serverPage: action.serverPage
            }
        case SET_FILM_DETAIL:
            return {
                ...state,
                filmDetail: action.detail
            }
        case SET_ACTORS:
            return {
                ...state,
                actors: action.actors
            }
        default:
            return state
    }
}


export default filmReducer;
