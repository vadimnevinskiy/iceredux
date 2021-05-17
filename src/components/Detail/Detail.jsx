import React, {useEffect} from "react";
import classes from './Detail.module.css';
import {NavLink, useLocation} from "react-router-dom";
import {filmsAPI} from "../../redux/api/api";
import {setFilmDetail} from "../../redux/actions/films";
import {useDispatch, useSelector} from "react-redux";


const Detail = () => {
    const dispatch = useDispatch();
    const location = useLocation(); //location detail
    const filmId = location.pathname.split('/')[2] // Parse string and get filmId

    const filmDetail = useSelector(({filmList}) => filmList.filmDetail);// Get all films from store

    // console.log(filmId)
    useEffect(() => {
        filmsAPI.getDetail(filmId)
            .then(response => {
                dispatch(setFilmDetail(response))
            })
    }, [filmId])


    if(filmDetail) {
        return (
            <>
                <div className={classes.header}>
                    <NavLink to={'/'}>
                        Go back
                    </NavLink>
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <span className={classes.headerName}>{filmDetail.name}</span>
                </div>
                <div className="row">
                    <div className="col s4 m4 l4 xl4">
                        <div className={classes.image}>
                            <img src={filmDetail.image.original} alt=""/>
                        </div>
                    </div>
                    <div className="col s8 m8 l8 xl8">
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
            </>
        )
    }

    return (
        <div>LOADING</div>
    )


}

export default Detail;
