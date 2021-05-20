import React, {useEffect} from "react";
import classes from './Detail.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {filmsAPI} from "../../redux/api/api";
import {setActors, setFilmDetail} from "../../redux/actions/films";
import {useDispatch, useSelector} from "react-redux";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";


const Detail = () => {
    const dispatch = useDispatch();
    const history = useHistory(); //history detail
    const filmId = history.location.pathname.split('/')[2] // Parse string and get filmId
    const filmDetail = useSelector(({filmList}) => filmList.filmDetail);// Get all films from store
    const actors = useSelector(({filmList}) => filmList.actors);// Get all films from store


    // console.log(filmId)
    useEffect(() => {
        filmsAPI.getDetail(filmId)
            .then(response => {
                dispatch(setFilmDetail(response))
            })
        filmsAPI.getActors(filmId)
            .then(response => {
                dispatch(setActors(response))
            })
    }, [filmId])


    if (filmDetail) {
        return (
            <>
                <Header backLink={'/'} name={filmDetail.name} />
                <div className="row">
                    <div className="col s4 m4 l4 xl3">
                        <div className={classes.image}>
                            <img src={filmDetail.image.original} alt=""/>
                        </div>
                    </div>
                    <div className="col s8 m8 l8 xl9">
                        <h3>{filmDetail.name}</h3>
                        <h5>{filmDetail.premiered}</h5>
                        <div className={classes.infoBlock}>
                            <div className={classes.infoItem}>
                                <div className="content" dangerouslySetInnerHTML={{__html: filmDetail.summary}}></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        actors &&
                        actors.map((actor, index) => {
                            return (
                                <div className="col s6 m3 l2 xl2" key={index}>
                                    <div className="card">
                                        <div className="card-image">
                                            {
                                                actor.person.image &&
                                                <img src={actor.person.image.medium} alt={actor.person.name} />
                                            }
                                            <span className="card-title">{actor.person.id} = {actor.person.name}</span>
                                        </div>
                                        <div className={classes.cardContent + " card-content"}>
                                            <div>
                                                <strong>{actor.character.name}</strong>
                                            </div>
                                            <div>
                                                <strong>{actor.person.birthday}</strong>
                                                {
                                                    actor.person.deathday &&
                                                    <>
                                                        - <strong>{actor.person.deathday}</strong>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        <div className="card-action">
                                            <NavLink to={`/actor/${actor.person.id}?filmId=${filmDetail.id}`}>Detail</NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <NavLink to={'/'} className="btn-floating btn-large blue darken-3 fixed-action-btn">
                    <i className="large material-icons">arrow_back</i>
                </NavLink>
            </>
        )
    }

    return (
        <Preloader />
    )


}

export default Detail;
