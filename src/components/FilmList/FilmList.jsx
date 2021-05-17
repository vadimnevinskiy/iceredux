import React, {useEffect, useState} from "react";
import classes from './FilmList.module.css';
import {NavLink} from "react-router-dom";
import Paginator from "../Paginator/Paginator";

const FilmList = ({portionFilms, currentPage, items, portionSize, changePortionFilms, corpPages}) => {
    return (
        <div className={'films'}>
            <div className={classes.header}>
                <div className="input-field col s6">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" />
                    <label htmlFor="icon_prefix">Search</label>
                </div>
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
                            <div className="col s12 m6 l3 x3 xl2" key={film.id}>
                                <div className="card">
                                    <div
                                        className={classes.cardImage + " card-image waves-effect waves-block waves-light"}>
                                        {
                                            film.image &&
                                            <img className="activator" src={film.image.medium}/>
                                        }
                                    </div>
                                    <div className="card-content">
                                        <span
                                            className={classes.title + " card-title activator grey-text text-darken-4"}>{film.name}</span>
                                        {/*<div>index: {index + 1}</div>*/}
                                        {/*<div>id: {film.id}</div>*/}

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
                                                            <span className="chip" key={index}>
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
