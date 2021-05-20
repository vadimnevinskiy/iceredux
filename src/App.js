import React from "react";
import './App.css';
import 'materialize-css'
import {useEffect, useState} from "react";
import {filmsAPI} from "./redux/api/api";
import {useDispatch, useSelector} from "react-redux";
import {setFilms, setServerPage} from "./redux/actions/films";
import FilmList from "./components/FilmList/FilmList";
import {Route} from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Actor from "./components/Actor/Actor";


function App() {
    const dispatch = useDispatch();
    const portionSize = 50;//Items count for display on page
    const corpPages = 4;//
    const [portionFilms, setPortionFilms] = useState([]);//Portion films for display on page
    const currentPage = useSelector(({filmList}) => filmList.currentPage);// Get currentPage from store
    const serverPage = useSelector(({filmList}) => filmList.serverPage);// Get currentPage from store
    const allFilms = useSelector(({filmList}) => filmList.films);// Get all films from store


    //Get films from server
    useEffect(() => {
        console.log('Первый вход на страницу APP - serverPage = ' + serverPage)
        getFilms()
    }, [serverPage])

    //Change portion of films
    useEffect(() => {
        console.log('allFilms=' + allFilms.length + ' / currentPage=' + currentPage)
        changePortionFilms()
    }, [allFilms, currentPage]);



    //Get films from server
    const getFilms = () => {
        filmsAPI.getFilms(serverPage)
            .then(response => {
                dispatch(setFilms(response))
            })
    }

    //Change portion of film list
    const changePortionFilms = () => {
        const pagesCount = Math.ceil(allFilms.length / portionSize);
        const startSlice = (currentPage - 1) * portionSize;
        const finishSlice = startSlice + portionSize;
        console.log('pagesCount=' + pagesCount + ' / corpPages=' + corpPages + ' / currentPage=' + currentPage)
        console.log('pagesCount > corpPages && currentPage > pagesCount - corpPages')
        //Если текущая страница больше чем количество страниц - 4,
        //тогда загрузим следующую порцию фильмов
        if(pagesCount > corpPages && currentPage > pagesCount - corpPages){
            console.log('Прибавляем страницу и загрузку новой порции!!!!!!')
            dispatch(setServerPage(serverPage + 1))
        }else {
            console.log('Пропустили загрузку новой порции!!!!!!')
        }
        const portion = allFilms.slice(startSlice, finishSlice);
        setPortionFilms(portion)
    }


    return (
        <div className="App">
            <Route path={'/'} render={() => <FilmList
                portionFilms={portionFilms}
                currentPage={currentPage}
                portionSize={portionSize}
                changePortionFilms={changePortionFilms}
                corpPages={corpPages}
                items={allFilms}
                getFilms={getFilms}
            />} exact />
            <Route path={'/detail/:id'} render={() => <Detail />} />
            <Route path={'/actor/:id'} render={() => <Actor />} />


        </div>
    );
}

export default App;
