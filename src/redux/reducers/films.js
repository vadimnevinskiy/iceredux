import {
    SET_ACTOR_DETAIL,
    SET_ACTORS,
    SET_CURRENT_PAGE,
    SET_FILM_DETAIL,
    SET_FILMS,
    SET_SEARCH_TEXT,
    SET_SEARCHED_FILMS,
    SET_SERVER_PAGE
} from '../vars'

const initialState = {
    films: [],
    currentPage: 1,
    serverPage: 0,
    filmDetail: null,
    actors: [],
    actor: null,
    searchText: ''
}

const filmReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILMS:
            return {
                ...state,
                films: [...state.films, ...action.films]
            }
        case SET_SEARCHED_FILMS:
            return {
                ...state,
                films: [...action.films]
            }
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
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
        case SET_ACTOR_DETAIL:
            return {
                ...state,
                actor: action.actor
            }
        default:
            return state
    }
}


export default filmReducer;
