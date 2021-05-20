import React, {useEffect} from "react";
import classes from "./Actor.module.css";
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {filmsAPI} from "../../redux/api/api";
import {setActorDetail} from "../../redux/actions/films";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";

const Actor = () => {
    const dispatch = useDispatch();
    const history = useHistory(); //history detail
    const actorId = history.location.pathname.split('/')[2] // Parse string and get filmId
    const actor = useSelector(({filmList}) => filmList.actor);// Get all films from store

    const search = history.location.search;
    const params = new URLSearchParams(search);
    const filmId = params.get('filmId');


    // console.log
    useEffect(() => {
        filmsAPI.getActorDetail(actorId)
            .then(response => {
                dispatch(setActorDetail(response))
            })
    }, [actorId])



    if(actor){
        return (
            <>
                <Header name={actor.name} backLink={`/detail/${filmId}`} />
                <div className="row">
                    <div className="col s4 m4 l4 xl3">
                        <div className={classes.image}>
                            <img src={actor.image.original} alt=""/>
                        </div>
                    </div>
                    <div className="col s8 m8 l8 xl9">
                        <h3>{actor.name}</h3>
                        <div>{actor.gender}</div>
                        <div className={classes.infoBlock}>
                            <div className={classes.infoItem}>
                                {actor.country.name}
                            </div>
                            <div className={classes.infoItem}>
                                <span>{actor.birthday}</span>
                                {
                                    actor.deathday &&
                                    <>
                                        - <span>{actor.deathday}</span>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <NavLink to={`/detail/${filmId}`} className="btn-floating btn-large blue darken-3 fixed-action-btn">
                    <i className="large material-icons">arrow_back</i>
                </NavLink>
            </>
        )
    }



    return (
        <Preloader />
    )

}
export default Actor;
