import {SET_CURRENT_PAGE, SET_FILM_DETAIL, SET_FILMS, SET_SERVER_PAGE} from "../vars";

export const setFilms = (films) => {
    return {
        type: SET_FILMS,
        films: films
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
}

export const setServerPage = (serverPage) => {
    return {
        type: SET_SERVER_PAGE,
        serverPage: serverPage
    }
}

export const setFilmDetail = (detail) => {
    return {
        type: SET_FILM_DETAIL,
        detail: detail
    }
}
