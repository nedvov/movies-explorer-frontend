import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({onSubmit, isCheckboxOn, handleCheckbox, type, filter }) {
    
    const { values, handleChange, isValid, resetForm, setIsValid } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        if (values.name || type === "saved") {
            onSubmit(values.name);
        } else {
            setIsValid({name: false})           
        }
    }
   
    React.useEffect(() => {
        resetForm(
            { name: filter ? filter : "" },
            { name: "" },
            { name: true }
        );
    }, []);

    return (
        <>
            <form className="search-form" id="search-form" name ="search-form" onSubmit={handleSubmit}>            
                <fieldset className="search-form__inputs">
                    <div className="search-form__icon"></div>
                    <input
                        type="text"
                        className={
                                isValid.name
                                ? "search-form__input"
                                : "search-form__input search-form__input_active"
                            }
                        id={`search-form-name`}
                        name="name"
                        onChange={handleChange}
                        placeholder={isValid.name ? "Фильм" : "Нужно ввести ключевое слово"}
                        value={values.name ? values.name : ""}
                    />
                    <input
                        type="submit"
                        className="search-form__button"                        
                        id={`search-form__button`}
                        value=""
                    />
                </fieldset>
                <div className="search-form__checkbox-container">
                    <button className={isCheckboxOn ? "search-form__checkbox" : "search-form__checkbox search-form__checkbox_off"} type="button" onClick={handleCheckbox}></button>
                    <p className="search-form__checkbox-name">Короткометражки</p>
                </div>            
            </form>
            <div className="search-form__afterline"></div>
        </>
    );
}

export default SearchForm;