import classes from "./Paginator.module.css";
import React, {useEffect, useState} from "react";
import {setCurrentPage} from "../../redux/actions/films";
import {useDispatch, useSelector} from "react-redux";


const Paginator = ({portionSize, currentPage, items, changePortionFilms, corpPages}) => {
    const dispatch = useDispatch();

    //Array of page numbers
    const [pages, setPages] = useState([]);


    //Change portion of films
    useEffect(() => {
        //Количество всех записей делим на размер порции, округляем в большую сторону
        // 240/50 = 4.8 ~ 5
        const pagesCount = Math.ceil(items.length / portionSize);
        const pagesArr = [];// Массив для хранения страниц

        for (let i = 1; i <= pagesCount; i++) {
            pagesArr.push(i)
        }
        setPages(pagesArr)

        changePortionFilms()
    }, [items]);


    // Set currentPage to store
    const changePage = (currentPage) => {
        dispatch(setCurrentPage(currentPage)) // Устанавливаем текущую страницу в store
    }

    const left = currentPage - corpPages
    const right = currentPage + corpPages

    return (
        <div className={classes.paginator}>
            {
                pages &&
                pages
                    .filter(p => p >= left && p <= right)
                    .map(i => {
                        return (
                            (currentPage === i)
                                ? <span key={i} className={classes.pageItem + ' ' + classes.active}>{i}</span>
                                : <span key={i} className={classes.pageItem} onClick={() => changePage(i)}>{i}</span>)
                    })
            }
        </div>
    )
}

export default Paginator;
