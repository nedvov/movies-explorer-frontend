import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({onSubmit, isCheckboxOn, handleCheckbox }) { 
    
    const { values, handleChange, isValid, resetForm } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values.name);
    }
   
    React.useEffect(() => {
        resetForm(
            { name: "" },
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
                            required
                            onChange={handleChange}
                            placeholder={isValid.name ? "Фильм" : "Нужно ввести ключевое слово"}
                    />
                    <input
                        type="submit"
                        className="search-form__button"                        
                        id={`search-form__button`}
                        disabled={
                            !(
                                isValid.name &&
                                values.name
                            )
                        }
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