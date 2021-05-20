import {
    SET_ACTOR_DETAIL,
    SET_ACTORS,
    SET_CURRENT_PAGE,
    SET_FILM_DETAIL,
    SET_FILMS,
    SET_SEARCH_TEXT,
    SET_SEARCHED_FILMS,
    SET_SERVER_PAGE
} from "../vars";

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

export const setActors = (actors) => {
    return {
        type: SET_ACTORS,
        actors: actors
    }
}
export const setSearchText = (text) => {
    return {
        type: SET_SEARCH_TEXT,
        searchText: text
    }
}
export const setSearchedFilms = (films) => {
    return {
        type: SET_SEARCHED_FILMS,
        films: films
    }
}
export const setActorDetail = (actor) => {
    return {
        type: SET_ACTOR_DETAIL,
        actor: actor
    }
}
