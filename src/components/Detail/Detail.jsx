import React, {useEffect} from "react";
import classes from './Detail.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {filmsAPI} from "../../redux/api/api";
import {setActors, setFilmDetail} from "../../redux/actions/films";
import {useDispatch, useSelector} from "react-redux";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import ActorList from "../ActorList/ActorList";


const Detail = () => {
    const dispatch = useDispatch();
    const history = useHistory(); //history detail
    const filmId = history.location.pathname.split('/')[2] // Parse string and get filmId
    const filmDetail = useSelector(({filmList}) => filmList.filmDetail);// Get all films from store



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
                <ActorList filmId={filmId} />
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
