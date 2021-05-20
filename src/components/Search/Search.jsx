import React from "react";
import classes from "./Search.module.css";
import {Field, Form} from "react-final-form";

const Search = ({clearSearch, search, searchText}) => {
    return (
        <div className={classes.header}>
            <Form
                onSubmit={search}
                initialValues={{search: searchText}}
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
    )
}
export default Search;
