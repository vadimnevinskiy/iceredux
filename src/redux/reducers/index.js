import {combineReducers} from "redux";
import filmReducer from "../reducers/films";

const rootReducer = combineReducers({
    filmList: filmReducer
})

export default rootReducer;
