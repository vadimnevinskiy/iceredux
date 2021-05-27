import React from "react";
import classes from "./ActorList.module.css";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import defaultImg from "../../assets/img/defaultimg.jpg";


const ActorList = ({filmId}) => {
    const actors = useSelector(({filmList}) => filmList.actors);// Get all films from store


    return (
        <div className="row">
            {
                actors &&
                actors.map((actor, index) => {
                    return (
                        <div className="col s6 m3 l2 xl2" key={index}>
                            <div className="card">
                                <div className="card-image">
                                    {
                                        actor.person.image
                                        ? <img src={actor.person.image.medium} alt={actor.person.name} />
                                        : <img className={classes.imgActivator + " activator"} src={defaultImg} alt={actor.person.name}/>
                                    }
                                    <span className="card-title">{actor.person.name}</span>
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
                                    <NavLink to={`/actor/${actor.person.id}?filmId=${filmId}`}>Detail</NavLink>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ActorList;
