import React, {useEffect, useState} from "react";
import classes from './FilmList.module.css';
import {NavLink} from "react-router-dom";
import Paginator from "../Paginator/Paginator";
import {Field, Form} from "react-final-form";
import {useDispatch} from "react-redux";
import {filmsAPI} from "../../redux/api/api";
import {setCurrentPage, setSearchedFilms, setServerPage} from "../../redux/actions/films";
import defaultimg from '../../assets/img/defaultimg.jpg'

const FilmList = ({portionFilms, currentPage, items, portionSize, changePortionFilms, corpPages, getFilms}) => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');

    const onSubmit = values => {
        setSearchText(values.search)
    }

    useEffect(() => {
        if(searchText){
            filmsAPI.searchShow(searchText)
                .then(response => {
                    const result = response.map(item => {
                        return (
                            item.show
                        )
                    })
                    dispatch(setServerPage(0))
                    dispatch(setCurrentPage(1))
                    dispatch(setSearchedFilms(result))

                })
        } else {
            dispatch(setSearchedFilms([]))
            getFilms()
        }
    }, [searchText])


    const clearSearch = () => {
        setSearchText('')
    }

    return (
        <div className={'films'}>
            <div className={classes.header}>
                <Form
                    onSubmit={onSubmit}
                    render={({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <div className={classes.searchForm}>
                                <div className={classes.inputField + " input-field"}>
                                    <Field name="search">
                                        {props => (
                                            <input id="search" type="text" {...props.input} />
                                        )}
                                    </Field>
                                    <label htmlFor="search">Search</label>
                                </div>
                                <button className="btn waves-effect waves-light" type="submit">
                                    Search
                                    <i className="material-icons right">search</i>
                                </button>
                            </div>
                        </form>
                    )}
                />

                {
                    searchText &&
                    <div className="chip">
                        {searchText}
                        <i className="close material-icons" onClick={() => clearSearch()}>close</i>
                    </div>
                }
            </div>
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
                            <div className="col s12 m6 l3 x3 xl2" key={`${index}_${film.id}`}>
                                <div className="card">
                                    <div
                                        className={classes.cardImage + " card-image waves-effect waves-block waves-light"}>
                                        {
                                            film.image &&
                                            <img className={classes.imgActivator + " activator"} src={film.image.medium}/>
                                        }
                                        {
                                            !film.image &&
                                            <img className={classes.imgActivator + " activator"} src={defaultimg} />
                                        }

                                    </div>
                                    <div className={classes.cardContent + " card-content"}>
                                        <span
                                            className={classes.title + " card-title activator grey-text text-darken-4"}>{film.name}</span>
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
                                        <p>
                                            <NavLink to={`/detail/${film.id}`}>
                                                More
                                            </NavLink>
                                        </p>
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
                    <div>LOADING....</div>
                }

            </div>

        </div>
    )
}
export default FilmList;
