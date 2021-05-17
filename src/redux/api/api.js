import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://api.tvmaze.com/'
})

export const filmsAPI = {
    getFilms(currentPage = 1) {
        return instance.get(`/shows?page=${currentPage}`)
            .then((response) => {
                return response.data
            });
    },
    getDetail(id) {
        return instance.get(`/shows/${id}`)
            .then((response) => {
                return response.data
            });
    }
}
