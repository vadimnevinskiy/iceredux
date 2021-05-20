import React, {useEffect, useState} from "react";
import classes from './FilmList.module.css';
import {NavLink} from "react-router-dom";
import Paginator from "../Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {filmsAPI} from "../../redux/api/api";
import {setCurrentPage, setSearchedFilms, setSearchText, setServerPage} from "../../redux/actions/films";
import defaultImg from '../../assets/img/defaultimg.jpg'
import Search from "../Search/Search";
import Preloader from "../Preloader/Preloader";

const FilmList = ({portionFilms, currentPage, items, portionSize, changePortionFilms, corpPages, getFilms}) => {
    const dispatch = useDispatch();
    // const [searchText, setSearchText] = useState('');
    const searchText = useSelector(({filmList}) => filmList.searchText);// Get currentPage from store

    const search = (values) => {
        dispatch(setSearchText(values.search));
        filmsAPI.searchShow(values.search)
            .then(response => {
                const result = response.map(item => {
                    return (
                        item.show
                    )
                })
                // dispatch(setServerPage(0))
                dispatch(setCurrentPage(1))
                dispatch(setSearchedFilms(result))
            })
    }


    const clearSearch = () => {
        dispatch(setServerPage(0))
        dispatch(setCurrentPage(1))
        dispatch(setSearchText(''));
        dispatch(setSearchedFilms([]));
    }

    return (
        <div className={'films'} id='top'>
            <Search clearSearch={clearSearch} search={search} searchText={searchText} />
            <Paginator currentPage={currentPage}
                       items={items}
                       portionSize={portionSize}
                       changePortionFilms={changePortionFilms}
                       corpPages={corpPages}
            />
            <div className="row">
                {
                    portionFilms &&
                    portionFilms.map((film, index) => {
                        return (
                            <div className="col s12 m4 l3 x3 xl2" key={`${index}_${film.id}`}>
                                <div className="card hoverable">
                                    <div
                                        className={classes.cardImage + " card-image waves-effect waves-block waves-light"}>
                                        {
                                            film.image &&
                                            <img className={classes.imgActivator + " activator"} src={film.image.medium} alt={film.name} />
                                        }
                                        {
                                            !film.image &&
                                            <img className={classes.imgActivator + " activator"} src={defaultImg} alt={film.name} />
                                        }
                                    </div>
                                    <div className={classes.cardContent + " card-content"}>
                                        <span
                                            className={classes.title + " card-title activator grey-text text-darken-4"}>
                                            {film.name}
                                        </span>
                                        <div>index: {index + 1}</div>
                                        <div>id: {film.id}</div>

                                        {
                                            film.rating &&
                                            <div className={classes.filmInfo}>
                                                <i className="material-icons">star</i>
                                                &nbsp; {film.rating.average}
                                            </div>
                                        }
                                        {
                                            film.runtime &&
                                            <div className={classes.filmInfo}>
                                                <i className="material-icons">access_time</i>
                                                &nbsp; {film.runtime} min.
                                            </div>
                                        }
                                        {
                                            film.premiered &&
                                            <div className={classes.filmInfo}>
                                                <strong>{film.premiered}</strong>
                                            </div>
                                        }
                                    </div>
                                    <div className="card-action">
                                        <NavLink to={`/detail/${film.id}`}>Detail</NavLink>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">
                                            {/*{film.name}*/}
                                            <i className="material-icons right">close</i>
                                        </span>
                                        {
                                            film.genres &&
                                            <div className={classes.filmInfo}>
                                                {
                                                    film.genres.map((genre, index) => {
                                                        return (
                                                            <span className="chip" key={`${index}_${genre}`}>
                                                                {genre}
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                        <div className="content"
                                             dangerouslySetInnerHTML={{__html: film.summary}}></div>
                                        <NavLink to={`/detail/${film.id}`}>
                                            More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    !portionFilms &&
                    <Preloader />
                }
                <a href='#top' className="btn-floating btn-large blue darken-3 fixed-action-btn">
                    <i className="large material-icons">vertical_align_top</i>
                </a>
            </div>

        </div>
    )
}
export default FilmList;
